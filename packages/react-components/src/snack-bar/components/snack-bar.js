import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// util
import { getSnackBarTheme } from '../utils/theme'
// component
import { P3 } from '../../text/paragraph'

const SnackBarContainer = styled.div`
  width: fit-content;
  padding: 8px 16px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
`

const SnackBar = ({ text = '', theme = 'normal' }) => {
  const { color, bgColor } = getSnackBarTheme(theme)
  return (
    <SnackBarContainer color={color} bgColor={bgColor}>
      <P3 text={text} />
    </SnackBarContainer>
  )
}
SnackBar.propTypes = {
  text: PropTypes.string,
  theme: PropTypes.oneOf(['normal', 'photography', 'transparent', 'index']),
}

export default SnackBar
