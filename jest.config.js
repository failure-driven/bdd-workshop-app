module.exports = {
  verbose: true,
  rootDir: './app/javascript',
  testPathIgnorePatterns: ['config/webpack', 'node_modules'],
  setupFilesAfterEnv: ['<rootDir>jestSetup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
