import React, { useState, useEffect, useRef, useContext } from 'react'
import styled, { ThemeContext, css } from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import { DesktopAndAbove } from '@twreporter/react-components/lib/rwd'
import { Cross } from '@twreporter/react-components/lib/icon'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import zIndex from '@twreporter/core/lib/constants/z-index'
import { DEFAULT_SCREEN } from '@twreporter/core/lib/utils/media-query'

import { getSrcsetString } from '../../utils/image'
import PlaceholderIcon from '../../assets/img-with-placeholder/img-loading-placeholder.svg'
import predefinedPropTypes from '../../constants/prop-types/img-with-placeholder'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import debounce from 'lodash/debounce'

const _ = {
  get,
  map,
  debounce,
}

const objectFitConsts = {
  contain: 'contain',
  cover: 'cover',
}

const CrossIconPos = Object.freeze({
  INSIDE: 'inside',
  TOP_RIGHT: 'top-right',
  RIGHT_TOP: 'right-top',
})

// padding: 16px + width: 24px => 40px
const iconPadding = 40

const CrossIconPosCss = position => {
  switch (position) {
    case CrossIconPos.TOP_RIGHT:
      return css`
        top: -${iconPadding}px;
        right: 0px;
      `
    case CrossIconPos.RIGHT_TOP:
      return css`
        top: 0px;
        right: -${iconPadding}px;
      `
    case CrossIconPos.INSIDE:
    default:
      return css`
        top: 0px;
        right: 0px;
      `
  }
}

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  ${props => props.$heightString}
  ${props => (props.$clickable ? 'cursor: zoom-in;' : '')}
`

const ImgPlaceholder = styled.div`
  display: ${props => (props.$toShow ? 'block' : 'none')};
  ${props => (props.$noBlur ? '' : 'filter: blur(5px)')};
  background-image: url(${props => props.$src});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => (props.$toShow ? 'block' : 'none')};
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const ImgWithObjectFit = styled.img`
  display: block;
  height: 100%;
  object-fit: ${props => props.$objectFit || 'none'};
  object-position: ${props => props.$objectPosition || '50% 50%'};
  opacity: ${props => (props.toShowFallback ? '0' : '1')};
`

const FallbackObjectFitImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: ${props => props.$objectFit};
  background-repeat: no-repeat;
  background-position: ${props => props.$objectPosition || '50% 50%'};
  background-image: url(${props => props.$url});
`

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.$toShow ? '1' : '0')};
  transition: opacity 0.5s;
  & > img {
    width: 100%;
  }
`

const FullScreenImageMask = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${colorOpacity['black_0.5']};
  z-index: ${zIndex.articleImgFullScreenMask};
  display: flex;
  justify-content: center;
  align-items: center;
`

const FullScreenImage = styled.div`
  position: relative;
  img {
    max-width: 100vw;
    max-height: 100vh;
  }
`

const CrossIcon = styled.div`
  cursor: pointer;
  position: absolute;
  ${props => CrossIconPosCss(props.$crossIconPos)}
  height: 24px;
  width: 24px;
  svg {
    background-color: ${colorGrayscale.white};
  }
`

/**
 * An image element with placeholder.
 * The width and height of the image are required to preserve the space on the page for image.
 */
const Img = ({
  alt = '',
  className = '',
  // If the default image is not provided, this component will take the first item in `imageSet` as the default image.
  // The usage of default image:
  //   1. `img.src = defaultImage.url` for the browser not supporting `srcset`.
  //   2. The height/width ratio of the default image is used for this component. (no matter which candidate is acturally rendered)
  defaultImage = {},
  imgPlaceholderSrc = '',
  placeholderNoBlur = false,
  noImgPlaceholder = false,
  // The properties of `imgProps` will all be passed to `<img />` element.
  imgProps = {},
  imageSet = [],
  objectFit,
  objectPosition,
  sizes = '',
  clickable = false,
}) => {
  const themeContext = useContext(ThemeContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [toShowPlaceholder, setToShowPlaceholder] = useState(true)
  const [showFullScreenImg, setShowFullScreenImg] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const imgRef = useRef(null)
  const _isMounted = useRef(true)
  const [supportObjectFit, setSupportObjectFit] = useState(true)

  const fullScreenImageRef = useRef(null)
  const [crossIconPos, setCrossIconPos] = useState(CrossIconPos.INSIDE)

  const handleImageLoaded = () => {
    // Progressive image
    // Let user see the blur image,
    // and slowly make the blur image clearer

    // in order to make sure users see the blur image,
    // delay the clear image rendering
    setTimeout(() => {
      if (_isMounted.current) {
        setIsLoaded(true)
      }
    }, 500)
    // after clear image rendered, not display placeholder anymore
    setTimeout(() => {
      if (_isMounted.current) {
        setToShowPlaceholder(false)
      }
    }, 1500)
  }

  const checkFullScreenImageSize = () => {
    if (fullScreenImageRef.current) {
      const img = fullScreenImageRef.current
      const imgWidth = img.offsetWidth
      const imgHeight = img.offsetHeight
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (imgWidth === vw) {
        if (vh - imgHeight < iconPadding * 2) {
          setCrossIconPos(CrossIconPos.INSIDE)
        } else {
          setCrossIconPos(CrossIconPos.TOP_RIGHT)
        }
      } else if (imgHeight === vh) {
        if (vw - imgWidth < iconPadding * 2) {
          setCrossIconPos(CrossIconPos.INSIDE)
        } else {
          setCrossIconPos(CrossIconPos.RIGHT_TOP)
        }
      } else {
        // default
        setCrossIconPos(CrossIconPos.INSIDE)
      }
    }
  }

  const handleESCClick = _.debounce(e => {
    if (showFullScreenImg) {
      if (e.key === 'Escape') {
        closeFullScreen()
      }
    }
  }, 500)

  const handleWindowResize = _.debounce(() => {
    const windowWidth = window.innerWidth
    if (windowWidth <= DEFAULT_SCREEN.tablet.minWidth) {
      setIsMobile(true)
      closeFullScreen()
    } else {
      setIsMobile(false)
    }
    checkFullScreenImageSize()
  }, 100)

  useEffect(() => {
    // Check if browser support css object-fit.
    // Ref: https://github.com/anselmh/object-fit/blob/c6e275b099caf59ca44bfc5cbbaf4c388ace9980/src/polyfill.object-fit.core.js#L396
    setSupportObjectFit('objectFit' in document.documentElement.style)
    _isMounted.current = true
    // If the browser has cached the image already, the `load` event of `<img>` will never be triggered.
    // Hence, we need to trigger `handleImageLoaded` manually.
    if (_.get(imgRef.current, 'complete')) {
      handleImageLoaded()
    }
    window.addEventListener('resize', handleWindowResize)
    handleWindowResize()
    window.addEventListener('keydown', handleESCClick)
    return () => {
      _isMounted.current = false
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('keydown', handleESCClick)
    }
  }, [])

  useEffect(() => {
    checkFullScreenImageSize()
  }, [showFullScreenImg])

  const openFullScreen = () => {
    if (isMobile) return
    setShowFullScreenImg(true)
    document.body.classList.add('disable-scroll')
  }

  const closeFullScreen = () => {
    setShowFullScreenImg(false)
    document.body.classList.remove('disable-scroll')
  }

  const renderImagePlaceholder = () => {
    if (noImgPlaceholder) return null
    if (imgPlaceholderSrc) {
      return (
        <ImgPlaceholder
          $src={replaceGCSUrlOrigin(imgPlaceholderSrc)}
          $toShow={toShowPlaceholder}
          $noBlur={placeholderNoBlur}
        />
      )
    }
    // render default placeholder
    return (
      <Placeholder $toShow={toShowPlaceholder}>
        <PlaceholderIcon />
      </Placeholder>
    )
  }

  const releaseBranch =
    themeContext?.releaseBranch || releaseBranchConsts.release
  const appendedClassName = className + ' avoid-break'
  const defaultImageOriginalUrl = _.get(defaultImage, 'url')

  if (!defaultImageOriginalUrl && (!imageSet || imageSet.length === 0)) {
    return (
      <ImgContainer className={appendedClassName} $heightString="height: 100%;">
        {renderImagePlaceholder()}
      </ImgContainer>
    )
  }

  const srcset = getSrcsetString(imageSet)
  const isObjectFit = Boolean(objectFit)
  const heightWidthRatio =
    _.get(defaultImage, 'height') / _.get(defaultImage, 'width')
  if (isObjectFit && !heightWidthRatio) {
    console.warn(
      'Warning on Img component:',
      'The `objecFit` is set, but no valid height/width ratio of `props.defaultImage` is given.',
      '`props.defaultImage`:',
      defaultImage
    )
  }
  const defaultImageSrc = replaceGCSUrlOrigin(_.get(defaultImage, 'url'))

  return (
    <>
      <ImgContainer
        className={appendedClassName}
        $heightString={
          isObjectFit
            ? `height: 100%;`
            : `padding-top: ${heightWidthRatio * 100}%;`
        }
        onClick={clickable ? openFullScreen : undefined}
        $clickable={clickable}
      >
        {renderImagePlaceholder()}
        <ImgBox $toShow={isLoaded}>
          {isObjectFit ? (
            <>
              <ImgWithObjectFit
                alt={alt}
                $objectFit={objectFit}
                $objectPosition={objectPosition}
                onLoad={handleImageLoaded}
                ref={imgRef}
                sizes={supportObjectFit ? sizes : ''}
                src={defaultImageSrc}
                srcSet={supportObjectFit ? srcset : ''}
                hide={!supportObjectFit}
                {...imgProps}
              />
              {supportObjectFit ? null : (
                <FallbackObjectFitImg
                  $url={_.get(defaultImage, 'url')}
                  $objectFit={objectFit}
                  $objectPosition={objectPosition}
                />
              )}
            </>
          ) : (
            <img
              alt={alt}
              onLoad={handleImageLoaded}
              ref={imgRef}
              sizes={sizes}
              src={defaultImageSrc}
              srcSet={srcset}
              {...imgProps}
            />
          )}
        </ImgBox>
      </ImgContainer>
      {showFullScreenImg && (
        <DesktopAndAbove>
          <FullScreenImageMask onClick={closeFullScreen}>
            <FullScreenImage>
              <img
                alt={alt}
                ref={fullScreenImageRef}
                sizes={sizes}
                src={defaultImageSrc}
                srcSet={srcset}
              />
              <CrossIcon $crossIconPos={crossIconPos}>
                <Cross releaseBranch={releaseBranch} />
              </CrossIcon>
            </FullScreenImage>
          </FullScreenImageMask>
        </DesktopAndAbove>
      )}
    </>
  )
}

Img.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  defaultImage: predefinedPropTypes.imagePropType,
  imgPlaceholderSrc: PropTypes.string,
  placeholderNoBlur: PropTypes.bool,
  noImgPlaceholder: PropTypes.bool,
  imgProps: PropTypes.object,
  imageSet: PropTypes.arrayOf(predefinedPropTypes.imagePropType),
  objectFit: PropTypes.oneOf([objectFitConsts.cover, objectFitConsts.contain]),
  objectPosition: PropTypes.string,
  sizes: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
}

export default Img
