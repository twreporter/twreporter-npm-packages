import { css } from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'

export const linkHoverFadeOut = css`
  ${mq.desktopAndAbove`
    &:hover {
      opacity: .7;
      transition: 200ms opacity linear;  
    }
  `}
`

export const resetLinkStyle =
  'a:hover,a:active,a:link,a:visited { color: inherit; text-decoration: none; }'
