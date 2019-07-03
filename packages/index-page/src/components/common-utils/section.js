import ContentWrapper from './section-content-wrapper'
import styled from 'styled-components'
import { finalMedia } from '../../utils/style-utils'

const Section = styled(ContentWrapper)`
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  ${finalMedia.mobile`
    padding-top: 30px;
    padding-bottom: 60px;
  `}
`

export default Section
