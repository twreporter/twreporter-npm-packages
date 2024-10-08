import { fonts, fontWeight } from '@twreporter/core/lib/constants/font'
// lodash
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'

const _ = {
  forEach,
  keys,
  reduce,
}

const baseGCSDir = 'https://www.twreporter.org/assets/font/'
const fileExt = '.woff2'

const gcsFontFolder = {
  [fonts.notoSansTC]: 'NotoSansTC',
  [fonts.tauhuOo]: 'TauhuOo',
}

const fontWeightKeys = {
  [fonts.notoSansTC]: _.keys(fontWeight),
  [fonts.tauhuOo]: ['normal'],
}

// add @font-face to global style to use self-hosted font for performance reasons, to be more precise please check the issue below:
// https://twreporter-org.atlassian.net/browse/TWREPORTER-318?atlOrigin=eyJpIjoiNjg4OTQ2MWU2MGIxNGEzMGE0NDY2ZDNmZGRhOWExZDEiLCJwIjoiaiJ9
const getFontFaces = ({ font, folder }) => {
  const fontFaceCSSTemplate = ({ fontWeightKey }) => `
    @font-face {
      font-family: "${font}";
      font-weight: ${fontWeight[fontWeightKey]};
      font-display: swap;
      src: url("${baseGCSDir}${folder}/${fontWeightKey}${fileExt}");
    }
  `
  return _.reduce(
    fontWeightKeys[font],
    (fontFaces, fontWeightKey) => {
      return fontFaces + fontFaceCSSTemplate({ fontWeightKey })
    },
    ''
  )
}

const fontFaces = {
  [fonts.notoSansTC]: getFontFaces({
    font: fonts.notoSansTC,
    folder: gcsFontFolder[fonts.notoSansTC],
  }),
  [fonts.tauhuOo]: getFontFaces({
    font: fonts.tauhuOo,
    folder: gcsFontFolder[fonts.tauhuOo],
  }),
}

let fontGCSFiles = []

_.forEach(fontFaces, function (fontFace, font) {
  _.forEach(fontWeightKeys[font], (fontWeightKey) => {
    fontGCSFiles.push(
      `${baseGCSDir}${gcsFontFolder[font]}/${fontWeightKey}${fileExt}`
    )
  })
})

export default { fontFaces, fontGCSFiles }
