const baseGCSDir = 'https://www.twreporter.org/images/logo/'

function selectLogoPath(logoType, branch) {
  switch (logoType) {
    case 'header': {
      const defaultPath = `${baseGCSDir}logo-header.${branch}.svg`
      const whitePath = `${baseGCSDir}logo-header-white.${branch}.svg`
      return [defaultPath, whitePath]
    }
    case 'footer': {
      return `${baseGCSDir}logo-footer.${branch}.svg`
    }
    default: {
      return ''
    }
  }
}

export default {
  selectLogoPath,
}
