import dotenv from 'dotenv'
dotenv.config()

export default {
  transform: {},
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^.+.(png|flac)$': '<rootDir>/mediaFileMock.js',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
