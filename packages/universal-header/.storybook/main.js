import { dirname, join } from 'path'
const path = require('path')

module.exports = {
  stories: [
    '../src/**/**/*.stories.mdx',
    '../src/**/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-backgrounds'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['@twreporter/core/lib'] = path.resolve(
      __dirname,
      '../../core/src/'
    )
    config.resolve.alias['@twreporter/react-components/lib'] = path.resolve(
      __dirname,
      '../../react-components/src/'
    )
    return config
  },

  babel: config => {
    return {
      ...config,
      configFile: path.resolve(__dirname, './.babelrc.json'),
    }
  },

  docs: {
    autodocs: false,
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
