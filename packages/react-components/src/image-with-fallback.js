import React, { useState, useEffect, useRef } from 'react'
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

const LogoCenteringBlock = styled(ImgContainer)`
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: ${props => props.display};
  > img {
    width: 65%;
    height: 65%;
  }
`

const Image = ({ src, alt = '', srcSet = '' }) => {
  const [isObjectFit, setIsObjectFit] = useState(false)
  const [isImgOnLoad, setIsImgOnLoad] = useState(false)
  const imgNode = useRef(null)

  useEffect(() => {
    setIsObjectFit('objectFit' in _.get(document, 'documentElement.style'))
  }, [])

  // Check if img is already loaded, and cached on the browser.
  // If cached, React.img won't trigger onLoad event.
  // Hence, we need to trigger re-rendering.
  useEffect(() => {
    if (!imgNode.current) {
      return
    }
    setIsImgOnLoad(imgNode.current.complete)
  }, [imgNode])

  const handleImgOnLoad = () => {
    setIsImgOnLoad(true)
  }

  let logoDisplay = 'flex'
  if (!isObjectFit) {
    logoDisplay = 'none'
  } else if (isImgOnLoad) {
    logoDisplay = 'none'
  }

  const ImgJSX = isObjectFit ? (
    <ImgObjectFit opacity={isImgOnLoad ? 1 : 0}>
      <img
        ref={imgNode}
        alt={alt}
        src={replaceGCSUrlOrigin(src)}
        srcSet={srcSet}
        onLoad={handleImgOnLoad}
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

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
}

export default Image
