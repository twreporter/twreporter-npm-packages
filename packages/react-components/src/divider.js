import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'

// direction enum
const direction = {
  horizontal: 'horizontal',
  vertical: 'vertical',
}

const borderWidth = {
  vertical: [0, '1px', 0, 0],
  horizontal: ['1px', 0, 0, 0],
}

const height = {
  vertical: '100%',
  horizontal: 0,
}

const width = {
  vertical: 0,
  horizontal: '100%',
}

const DividerBox = styled.div`
  border-width: ${props => arrayToCssShorthand(borderWidth[props.direction])};
  border-style: solid;
  border-color: ${colorGrayscale.gray300};
  height: ${props => height[props.direction]};
  width: ${props => width[props.direction]};
`

const Divider = ({ direction = 'horizontal', ...props }) => {
  return <DividerBox direction={direction} {...props} />
}
Divider.propTypes = {
  direction: PropTypes.oneOf(Object.values(direction)),
}
Divider.direction = direction

export default Divider
