import ContentWrapper from './section-content-wrapper'
import styled from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'

const Section = styled(ContentWrapper)`
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  ${mq.mobileOnly`
    padding-top: 30px;
    padding-bottom: 60px;
  `}
`

export default Section
