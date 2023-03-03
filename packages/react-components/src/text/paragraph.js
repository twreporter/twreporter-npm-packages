import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { WEIGHT, WEIGHT_PROP_TYPES } from './constants/font-weight'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'

const defaultContainer = styled.div`
  font-weight: ${props => fontWeight[props.weight]};
  font-family: ${fontFamily.default};
  line-height: 150%;
`

const P1Container = styled(defaultContainer)`
  font-size: 16px;
`

const P2Container = styled(defaultContainer)`
  font-size: 14px;
`

const P3Container = styled(defaultContainer)`
  font-size: 12px;
`

const P4Container = styled(defaultContainer)`
  font-size: 10px;
`

export const P1 = ({
  text = '',
  weight = WEIGHT.normal,
  className = '',
  ...props
}) => {
  return (
    <P1Container weight={weight} className={className} {...props}>
      {text}
    </P1Container>
  )
}
P1.propTypes = {
  text: PropTypes.string,
  weight: WEIGHT_PROP_TYPES,
  className: PropTypes.string,
}

export const P2 = ({
  text = '',
  weight = WEIGHT.normal,
  className = '',
  ...props
}) => {
  return (
    <P2Container weight={weight} className={className} {...props}>
      {text}
    </P2Container>
  )
}
P2.propTypes = {
  text: PropTypes.string,
  weight: WEIGHT_PROP_TYPES,
  className: PropTypes.string,
}

export const P3 = ({
  text = '',
  weight = WEIGHT.normal,
  className = '',
  ...props
}) => {
  return (
    <P3Container weight={weight} className={className} {...props}>
      {text}
    </P3Container>
  )
}
P3.propTypes = {
  text: PropTypes.string,
  weight: WEIGHT_PROP_TYPES,
  className: PropTypes.string,
}

export const P4 = ({
  text = '',
  weight = WEIGHT.normal,
  className = '',
  ...props
}) => {
  return (
    <P4Container weight={weight} className={className} {...props}>
      {text}
    </P4Container>
  )
}
P4.propTypes = {
  text: PropTypes.string,
  weight: WEIGHT_PROP_TYPES,
  className: PropTypes.string,
}

export default { P1, P2, P3, P4 }
