import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  TYPE,
  TYPE_PROP_TYPES,
  TYPE_FONT_FAMILY,
} from './constants/headline-type'
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight } from '@twreporter/core/lib/constants/font'

const DefaultContainer = styled.div`
  font-weight: ${fontWeight.bold};
`

const H1Container = styled(DefaultContainer)`
  line-height: 125%;
  font-size: 36px;
  font-family: ${props => props.fontFamily};
  ${mq.tabletAndBelow`
    font-size: 32px;
  `}
`

const H2Container = styled(DefaultContainer)`
  line-height: 125%;
  font-size: 32px;
  font-family: ${props => props.fontFamily};
  ${mq.tabletAndBelow`
    font-size: 24px;
  `}
`

const H3Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 28px;
  font-family: ${props => props.fontFamily};
  ${mq.tabletAndBelow`
    font-size: 20px;
  `}
`

const H4Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 22px;
  font-family: ${props => props.fontFamily};
  ${mq.tabletAndBelow`
    font-size: 18px;
  `}
`

const H5Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 18px;
  font-family: ${props => props.fontFamily};
  ${mq.tabletAndBelow`
    font-size: 16px;
  `}
`

const H6Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 16px;
  font-family: ${props => props.fontFamily};
  ${mq.tabletAndBelow`
    font-size: 14px;
  `}
`

export const H1 = ({ text = '', type = TYPE.default, className = '' }) => {
  const fontFamily = TYPE_FONT_FAMILY[type]
  return (
    <H1Container fontFamily={fontFamily} className={className}>
      {text}
    </H1Container>
  )
}
H1.propTypes = {
  text: PropTypes.string,
  type: TYPE_PROP_TYPES,
  className: PropTypes.string,
}

export const H2 = ({ text = '', type = TYPE.default, className = '' }) => {
  const fontFamily = TYPE_FONT_FAMILY[type]
  return (
    <H2Container fontFamily={fontFamily} className={className}>
      {text}
    </H2Container>
  )
}
H2.propTypes = {
  text: PropTypes.string,
  type: TYPE_PROP_TYPES,
  className: PropTypes.string,
}

export const H3 = ({ text = '', type = TYPE.default, className = '' }) => {
  const fontFamily = TYPE_FONT_FAMILY[type]
  return (
    <H3Container fontFamily={fontFamily} className={className}>
      {text}
    </H3Container>
  )
}
H3.propTypes = {
  text: PropTypes.string,
  type: TYPE_PROP_TYPES,
  className: PropTypes.string,
}

export const H4 = ({ text = '', type = TYPE.default, className = '' }) => {
  const fontFamily = TYPE_FONT_FAMILY[type]
  return (
    <H4Container fontFamily={fontFamily} className={className}>
      {text}
    </H4Container>
  )
}
H4.propTypes = {
  text: PropTypes.string,
  type: TYPE_PROP_TYPES,
  className: PropTypes.string,
}

export const H5 = ({ text = '', type = TYPE.default, className = '' }) => {
  const fontFamily = TYPE_FONT_FAMILY[type]
  return (
    <H5Container fontFamily={fontFamily} className={className}>
      {text}
    </H5Container>
  )
}
H5.propTypes = {
  text: PropTypes.string,
  type: TYPE_PROP_TYPES,
  className: PropTypes.string,
}

export const H6 = ({ text = '', type = TYPE.default, className = '' }) => {
  const fontFamily = TYPE_FONT_FAMILY[type]
  return (
    <H6Container fontFamily={fontFamily} className={className}>
      {text}
    </H6Container>
  )
}
H6.propTypes = {
  text: PropTypes.string,
  type: TYPE_PROP_TYPES,
  className: PropTypes.string,
}

export default {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}
