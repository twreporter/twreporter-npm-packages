import styled from 'styled-components'
import { breakPoints } from '../../utils/style-utils'
import mq from '@twreporter/core/lib/utils/media-query'

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${breakPoints.overDesktopMinWidth};
  ${mq.desktopOnly`
    max-width: ${breakPoints.desktopMinWidth};
  `}
  ${mq.tabletOnly`
    max-width: ${breakPoints.tabletMinWidth};
  `}
  ${mq.mobileOnly`
    max-width: ${breakPoints.mobileMaxWidth};
  `}
`

export default ContentWrapper
