import styled from 'styled-components'
import { resetLinkStyle } from '../constants/predefined-css'
import mq from '@twreporter/core/lib/utils/media-query'

const styles = {
  contentWidth: {
    min: 300, // px
    mobile: 100, // %
    tablet: 698, // px
    desktop: 922, // px
    hd: 1130, // px
  },
  titlePadding: 0,
  titleMargin: {
    mobile: [0, 0, 19, 0],
    tablet: [0, 0, 33, 0],
  },
}

const PageContent = styled.div`
  min-width: ${styles.contentWidth.min}px;
  width: ${styles.contentWidth.mobile}%;
  ${mq.tabletOnly`
    width: ${styles.contentWidth.tablet}px;
  `}
  ${mq.desktopOnly`
    width: ${styles.contentWidth.desktop}px;
  `}
  ${mq.hdOnly`
    width: ${styles.contentWidth.hd}px;
  `}
  margin: 0 auto;
  ${resetLinkStyle}
`

export default PageContent
