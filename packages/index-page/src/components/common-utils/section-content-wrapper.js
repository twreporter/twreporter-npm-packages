import styled from 'styled-components'
import { breakPoints, finalMedia } from '../../utils/style-utils'

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${breakPoints.overDesktopMinWidth};
  ${finalMedia.desktop`
    max-width: ${breakPoints.desktopMinWidth};
  `}
  ${finalMedia.tablet`
    max-width: ${breakPoints.tabletMinWidth};
  `}
  ${finalMedia.mobile`
    max-width: ${breakPoints.mobileMaxWidth};
  `}
`

export default ContentWrapper
