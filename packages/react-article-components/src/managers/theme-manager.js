import themeConst from '../constants/theme'
import colorConst from '../constants/color'

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
  text: colorConst.brown,
  accent: colorConst.brown,
  support: colorConst.milkTea,
  background: colorConst.lightBrown,
}

const baseColorSet = {
  text: colorConst.gray90,
  lightText: colorConst.gray80,
  button: {
    text: {
      color: colorConst.gray80,
    },
    border: {
      color: colorConst.gray80,
    },
    background: {
      color: 'initial',
    },
    hover: {
      text: {
        color: colorConst.gray80,
      },
      border: {
        color: colorConst.gray80,
      },
      background: {
        color: colorConst.white,
      },
    },
  },
  line: colorConst.gray60,
  background: colorConst.gray20,
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
        text: colorConst.blue,
        accent: colorConst.drakPink,
        support: colorConst.pink,
        background: colorConst.lightPink,
      },
      secondary: secondaryColorSet,
      base: baseColorSet,
      toc: {
        text: colorConst.gray70,
        accent: colorConst.darkPink,
        support: colorConst.pink,
        background: colorConst.lightPink,
      },
    },
    default: {
      primary: {
        text: colorConst.brown,
        accent: colorConst.brown,
        support: colorConst.milkTea,
        background: colorConst.gray30,
      },
      secondary: secondaryColorSet,
      base: {
        ...baseColorSet,
        background: colorConst.gray30,
      },
      toc: {
        text: colorConst.gray60,
        accent: colorConst.brown,
        support: colorConst.milkTea,
        background: colorConst.almostWhite,
      },
    },
    photo: {
      primary: {
        text: colorConst.brown,
        accent: colorConst.brown,
        support: colorConst.milkTea,
        background: colorConst.darkBlue,
      },
      secondary: secondaryColorSet,
      base: {
        text: colorConst.notSoWhite,
        lightText: colorConst.gray5,
        button: {
          text: {
            color: colorConst.gray80,
          },
          border: {
            color: colorConst.gray80,
          },
          background: {
            color: 'initial',
          },
          hover: {
            text: {
              color: colorConst.white,
            },
            border: {
              color: colorConst.white,
            },
            background: {
              color: 'initial',
            },
          },
        },
        line: colorConst.gray35,
        background: colorConst.darkBlue,
      },
      toc: {
        text: colorConst.gray60,
        accent: colorConst.brown,
        support: colorConst.milkTea,
        background: colorConst.almostWhite,
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
