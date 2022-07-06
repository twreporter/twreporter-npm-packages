import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'

const DefaultContainer = styled.div`
  font-weight: ${fontWeight.bold};
`

const H1Container = styled(DefaultContainer)`
  line-height: 125%;
  font-size: 36px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 32px;
  `}
`

const H2Container = styled(DefaultContainer)`
  line-height: 125%;
  font-size: 32px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 24px;
  `}
`

const H3Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 28px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 20px;
  `}
`

const H4Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 22px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 18px;
  `}
`

const H5Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 18px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 16px;
  `}
`

const H6Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 16px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 14px;
  `}
`

export const H1 = ({ text = '', type = 'default', className = '' }) => {
  return (
    <H1Container type={type} className={className}>
      {text}
    </H1Container>
  )
}
H1.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
  className: PropTypes.string,
}

export const H2 = ({ text = '', type = 'default', className = '' }) => {
  return (
    <H2Container type={type} className={className}>
      {text}
    </H2Container>
  )
}
H2.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
  className: PropTypes.string,
}

export const H3 = ({ text = '', type = 'default', className = '' }) => {
  return (
    <H3Container type={type} className={className}>
      {text}
    </H3Container>
  )
}
H3.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
  className: PropTypes.string,
}

export const H4 = ({ text = '', type = 'default', className = '' }) => {
  return (
    <H4Container type={type} className={className}>
      {text}
    </H4Container>
  )
}
H4.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
  className: PropTypes.string,
}

export const H5 = ({ text = '', type = 'default', className = '' }) => {
  return (
    <H5Container type={type} className={className}>
      {text}
    </H5Container>
  )
}
H5.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
  className: PropTypes.string,
}

export const H6 = ({ text = '', type = 'default', className = '' }) => {
  return (
    <H6Container type={type} className={className}>
      {text}
    </H6Container>
  )
}
H6.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
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
