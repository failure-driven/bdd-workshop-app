module.exports = {
  testPathIgnorePatterns: ['config/webpack', 'node_modules'],
  setupFilesAfterEnv: ['./app/javascript/jestSetup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
