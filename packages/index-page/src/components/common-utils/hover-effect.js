import styled from 'styled-components'
import { breakPoints } from '../../utils/style-utils'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const HoverEffect = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${colorGrayscale.gray800};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    &:hover {
      opacity: 0.7;
    }
    transition: 200ms opacity linear;
  }
`
export default HoverEffect
