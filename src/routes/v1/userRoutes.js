const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/auth');
const productService = require('../../services/productService');
const logger = require('../../utils/logger');

// Get recently viewed products
router.get('/:userId/recentlyViewed', authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await productService.getRecentlyViewed(userId);
    res.json(products);
  } catch (error) {
    logger.error('Error getting recently viewed products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log product view
router.post('/:userId/productView', authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    await productService.logProductView(userId, productId);
    logger.info(`Product view logged: user=${userId}, product=${productId}`);
    res.status(200).json({ message: 'Product view logged successfully' });
  } catch (error) {
    logger.error('Error logging product view:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;