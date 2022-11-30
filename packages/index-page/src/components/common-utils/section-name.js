import styled from 'styled-components'
import color from '../../constants/color'
import mq from '@twreporter/core/lib/utils/media-query'

const SectionName = styled.div`
  display: none;
  ${mq.mobileOnly`
    display: block;
    font-size: 12px;
    position: absolute;
    letter-spacing: 0.4px;
    z-index: 3;
    top: -8px;
    left: 0;
    right: 0;
    text-align: center;
    >span {
      color: ${color.white};
      padding-left: 5px;
      padding-right: 5px;
      background-color: ${color.red};
    }
  `}
`

export default SectionName
