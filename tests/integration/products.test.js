jest.mock('../../src/config/redis', () => require('../mocks/redis'));
jest.mock('../../src/config/firebase', () => require('../mocks/firebase'));

const request = require('supertest');
const app = require('../../src/index');
const { redis } = require('../mocks/redis');
const { validUser } = require('../fixtures/users');
const { validProduct } = require('../fixtures/products');

describe('Product API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/users/:userId/recentlyViewed', () => {
    test('should return recently viewed products for valid user', async () => {
      const mockProducts = [validProduct];
      redis.get.mockResolvedValueOnce(JSON.stringify(mockProducts));

      const response = await request(app)
        .get(`/api/v1/users/${validUser.id}/recentlyViewed`)
        .set('Authorization', `Bearer valid-token`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockProducts);
    });

    test('should return 401 for unauthorized request', async () => {
      const response = await request(app)
        .get(`/api/v1/users/${validUser.id}/recentlyViewed`);

      expect(response.status).toBe(401);
    });
  });
});