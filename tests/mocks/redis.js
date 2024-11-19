const redisMock = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    flushall: jest.fn(),
    quit: jest.fn(),
    getAsync: jest.fn(),
    setAsync: jest.fn()
  };
  
  module.exports = {
    redis: redisMock,
    getAsync: redisMock.getAsync,
    setAsync: redisMock.setAsync
  };
  
  // Clear all mock implementations
  beforeEach(() => {
    Object.values(redisMock).forEach(mock => mock.mockClear());
  });