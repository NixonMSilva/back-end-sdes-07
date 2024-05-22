module.exports = {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    roots: ['<rootDir>/tests'],
    testEnvironment: 'node',
    transform: {
      '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
      '@/tests/(.*)': '<rootDir>/tests/$1',
      '@/(.*)': '<rootDir>/src/$1'
    },
    clearMocks: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/src/infra/db/prisma/prisma-helper.ts','<rootDir>/tests/infra/prisma/prisma-mock.ts'],
}
  