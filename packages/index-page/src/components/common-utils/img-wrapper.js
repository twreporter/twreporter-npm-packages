/* eslint camelcase: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import { replaceStorageUrlPrefix } from '../../utils/url-processor'

const _ = {
  get,
}

const ImgObjectFit = styled.div`
  width: 100%;
  height: 100%;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImgFallback = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${props => {
    return `url(${_.get(props, 'url')})`
  }};
  background-position: center center;
`

/**
 * @description Pick hero-image between 800px or 400px depends on the resolution.
 * @param {object} sources Get srcSet from hero_images of post
 * @return {string} Return the srcSet which will be srcSet of img element
 * * */
const srcSetDependOnResolutions = sources => {
  const mobileInherentWidth = '800w'
  const w400InherentWidth = '400w'
  const mobile_url = _.get(sources, 'mobile.url', '')
  const w400_url = _.get(sources, 'w400.url', '')
  if (!w400_url) {
    return `${replaceStorageUrlPrefix(mobile_url)} ${mobileInherentWidth}`
  }
  return `${replaceStorageUrlPrefix(
    mobile_url
  )} ${mobileInherentWidth}, ${replaceStorageUrlPrefix(
    w400_url
  )} ${w400InherentWidth}`
}

class ImgWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isObjectFit: true,
    }
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        isObjectFit: 'objectFit' in _.get(document, 'documentElement.style'),
      })
    }
  }

  render() {
    const { src, alt, srcSet, sizes } = this.props
    const isObjectFit = this.state.isObjectFit
    return isObjectFit ? (
      <ImgObjectFit>
        <img
          alt={alt}
          src={replaceStorageUrlPrefix(src)}
          srcSet={srcSetDependOnResolutions(srcSet)}
          sizes={sizes}
          style={{
            transform: 'translateZ(0)',
          }}
        />
        {this.props.children}
      </ImgObjectFit>
    ) : (
      <ImgFallback url={replaceStorageUrlPrefix(src)}>
        {this.props.children}
      </ImgFallback>
    )
  }
}

ImgWrapper.defaultProps = {
  alt: '',
  children: null,
  src: '',
  srcSet: {},
  sizes: '',
}

ImgWrapper.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.element,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.object,
  sizes: PropTypes.string,
}

export default ImgWrapper
