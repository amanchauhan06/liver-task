jest.mock('../../../src/config/redis', () => require('../../mocks/redis'));
jest.mock('../../../src/config/firebase', () => require('../../mocks/firebase'));

const productService = require('../../../src/services/productService');
const { redis } = require('../../mocks/redis');
const firebase = require('../../mocks/firebase');
const { validUser } = require('../../fixtures/users');
const { validProduct } = require('../../fixtures/products');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecentlyViewed', () => {
    test('should return cached products if available', async () => {
      const mockProducts = [validProduct];
      redis.get.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const result = await productService.getRecentlyViewed(validUser.id);
      
      expect(result).toEqual(mockProducts);
      expect(redis.get).toHaveBeenCalledWith(`user:${validUser.id}:recentlyViewed`);
    });

    test('should fetch from database if cache miss', async () => {
      const mockProducts = [validProduct];
      redis.get.mockResolvedValueOnce(null);
      
      firebase.db.get.mockResolvedValueOnce({
        exists: true,
        data: () => mockProducts
      });

      const result = await productService.getRecentlyViewed(validUser.id);
      
      expect(result).toEqual(mockProducts);
      expect(firebase.db.collection).toHaveBeenCalled();
    });
  });
});