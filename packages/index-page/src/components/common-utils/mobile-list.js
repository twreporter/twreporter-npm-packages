import styled from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'

const MobileList = styled.div`
  display: none;
  ${mq.mobileOnly`
    display: block;
  `}
`

export default MobileList
