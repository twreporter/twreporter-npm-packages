import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { LogoFallback } from './logo'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'

// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const ImgObjectFit = styled(ImgContainer)`
  opacity: ${props => props.opacity};
  transition: opacity 1s ease;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImgFallback = styled(ImgContainer)`
  background-size: cover;
  background-image: ${props => {
    return `url(${replaceGCSUrlOrigin(_.get(props, 'url'))})`
  }};
  background-position: center center;
`

// Vertically and horizontally centering
const LogoCenteringBlock = styled(ImgContainer)`
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: ${props => props.display};
`

class Image extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isObjectFit: true,
      isImgOnLoad: false,
    }

    this.handleImgOnLoad = this._handleImgOnLoad.bind(this)
    this.imgNode = null
  }

  componentDidMount() {
    this.setState({
      isObjectFit: 'objectFit' in _.get(document, 'documentElement.style'),
    })
    // Check if img is already loaded, and cached on the browser.
    // If cached, React.img won't trigger onLoad event.
    // Hence, we need to trigger re-rendering.
    if (this.imgNode) {
      this.setState({
        isImgOnLoad: this.imgNode.complete,
      })
    }
  }

  componentWillUnMount() {
    this.imgNode = null
  }

  _handleImgOnLoad() {
    this.setState({
      isImgOnLoad: true,
    })
  }

  render() {
    const { src, alt, srcSet } = this.props
    const { isObjectFit, isImgOnLoad } = this.state
    let logoDisplay = 'flex'
    if (!isObjectFit) {
      logoDisplay = 'none'
    } else if (isImgOnLoad) {
      logoDisplay = 'none'
    }

    const ImgJSX = isObjectFit ? (
      <ImgObjectFit opacity={isImgOnLoad ? 1 : 0}>
        <img
          ref={node => {
            this.imgNode = node
          }}
          alt={alt}
          src={replaceGCSUrlOrigin(src)}
          srcSet={srcSet}
          onLoad={this.handleImgOnLoad}
        />
      </ImgObjectFit>
    ) : (
      <ImgFallback url={replaceGCSUrlOrigin(src)} />
    )

    return (
      <ImgContainer>
        <LogoCenteringBlock display={logoDisplay}>
          <LogoFallback />
        </LogoCenteringBlock>
        {ImgJSX}
      </ImgContainer>
    )
  }
}

Image.defaultProps = {
  alt: '',
  src: '',
  srcSet: '',
}

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
}

export default Image
