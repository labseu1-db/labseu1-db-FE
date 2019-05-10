module.exports = {
  extends: [ 'prettier' ],
  rules: {
    quotes: [ 2, 'single', { avoidEscape: true } ]
  },
  parser: 'babel-eslint'
};
