const { db } = require('../config/firebase');
const { getAsync, setAsync } = require('../config/redis');
const emailService = require('./emailService');
const logger = require('../utils/logger');

class ProductService {
  constructor() {
    this.cacheExpiration = 3600; // 1 hour in seconds
  }

  // Get product by ID (mocked data for example)
  async getProduct(productId) {
    try {
      // Try to get from cache first
      const cachedProduct = await getAsync(`product:${productId}`);
      if (cachedProduct) {
        logger.info(`Product ${productId} retrieved from cache`);
        return JSON.parse(cachedProduct);
      }

      // Mock product data (in real app, this would be a database query)
      const product = {
        id: productId,
        name: `Product ${productId}`,
        description: `Description for product ${productId}`,
        price: Math.floor(Math.random() * 1000) + 1,
        createdAt: new Date()
      };

      // Cache the product
      await setAsync(
        `product:${productId}`,
        JSON.stringify(product),
        'EX',
        this.cacheExpiration
      );

      logger.info(`Product ${productId} retrieved from database`);
      return product;
    } catch (error) {
      logger.error(`Error getting product ${productId}:`, error);
      throw error;
    }
  }

  // Get recently viewed products for a user
  async getRecentlyViewed(userId) {
    try {
      // Try to get from cache first
      const cachedViews = await getAsync(`user:${userId}:recentlyViewed`);
      if (cachedViews) {
        logger.info(`Recently viewed products for user ${userId} retrieved from cache`);
        return JSON.parse(cachedViews);
      }

      // Get from Firestore
      const snapshot = await db
        .collection('users')
        .doc(userId)
        .collection('recentlyViewed')
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();

      const products = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const product = await this.getProduct(data.productId);
          return {
            ...product,
            viewedAt: data.timestamp.toDate(),
            viewCount: data.viewCount
          };
        })
      );

      // Cache the results
      await setAsync(
        `user:${userId}:recentlyViewed`,
        JSON.stringify(products),
        'EX',
        this.cacheExpiration
      );

      logger.info(`Recently viewed products for user ${userId} retrieved from database`);
      return products;
    } catch (error) {
      logger.error(`Error getting recently viewed products for user ${userId}:`, error);
      throw error;
    }
  }

  // Log a product view
  async logProductView(userId, productId) {
    try {
      const userRef = db.collection('users').doc(userId);
      const recentlyViewedRef = userRef.collection('recentlyViewed');

      // Get user data for email notification
      const userDoc = await userRef.get();
      const userData = userDoc.data();
      const userEmail = userData?.email;

      // Check if product was already viewed
      const existingView = await recentlyViewedRef
        .where('productId', '==', productId)
        .get();

      if (!existingView.empty) {
        // Update existing view
        const doc = existingView.docs[0];
        const data = doc.data();
        const newViewCount = data.viewCount + 1;

        await doc.ref.update({
          viewCount: newViewCount,
          timestamp: new Date()
        });

        // Send notification if view threshold is reached
        if (userEmail) {
          if (newViewCount === this.viewThreshold) {
            await emailService.sendNotification(userEmail, productId, newViewCount);
          } else if (newViewCount === this.milestoneThreshold) {
            await emailService.sendViewMilestoneNotification(userEmail, productId, newViewCount);
          }
        }

        logger.info(`Updated view count for product ${productId} by user ${userId} to ${newViewCount}`);
      } else {
        // Create new view
        await recentlyViewedRef.add({
          productId,
          timestamp: new Date(),
          viewCount: 1
        });
        logger.info(`Logged new view for product ${productId} by user ${userId}`);
      }

      // Invalidate cache
      await setAsync(`user:${userId}:recentlyViewed`, null);
    } catch (error) {
      logger.error(`Error logging product view for user ${userId}, product ${productId}:`, error);
      throw error;
    }
  }
}

module.exports = new ProductService();