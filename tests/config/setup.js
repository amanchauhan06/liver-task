const { redis } = require('../../src/config/redis');
const logger = require('../../src/utils/logger');

// Disable logging during tests
if (logger.transports) {
  logger.transports.forEach((t) => (t.silent = true));
}

// Setup and teardown
beforeAll(async () => {
  if (redis && redis.flushall) {
    await redis.flushall();
  }
});

afterAll(async () => {
  if (redis && redis.quit) {
    await redis.quit();
  }
});