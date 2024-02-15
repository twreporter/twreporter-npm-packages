// @twreporter
import {
  colorBrand,
  colorPhoto,
  colorSupportive,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import { Style } from '../enums'
import { THEME } from '@twreporter/core/lib/constants/theme'

export const getFilledPillButtonTheme = (theme, disabled, style) => {
  if (disabled) {
    switch (theme) {
      case THEME.transparent:
        switch (style) {
          case Style.LIGHT:
            return {
              color: colorGrayscale.white,
              bgColor: colorGrayscale.gray400,
              hoverColor: colorGrayscale.white,
              hoverBgColor: colorGrayscale.gray400,
            }
          default:
            return {
              color: colorGrayscale.gray700,
              bgColor: colorGrayscale.gray500,
              hoverColor: colorGrayscale.gray700,
              hoverBgColor: colorGrayscale.gray500,
            }
        }
      case THEME.photography:
        return {
          color: colorGrayscale.gray700,
          bgColor: colorGrayscale.gray500,
          hoverColor: colorGrayscale.gray700,
          hoverBgColor: colorGrayscale.gray500,
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
      switch (style) {
        case Style.DARK:
          return {
            color: colorPhoto.dark,
            bgColor: colorGrayscale.white,
            hoverColor: colorPhoto.dark,
            hoverBgColor: colorGrayscale.gray200,
          }
        case Style.LIGHT:
          return {
            color: colorPhoto.dark,
            bgColor: colorGrayscale.gray300,
            hoverColor: colorPhoto.dark,
            hoverBgColor: colorGrayscale.gray400,
          }
        case Style.BRAND:
        default:
          return {
            color: colorPhoto.dark,
            bgColor: colorSupportive.faded,
            hoverColor: colorPhoto.dark,
            hoverBgColor: colorSupportive.pastel,
          }
      }
    case THEME.transparent:
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.gray800,
            bgColor: colorGrayscale.gray300,
            hoverColor: colorGrayscale.gray800,
            hoverBgColor: colorGrayscale.gray400,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.white,
            bgColor: colorGrayscale.gray800,
            hoverColor: colorGrayscale.white,
            hoverBgColor: colorGrayscale.black,
          }
        case Style.BRAND:
        default:
          return {
            color: colorGrayscale.gray800,
            bgColor: colorGrayscale.white,
            hoverColor: colorGrayscale.gray800,
            hoverBgColor: colorGrayscale.gray200,
          }
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
        switch (style) {
          case Style.LIGHT:
            return {
              color: colorGrayscale.gray400,
              bgColor: colorGrayscale.gray400,
              hoverColor: colorGrayscale.gray400,
              hoverBgColor: colorGrayscale.gray400,
            }
          default:
            return {
              color: colorGrayscale.gray500,
              bgColor: colorGrayscale.gray500,
              hoverColor: colorGrayscale.gray500,
              hoverBgColor: colorGrayscale.gray500,
            }
        }
      case THEME.photography:
        return {
          color: colorGrayscale.gray500,
          bgColor: colorGrayscale.gray500,
          hoverColor: colorGrayscale.gray500,
          hoverBgColor: colorGrayscale.gray500,
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
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.white,
            bgColor: colorGrayscale.white,
            hoverColor: colorGrayscale.gray200,
            hoverBgColor: colorGrayscale.gray200,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray300,
            bgColor: colorGrayscale.gray300,
            hoverColor: colorGrayscale.gray400,
            hoverBgColor: colorGrayscale.gray400,
          }
        case Style.BRAND:
        default:
          return {
            color: colorSupportive.faded,
            bgColor: colorSupportive.faded,
            hoverColor: colorSupportive.pastel,
            hoverBgColor: colorSupportive.pastel,
          }
      }
    case THEME.transparent:
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.gray300,
            bgColor: colorGrayscale.gray300,
            hoverColor: colorGrayscale.gray400,
            hoverBgColor: colorGrayscale.gray400,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray800,
            bgColor: colorGrayscale.gray800,
            hoverColor: colorGrayscale.black,
            hoverBgColor: colorGrayscale.black,
          }
        case Style.BRAND:
        default:
          return {
            color: colorGrayscale.white,
            bgColor: colorGrayscale.white,
            hoverColor: colorGrayscale.gray200,
            hoverBgColor: colorGrayscale.gray200,
          }
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
        hoverColor: colorSupportive.pastel,
      }
    case `${THEME.photography}-active`:
      return {
        color: colorSupportive.pastel,
        hoverColor: colorSupportive.pastel,
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
        hoverColor: colorSupportive.pastel,
      }
    case `${THEME.photography}-active`:
      return {
        color: colorSupportive.pastel,
        hoverColor: colorSupportive.pastel,
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
        hoverColor: colorSupportive.pastel,
      }
    case `${THEME.photography}-active`:
      return {
        color: colorSupportive.pastel,
        hoverColor: colorSupportive.pastel,
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

export const getTextButtonTheme = (theme, style) => {
  switch (theme) {
    case THEME.photography:
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.white,
            hoverColor: colorSupportive.pastel,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray300,
            hoverColor: colorGrayscale.gray400,
          }
        default:
        case Style.BRAND:
          return {
            color: colorSupportive.faded,
            hoverColor: colorSupportive.pastel,
          }
      }
    case THEME.transparent:
      switch (style) {
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray800,
            hoverColor: colorGrayscale.black,
          }
        default:
          return {
            color: colorGrayscale.white,
            hoverColor: colorGrayscale.gray200,
          }
      }
    case THEME.normal:
    default:
      switch (style) {
        case Style.DARK:
          return {
            color: colorGrayscale.gray800,
            hoverColor: colorBrand.heavy,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray600,
            hoverColor: colorGrayscale.gray800,
          }
        case Style.BRAND:
        default:
          return {
            color: colorBrand.heavy,
            hoverColor: colorBrand.dark,
          }
      }
  }
}

export const getDisabledTextButtonTheme = theme => {
  switch (theme) {
    case THEME.photography:
      return {
        color: colorGrayscale.gray500,
        hoverColor: colorGrayscale.gray500,
      }
    case THEME.transparent:
      return {
        color: colorGrayscale.gray500,
        hoverColor: colorGrayscale.gray500,
      }
    case THEME.normal:
    default:
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorGrayscale.gray400,
      }
  }
}

export const getActiveTextButtonTheme = (theme, style) => {
  switch (theme) {
    case THEME.photography:
      switch (style) {
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray400,
            hoverColor: colorGrayscale.gray400,
          }
        default:
          return {
            color: colorSupportive.pastel,
            hoverColor: colorSupportive.pastel,
          }
      }
    case THEME.transparent:
      switch (style) {
        case Style.LIGHT:
          return {
            color: colorGrayscale.black,
            hoverColor: colorGrayscale.black,
          }
        default:
          return {
            color: colorGrayscale.gray200,
            hoverColor: colorGrayscale.gray200,
          }
      }
    case THEME.normal:
    default:
      switch (style) {
        case Style.DARK:
          return {
            color: colorBrand.heavy,
            hoverColor: colorBrand.heavy,
          }
        case Style.LIGHT:
          return {
            color: colorGrayscale.gray800,
            hoverColor: colorGrayscale.gray800,
          }
        case Style.BRAND:
        default:
          return {
            color: colorBrand.dark,
            hoverColor: colorBrand.dark,
          }
      }
  }
}

export default {
  getFilledPillButtonTheme,
  getOutlinePillButtonTheme,
  getPrimaryIconButtonTheme,
  getSecondaryIconButtonTheme,
  getIconWithTextButtonTheme,
  getTextButtonTheme,
  getDisabledTextButtonTheme,
  getActiveTextButtonTheme,
}
