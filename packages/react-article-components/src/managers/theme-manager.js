import themeConst from '../constants/theme'

/**
 *  @module ThemeManager
 */

/**
 *  Color set
 *  @typedef {Object} ColorSet
 *  @property {string} text - Text color
 *  @property {string} accent - Accent color
 *  @property {string} support - Support color
 *  @property {string} background - Background color
 */

/**
 *  Theme Colors
 *  @typedef {Object} ThemeColors
 *  @property {ColorSet} primary - Primary color set
 *  @property {ColorSet} secondary - Secondary color set
 *  @property {ColorSet} base - Base color set
 */

const secondaryColorSet = {
  text: '#a67a44',
  accent: '#a67a44',
  support: '#d0a67d',
  background: '#c9af8e',
}

const baseColorSet = {
  text: '#404040',
  lightText: '#808080',
  button: {
    text: {
      color: '#808080',
    },
    border: {
      color: '#808080',
    },
    background: {
      color: 'initial',
    },
    hover: {
      text: {
        color: '#808080',
      },
      border: {
        color: '#808080',
      },
      background: {
        color: '#fff',
      },
    },
  },
  line: '#afafaf',
  background: '#f4f4f4',
}

/**
 *  @class Create a new ThemeManager
 */
export default class ThemeManager {
  // WARNING
  // DO NOT ADD MORE COLORS HERE
  // ThemeManager is going to be deprecated
  static colors = {
    pink: {
      primary: {
        text: '#355ed3',
        accent: '#ef7ede',
        support: '#fbafef',
        background: '#fadaf5',
      },
      secondary: secondaryColorSet,
      base: baseColorSet,
      toc: {
        text: '#9c9c9c',
        accent: '#ef7ede',
        support: '#fbafef',
        background: '#fadaf5',
      },
    },
    default: {
      primary: {
        text: '#a67a44',
        accent: '#a67a44',
        support: '#d0a67d',
        background: '#f1f1f1',
      },
      secondary: secondaryColorSet,
      base: {
        ...baseColorSet,
        background: '#f1f1f1',
      },
      toc: {
        text: '#afafaf',
        accent: '#a67a44',
        support: '#d0a67d',
        background: '#fefefe',
      },
    },
    photo: {
      primary: {
        text: '#a67a44',
        accent: '#a67a44',
        support: '#d0a67d',
        background: '#08192d',
      },
      secondary: secondaryColorSet,
      base: {
        text: 'rgba(255, 255, 255, 0.8)',
        lightText: 'rgba(255, 255, 255, 0.5)',
        button: {
          text: {
            color: '#808080',
          },
          border: {
            color: '#808080',
          },
          background: {
            color: 'initial',
          },
          hover: {
            text: {
              color: '#fff',
            },
            border: {
              color: '#fff',
            },
            background: {
              color: 'initial',
            },
          },
        },
        line: 'rgba(216, 216, 216, 0.2)',
        background: '#08192d',
      },
      toc: {
        text: '#afafaf',
        accent: '#a67a44',
        support: '#d0a67d',
        background: '#fefefe',
      },
    },
  }

  /**
   *  @param {string} [theme=article:v2:default] - Theme name
   *  @returns {undefined}
   */
  constructor(theme) {
    this.theme = theme
  }

  /**
   *  @param {string} [theme=article:v2:default] - Theme name
   *  @returns {ThemeColors}
   */
  getColors(theme = '') {
    const _theme = theme || this.theme

    switch (_theme) {
      case themeConst.article.v2.pink: {
        return ThemeManager.colors.pink
      }
      case themeConst.article.v2.photo: {
        return ThemeManager.colors.photo
      }
      case themeConst.article.v2.default:
      default: {
        return ThemeManager.colors.default
      }
    }
  }
}
