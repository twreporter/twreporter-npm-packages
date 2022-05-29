// @twreporter
import {
  colorBrand,
  colorPhoto,
  colorSupportive,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'

export const getFilledPillButtonTheme = (theme, disabled) => {
  if (disabled) {
    switch (theme) {
      case 'transparent':
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
    case 'photography':
      return {
        color: colorPhoto.dark,
        bgColor: colorSupportive.main,
        hoverColor: colorGrayscale.white,
        hoverBgColor: colorSupportive.heavy,
      }
    case 'transparent':
      return {
        color: colorGrayscale.gray600,
        bgColor: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
        hoverBgColor: colorGrayscale.gray400,
      }
    case 'normal':
    case 'index':
    default:
      return {
        color: colorGrayscale.white,
        bgColor: colorBrand.heavy,
        hoverColor: colorGrayscale.white,
        hoverBgColor: colorBrand.dark,
      }
  }
}

export const getOutlinePillButtonTheme = (theme, disabled) => {
  if (disabled) {
    switch (theme) {
      case 'transparent':
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
    case 'photography':
      return {
        color: colorSupportive.main,
        bgColor: colorSupportive.main,
        hoverColor: colorSupportive.heavy,
        hoverBgColor: colorSupportive.heavy,
      }
    case 'transparent':
      return {
        color: colorGrayscale.white,
        bgColor: colorGrayscale.white,
        hoverColor: colorGrayscale.gray600,
        hoverBgColor: colorGrayscale.gray600,
      }
    case 'normal':
    case 'index':
    default:
      return {
        color: colorBrand.heavy,
        bgColor: colorBrand.heavy,
        hoverColor: colorBrand.dark,
        hoverBgColor: colorBrand.dark,
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
    case 'photography':
      return {
        color: colorGrayscale.white,
        hoverColor: colorSupportive.main,
      }
    case 'photography-active':
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case 'transparent':
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.gray200,
      }
    case 'transparent-active':
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
      }
    case 'normal-active':
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case 'normal':
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
    case 'photography':
      return {
        color: colorGrayscale.gray400,
        hoverColor: colorSupportive.main,
      }
    case 'photography-active':
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case 'transparent':
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.white,
      }
    case 'transparent-active':
      return {
        color: colorGrayscale.gray600,
        hoverColor: colorGrayscale.gray600,
      }
    case 'normal-active':
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case 'normal':
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
    case 'photography':
      return {
        color: colorGrayscale.gray100,
        hoverColor: colorSupportive.main,
      }
    case 'photography-active':
      return {
        color: colorSupportive.main,
        hoverColor: colorSupportive.main,
      }
    case 'transparent':
      return {
        color: colorGrayscale.gray100,
        hoverColor: colorGrayscale.gray200,
      }
    case 'transparent-active':
      return {
        color: colorGrayscale.white,
        hoverColor: colorGrayscale.white,
      }
    case 'normal-active':
      return {
        color: colorBrand.heavy,
        hoverColor: colorBrand.heavy,
      }
    case 'normal':
    default:
      return {
        color: colorGrayscale.gray600,
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
}
