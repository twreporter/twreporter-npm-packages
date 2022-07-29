import { fonts, fontWeight } from '@twreporter/core/lib/constants/font'
// lodash
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'

const _ = {
  keys,
  reduce,
}

const baseGCSDir = 'https://www.twreporter.org/assets/font/'

const gcsFontFolder = {
  [fonts.notoSansTC]: 'NotoSansTC',
}

const fontWeightKeys = _.keys(fontWeight)

// add @font-face to global style to use self-hosted font for performance reasons, to be more precise please check the issue below:
// https://twreporter-org.atlassian.net/browse/TWREPORTER-318?atlOrigin=eyJpIjoiNjg4OTQ2MWU2MGIxNGEzMGE0NDY2ZDNmZGRhOWExZDEiLCJwIjoiaiJ9
const getFontFaces = ({ font, folder }) => {
  const fontFaceCSSTemplate = ({ fontWeightKey }) => `
    @font-face {
      font-family: "${font}";
      font-weight: ${fontWeight[fontWeightKey]};
      font-display: swap;
      src: url("${baseGCSDir}${folder}/${fontWeightKey}.otf");
    }
  `
  return _.reduce(
    fontWeightKeys,
    (fontFaces, fontWeightKey) => {
      return fontFaces + fontFaceCSSTemplate({ fontWeightKey })
    },
    ''
  )
}

export default {
  [fonts.notoSansTC]: getFontFaces({
    font: fonts.notoSansTC,
    folder: gcsFontFolder[fonts.notoSansTC],
  }),
}
