import styled from 'styled-components'
import { breakPoints } from '../../utils/style-utils'
import color from '../../constants/color'

const HoverEffect = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${color.darkGray};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    &:hover {
      opacity: 0.7;
    }
    transition: 200ms opacity linear;
  }
`
export default HoverEffect
