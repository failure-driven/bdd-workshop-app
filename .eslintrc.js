module.exports = {
  plugins: ['react', 'jest'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline']
  }
};
