// @twreporter
import {
  colorBrand,
  colorPhoto,
  colorSupportive,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import { Style } from '../enums'
import { THEME, TEXT_BUTTON_THEME } from '@twreporter/core/lib/constants/theme'

export const getFilledPillButtonTheme = (theme, disabled, style) => {
  if (disabled) {
    switch (theme) {
      case THEME.transparent:
        return {
          color: colorGrayscale.white,
          bgColor: colorGrayscale.gray200,
          hoverColor: colorGrayscale.white,
          hoverBgColor: colorGrayscale.gray200,
        }
      default:
        return {
          color: colorGrayscale.white,
          bgColor: colorGrayscale.gray400,
          hoverColor: colorGrayscale.white,
          hoverBgColor: colorGrayscale.gray400,
        }
    }
  }
  switch (theme) {
    case THEME.photography:
      return {
        color: colorPhoto.dark,
        bgColor: colorSupportive.main,
        hoverColor: colorGrayscale.white,
        hoverBgColor: colorSupportive.heavy,
      }
    case THEME.transparent:
      return {
        color: colorGrayscale.gray600,
        bgColor: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
        hoverBgColor: colorGrayscale.gray400,
      }
    case THEME.normal:
    case THEME.index:
    default:
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.white,
            bgColor: colorGrayscale.gray800,
            hoverColor: colorGrayscale.white,
            hoverBgColor: colorGrayscale.black,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray800,
            bgColor: colorGrayscale.white,
            hoverColor: colorGrayscale.gray800,
            hoverBgColor: colorGrayscale.gray200,
          }
        case Style.BRAND:
        default:
          return {
            color: colorGrayscale.white,
            bgColor: colorBrand.heavy,
            hoverColor: colorGrayscale.white,
            hoverBgColor: colorBrand.dark,
          }
      }
  }
}

export const getOutlinePillButtonTheme = (theme, disabled, style) => {
  if (disabled) {
    switch (theme) {
      case THEME.transparent:
        return {
          color: colorGrayscale.gray200,
          bgColor: colorGrayscale.gray200,
          hoverColor: colorGrayscale.gray200,
          hoverBgColor: colorGrayscale.gray200,
        }
      case THEME.photography:
        return {
          color: colorGrayscale.gray600,
          bgColor: colorGrayscale.gray200,
          hoverColor: colorGrayscale.gray600,
          hoverBgColor: colorGrayscale.gray200,
        }
      default:
        return {
          color: colorGrayscale.gray400,
          bgColor: colorGrayscale.gray400,
          hoverColor: colorGrayscale.gray400,
          hoverBgColor: colorGrayscale.gray400,
        }
    }
  }
  switch (theme) {
    case THEME.photography:
      return {
        color: colorSupportive.main,
        bgColor: colorSupportive.main,
        hoverColor: colorSupportive.heavy,
        hoverBgColor: colorSupportive.heavy,
      }
    case THEME.transparent:
      return {
        color: colorGrayscale.white,
        bgColor: colorGrayscale.white,
        hoverColor: colorGrayscale.gray600,
        hoverBgColor: colorGrayscale.gray600,
      }
    case THEME.normal:
    case THEME.index:
    default:
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.gray800,
            bgColor: colorGrayscale.gray800,
            hoverColor: colorGrayscale.black,
            hoverBgColor: colorGrayscale.black,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray800,
            bgColor: colorGrayscale.white,
            hoverColor: colorGrayscale.gray800,
            hoverBgColor: colorGrayscale.gray200,
          }
        case Style.BRAND:
        default:
          return {
            color: colorBrand.heavy,
            bgColor: colorBrand.heavy,
            hoverColor: colorBrand.dark,
            hoverBgColor: colorBrand.dark,
          }
      }
  }
}

export const getPrimaryIconButtonTheme = (theme, isActive, isDisabled) => {
  if (isDisabled) {
    return {
      color: colorGrayscale.gray400,
      hoverColor: colorGrayscale.gray400,
    }
  }

  const switchKey = isActive ? `${theme}-active` : theme
  switch (switchKey) {
    case THEME.photography:
      return {
        color: colorGrayscale.white,
        hoverColor: colorSupportive.main,
      }
    case `${THEME.photography}-active`:
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case THEME.transparent:
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.gray200,
      }
    case `${THEME.transparent}-active`:
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
      }
    case `${THEME.normal}-active`:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case THEME.normal:
    default:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray800,
      }
  }
}

export const getSecondaryIconButtonTheme = (theme, isActive, isDisabled) => {
  if (isDisabled) {
    return {
      color: colorGrayscale.gray400,
      hoverColor: colorGrayscale.gray400,
    }
  }

  const switchKey = isActive ? `${theme}-active` : theme
  switch (switchKey) {
    case THEME.photography:
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorSupportive.main,
      }
    case `${THEME.photography}-active`:
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case THEME.transparent:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.white,
      }
    case `${THEME.transparent}-active`:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray600,
      }
    case `${THEME.normal}-active`:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case THEME.normal:
    default:
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorGrayscale.gray600,
      }
  }
}

export const getIconWithTextButtonTheme = (theme, isActive, isDisabled) => {
  if (isDisabled) {
    return {
      color: colorGrayscale.gray400,
      hoverColor: colorGrayscale.gray400,
    }
  }

  const switchKey = isActive ? `${theme}-active` : theme
  switch (switchKey) {
    case THEME.photography:
      return {
        color: colorGrayscale.gray200,
        hoverColor: colorSupportive.main,
      }
    case `${THEME.photography}-active`:
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case THEME.transparent:
      return {
        color: colorGrayscale.gray100,
        hoverColor: colorGrayscale.gray200,
      }
    case `${THEME.transparent}-active`:
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
      }
    case `${THEME.normal}-active`:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case THEME.normal:
    default:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorBrand.heavy,
      }
  }
}

export const getPrimaryTextButtonTheme = theme => {
  switch (theme) {
    case TEXT_BUTTON_THEME.photography:
      return {
        color: colorGrayscale.white,
        hoverColor: colorSupportive.main,
      }
    case TEXT_BUTTON_THEME.transparent:
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.gray800,
      }
    case TEXT_BUTTON_THEME.brand:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.dark,
      }
    case TEXT_BUTTON_THEME.dark:
      return {
        color: colorGrayscale.gray800,
        hoverColor: colorBrand.heavy,
      }
    case TEXT_BUTTON_THEME.light:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray800,
      }
    case TEXT_BUTTON_THEME.normal:
    default:
      return {
        color: colorGrayscale.gray800,
        hoverColor: colorBrand.heavy,
      }
  }
}

export const getSecondaryTextButtonTheme = theme => {
  switch (theme) {
    case TEXT_BUTTON_THEME.photography:
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorSupportive.main,
      }
    case TEXT_BUTTON_THEME.transparent:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray800,
      }
    case TEXT_BUTTON_THEME.brand:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.dark,
      }
    case TEXT_BUTTON_THEME.dark:
      return {
        color: colorGrayscale.gray800,
        hoverColor: colorBrand.heavy,
      }
    case TEXT_BUTTON_THEME.light:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray800,
      }
    case TEXT_BUTTON_THEME.normal:
    default:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorBrand.heavy,
      }
  }
}

export const getDisabledTextButtonTheme = theme => {
  switch (theme) {
    case TEXT_BUTTON_THEME.photography:
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray600,
      }
    case TEXT_BUTTON_THEME.transparent:
      return {
        color: colorGrayscale.gray200,
        hoverColor: colorGrayscale.gray200,
      }
    case TEXT_BUTTON_THEME.brand:
    case TEXT_BUTTON_THEME.dark:
    case TEXT_BUTTON_THEME.light:
    case TEXT_BUTTON_THEME.normal:
    default:
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorGrayscale.gray400,
      }
  }
}

export const getActiveTextButtonTheme = theme => {
  switch (theme) {
    case TEXT_BUTTON_THEME.photography:
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case TEXT_BUTTON_THEME.transparent:
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
      }
    case TEXT_BUTTON_THEME.brand:
      return {
        color: colorBrand.dark,
        hoverColor: colorBrand.dark,
      }
    case TEXT_BUTTON_THEME.dark:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case TEXT_BUTTON_THEME.light:
      return {
        color: colorGrayscale.gray800,
        hoverColor: colorGrayscale.gray800,
      }
    case TEXT_BUTTON_THEME.normal:
    default:
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
  }
}

export default {
  getFilledPillButtonTheme,
  getOutlinePillButtonTheme,
  getPrimaryIconButtonTheme,
  getSecondaryIconButtonTheme,
  getIconWithTextButtonTheme,
  getPrimaryTextButtonTheme,
  getSecondaryTextButtonTheme,
  getDisabledTextButtonTheme,
  getActiveTextButtonTheme,
}
