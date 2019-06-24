import styled from 'styled-components'

const MobileList = styled.div`
  display: none;
  @media (max-width: ${props => props.maxWidth}) {
    display: block;
  }
`

export default MobileList
