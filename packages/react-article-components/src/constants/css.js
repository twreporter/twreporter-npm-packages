import { css } from 'styled-components'
import typography from './typography'
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

function getParagraphTextStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.photo:
      return css`
        color: ${colorGrayscale.gray300};
      `
    case ARTICLE_THEME.v2.pink:
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        color: ${colorGrayscale.gray800};
      `
  }
}

const paragraphText = css`
  ${(props) => getParagraphTextStyles(props.theme.name)}
  font-size: ${(props) => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.normal};
  line-height: 2.11;
  letter-spacing: 0.6px;

  /* line break */
  white-space: pre-wrap;
`

function getLinkChildrenStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.photo:
      return css`
        a:link,
        a:visited,
        a:active {
          color: ${colorSupportive.main};
          text-decoration: none;
          border-bottom: 1px solid ${colorGrayscale.gray400};
        }
        a:hover {
          border-color: ${colorSupportive.main};
        }
      `
    case ARTICLE_THEME.v2.pink:
      return css`
        a:link,
        a:visited,
        a:active {
          color: ${COLOR_PINK_ARTICLE.blue};
          text-decoration: none;
          border-bottom: 1px solid ${colorGrayscale.gray300};
        }
        a:hover {
          border-color: ${COLOR_PINK_ARTICLE.blue};
        }
      `
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        a:link,
        a:visited,
        a:active {
          color: ${colorSupportive.heavy};
          text-decoration: none;
          border-bottom: 1px solid ${colorGrayscale.gray300};
        }
        a:hover {
          border-color: ${colorSupportive.heavy};
        }
      `
  }
}

const linkChildren = css`
  ${(props) => getLinkChildrenStyles(props.theme.name)}
`

export default {
  paragraphText,
  linkChildren,
}
