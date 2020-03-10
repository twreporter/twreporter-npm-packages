// Note:
// There's no way to run babel-jest with options.rootMode='upward' via cli currently.
// So we need to use a customize jest transformer that can tell babel to use config at root.
// Ref: https://github.com/facebook/jest/issues/8006#issuecomment-544653488

module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': require('path').join(__dirname, 'custom-babel-jest.js'),
  },
}
