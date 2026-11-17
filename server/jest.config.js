// @ts-expect-no-error Jest coverage threshold for the server suite
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/types/**'],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 70,
      branches: 40,
    },
  },
  testTimeout: 20000,
};
