module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/index.js'
    ],
    testMatch: [
      '**/tests/**/*.test.js'
    ],
    setupFiles: [
      '<rootDir>/tests/setup.js'
    ]
  };