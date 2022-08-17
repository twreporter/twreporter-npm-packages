import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import { H1 } from '../../text/headline'
import { P1 } from '../../text/paragraph'
import Divider from '../../divider'

const BarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  & > div {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const TitleBar = ({ title = '', subtitle = '' }) => (
  <BarContainer>
    <H1 text={title} />
    <P1 text={subtitle} weight="bold" />
    <Divider direction="horizontal" />
  </BarContainer>
)
TitleBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default TitleBar
