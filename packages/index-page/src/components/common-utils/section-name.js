import styled from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'

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
      color: ${colorGrayscale.white};
      padding-left: 5px;
      padding-right: 5px;
      background-color: ${colorBrand.heavy};
    }
  `}
`

export default SectionName
