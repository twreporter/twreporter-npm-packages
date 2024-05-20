import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// util
import { getSnackBarTheme } from '../utils/theme'
// component
import { P3, P2 } from '../../text/paragraph'
import { MobileOnly, TabletAndAbove } from '../../rwd'
// @twreporter
import { THEME } from '@twreporter/core/lib/constants/theme'

const SnackBarContainer = styled.div`
  width: fit-content;
  padding: 8px 16px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$bgColor};
`

const SnackBar = ({ text = '', theme = THEME.normal }) => {
  const { color, bgColor } = getSnackBarTheme(theme)
  return (
    <SnackBarContainer $color={color} $bgColor={bgColor}>
      <MobileOnly>
        <P3 text={text} />
      </MobileOnly>
      <TabletAndAbove>
        <P2 text={text} />
      </TabletAndAbove>
    </SnackBarContainer>
  )
}
SnackBar.propTypes = {
  text: PropTypes.string,
  theme: PropTypes.oneOf(Object.values(THEME)),
}
SnackBar.THEME = THEME

export default SnackBar
