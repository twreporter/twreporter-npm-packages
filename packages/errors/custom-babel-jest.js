// Note:
// There's no way to run babel-jest with options.rootMode='upward' via cli currently.
// So we need to use a customize jest transformer that can tell babel to use config at root.
// Ref: https://jestjs.io/docs/en/tutorial-react#custom-transformers

module.exports = require('babel-jest').createTransformer({
  rootMode: 'upward',
})
