const baseGCSDir = 'https://www.twreporter.org/images/logo/'

function selectLogoPath(logoType, branch, type) {
  switch (logoType) {
    case 'header': {
      const defaultPath = `${baseGCSDir}logo-header.${branch}.svg`
      const whitePath = `${baseGCSDir}logo-header-white.${branch}.svg`
      return type === 'white' ? whitePath : defaultPath
    }
    case 'footer': {
      return `${baseGCSDir}logo-footer.${branch}.svg`
    }
    case 'symbol': {
      const path = {
        default: `${baseGCSDir}logo-symbol-default.${branch}.svg`,
        black: `${baseGCSDir}logo-symbol-black.${branch}.svg`,
        white: `${baseGCSDir}logo-symbol-white.${branch}.svg`,
      }
      return path[type]
    }
    default: {
      return ''
    }
  }
}

export default {
  selectLogoPath,
}
