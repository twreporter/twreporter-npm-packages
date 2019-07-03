import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

const Img = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${props => {
    return `url(${_.get(props, 'url')})`
  }};
  background-position: center center;
`

const ImgPlaceholder = ({ src, alt }) => {
  return <Img url={src} alt={alt} />
}

ImgPlaceholder.defaultProps = {
  src: '',
  alt: '',
}

ImgPlaceholder.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default ImgPlaceholder
