import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'material-symbols/outlined.css'

const StyledSymbol = styled.span`
  font-variation-settings: ${(props) => `
    'FILL': ${props.fill},
    'wght': ${props.weight},
    'GRAD': ${props.grade},
    'opsz': ${props.size}
  `};
`

const MeterialSymbol = ({
  icon,
  fill = false,
  weight = 400,
  grade = 0,
  size = 24,
}) => {
  const className = 'material-symbols-outlined'
  return (
    <StyledSymbol
      className={className}
      fill={fill ? '0' : '1'}
      weight={weight}
      grade={grade}
      size={size}
    >
      {icon}
    </StyledSymbol>
  )
}
MeterialSymbol.propTypes = {
  icon: PropTypes.string.isRequired,
  fill: PropTypes.bool,
  weight: PropTypes.number,
  grade: PropTypes.number,
  size: PropTypes.number,
}

export default MeterialSymbol
