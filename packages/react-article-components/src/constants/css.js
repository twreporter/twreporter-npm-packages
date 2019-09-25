import { css } from 'styled-components'
import themeConst from './theme'
import typography from './typography'

function getParagraphTextStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return css`
        color: rgba(255, 255, 255, 0.7);
      `
    case themeConst.article.v2.pink:
    case themeConst.article.v2.default:
    default:
      return css`
        color: #404040;
      `
  }
}

const paragraphText = css`
  ${props => getParagraphTextStyles(props.theme.name)}
  font-size: ${props => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.normal};
  line-height: 2.11;
  letter-spacing: 0.6px;

  /* line break */
  white-space: pre-wrap;
`

function getLinkChildrenStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return css`
        a:link,
        a:visited,
        a:active {
          color: #d0a67d;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        a:hover {
          border-color: #d0a67d;
        }
      `
    case themeConst.article.v2.pink:
      return css`
        a:link,
        a:visited,
        a:active {
          color: #355ed3;
          text-decoration: none;
          border-bottom: 1px solid #d8d8d8;
        }
        a:hover {
          border-color: #355ed3;
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        a:link,
        a:visited,
        a:active {
          color: #a67a44;
          text-decoration: none;
          border-bottom: 1px solid #d8d8d8;
        }
        a:hover {
          border-color: #a67a44;
        }
      `
  }
}

const linkChildren = css`
  ${props => getLinkChildrenStyles(props.theme.name)}
`

export default {
  paragraphText,
  linkChildren,
}
