const path = require('path')

module.exports = {
  stories: [
    '../src/**/**/*.stories.mdx',
    '../src/**/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['@twreporter/core/lib'] = path.resolve(
      __dirname,
      '../../core/src/'
    )
    return config
  },
}
