import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: '.',
  roots: ['.'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageDirectory: '.coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
  },
  setupFiles: ['<rootDir>/jest/setup-file.ts'],
  testRegex: ['./src/.*.spec.ts$', './test/integration/.*.test.ts$'],
};

export default config;
