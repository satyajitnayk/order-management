module.exports = {
  // preset: 'ts-jest', // enable if want to use typescript
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  moduleFileExtensions: ['js'],
  globals: {
    // 'ts-jest': {
    //   tsconfig: 'path/to/your/tsconfig.json', // Specify your TypeScript configuration file
    // },
  },
};
