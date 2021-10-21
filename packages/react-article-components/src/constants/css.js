import { css } from 'styled-components'
import themeConst from './theme'
import typography from './typography'
import color from './color'

function getParagraphTextStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return css`
        color: ${color.notSoWhite};
      `
    case themeConst.article.v2.pink:
    case themeConst.article.v2.default:
    default:
      return css`
        color: ${color.gray90};
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
          color: ${color.milkTea};
          text-decoration: none;
          border-bottom: 1px solid ${color.gray10};
        }
        a:hover {
          border-color: ${color.milkTea};
        }
      `
    case themeConst.article.v2.pink:
      return css`
        a:link,
        a:visited,
        a:active {
          color: ${color.blue};
          text-decoration: none;
          border-bottom: 1px solid ${color.gray50};
        }
        a:hover {
          border-color: ${color.blue};
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        a:link,
        a:visited,
        a:active {
          color: ${color.brown};
          text-decoration: none;
          border-bottom: 1px solid ${color.gray50};
        }
        a:hover {
          border-color: ${color.brown};
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
