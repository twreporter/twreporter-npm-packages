import themeConst from '../constants/theme'
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'

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
  text: colorSupportive.heavy,
  accent: colorSupportive.heavy,
  support: colorSupportive.main,
  background: colorSupportive.pastel,
}

const baseColorSet = {
  text: colorGrayscale.gray800,
  lightText: colorGrayscale.gray600,
  button: {
    text: {
      color: colorGrayscale.gray600,
    },
    border: {
      color: colorGrayscale.gray600,
    },
    background: {
      color: 'initial',
    },
    hover: {
      text: {
        color: colorGrayscale.gray600,
      },
      border: {
        color: colorGrayscale.gray600,
      },
      background: {
        color: colorGrayscale.white,
      },
    },
  },
  background: colorGrayscale.gray100,
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
        text: COLOR_PINK_ARTICLE.blue,
        accent: COLOR_PINK_ARTICLE.drakPink,
        support: COLOR_PINK_ARTICLE.pink,
        background: COLOR_PINK_ARTICLE.lightPink,
      },
      secondary: secondaryColorSet,
      base: baseColorSet,
      toc: {
        text: colorGrayscale.gray500,
        accent: COLOR_PINK_ARTICLE.darkPink,
        support: COLOR_PINK_ARTICLE.pink,
        background: COLOR_PINK_ARTICLE.lightPink,
      },
    },
    default: {
      primary: {
        text: colorSupportive.heavy,
        accent: colorSupportive.heavy,
        support: colorSupportive.main,
        background: colorGrayscale.gray100,
      },
      secondary: secondaryColorSet,
      base: {
        ...baseColorSet,
        background: colorGrayscale.gray100,
      },
      toc: {
        text: colorGrayscale.gray500,
        accent: colorSupportive.heavy,
        support: colorSupportive.main,
        background: colorGrayscale.white,
      },
    },
    photo: {
      primary: {
        text: colorSupportive.heavy,
        accent: colorSupportive.heavy,
        support: colorSupportive.main,
        background: COLOR_PINK_ARTICLE.darkBlue,
      },
      secondary: secondaryColorSet,
      base: {
        text: colorGrayscale.gray300,
        lightText: colorGrayscale.gray600,
        button: {
          text: {
            color: colorGrayscale.gray600,
          },
          border: {
            color: colorGrayscale.gray600,
          },
          background: {
            color: 'initial',
          },
          hover: {
            text: {
              color: colorGrayscale.white,
            },
            border: {
              color: colorGrayscale.white,
            },
            background: {
              color: 'initial',
            },
          },
        },
        background: COLOR_PINK_ARTICLE.darkBlue,
      },
      toc: {
        text: colorGrayscale.gray500,
        accent: colorSupportive.heavy,
        support: colorSupportive.main,
        background: colorGrayscale.white,
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
