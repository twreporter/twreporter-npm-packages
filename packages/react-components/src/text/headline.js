import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'

const titleDefaultFont = css`
  font-weight: ${fontWeight.bold};
`

const H1Container = styled.div`
  ${titleDefaultFont}
  line-height: 125%;
  font-size: 36px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 32px;
  `}
`

const H2Container = styled.div`
  ${titleDefaultFont}
  line-height: 125%;
  font-size: 32px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 24px;
  `}
`

const H3Container = styled.div`
  ${titleDefaultFont}
  line-height: 150%;
  font-size: 28px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 20px;
  `}
`

const H4Container = styled.div`
  ${titleDefaultFont}
  line-height: 150%;
  font-size: 22px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 18px;
  `}
`

const H5Container = styled.div`
  ${titleDefaultFont}
  line-height: 150%;
  font-size: 18px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 16px;
  `}
`

const H6Container = styled.div`
  ${titleDefaultFont}
  line-height: 150%;
  font-size: 16px;
  font-family: ${props =>
    props.type === 'default' ? fontFamily.default : fontFamily.title};
  ${mq.tabletAndBelow`
    font-size: 14px;
  `}
`

export const H1 = ({ text = '', type = 'default' }) => {
  return <H1Container type={type}>{text}</H1Container>
}
H1.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
}

export const H2 = ({ text = '', type = 'default' }) => {
  return <H2Container type={type}>{text}</H2Container>
}
H2.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
}

export const H3 = ({ text = '', type = 'default' }) => {
  return <H3Container type={type}>{text}</H3Container>
}
H3.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
}

export const H4 = ({ text = '', type = 'default' }) => {
  return <H4Container type={type}>{text}</H4Container>
}
H4.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
}

export const H5 = ({ text = '', type = 'default' }) => {
  return <H5Container type={type}>{text}</H5Container>
}
H5.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
}

export const H6 = ({ text = '', type = 'default' }) => {
  return <H6Container type={type}>{text}</H6Container>
}
H6.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'article']),
}

export default {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}
