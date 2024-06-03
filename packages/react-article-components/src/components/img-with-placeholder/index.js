import React from 'react'
import styled, { ThemeContext } from 'styled-components'
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

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  ${props => props.$heightString}
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
    max-width: 90vw;
    max-height: 90vh;
  }
`

const CrossIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0px;
  /* padding 16px + width: 24px => 40px */
  right: -40px;
  height: 24px;
  width: 24px;
  svg {
    background-color: ${colorGrayscale.white};
  }
`

/**
 * An image element with placeholder.
 * The width and height of the image are required to preserve the space on the page for image.
 *
 * @class Image
 * @extends {React.PureComponent}
 */
export default class Img extends React.PureComponent {
  static contextType = ThemeContext

  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    defaultImage: predefinedPropTypes.imagePropType,
    // If the default image is not provided, this component will take the first item in `imageSet` as the default image.
    // The usage of default image:
    //   1. `img.src = defaultImage.url` for the browser not supporting `srcset`.
    //   2. The height/width ratio of the default image is used for this component. (no matter which candidate is acturally rendered)
    imgPlaceholderSrc: PropTypes.string,
    placeholderNoBlur: PropTypes.bool,
    noImgPlaceholder: PropTypes.bool,
    imgProps: PropTypes.object,
    // The properties of `imgProps` will all be passed to `<img />` element.
    imageSet: PropTypes.arrayOf(predefinedPropTypes.imagePropType),
    objectFit: PropTypes.oneOf([
      objectFitConsts.cover,
      objectFitConsts.contain,
    ]),
    objectPosition: PropTypes.string,
    sizes: PropTypes.string.isRequired,
    clickable: PropTypes.bool,
  }

  static defaultProps = {
    alt: '',
    className: '',
    defaultImage: {},
    imageSet: [],
    imgPlaceholderSrc: '',
    imgProps: {},
    placeholderNoBlur: false,
    noImgPlaceholder: false,
    sizes: '',
    clickable: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      toShowPlaceholder: true,
      showFullScreenImg: false,
      isMobile: false,
    }
    this._img = React.createRef()
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.handleWindowResize = _.debounce(this._handleWindowResize, 500).bind(
      this
    )
    this._isMounted = false
    this._supportObjectFit = true
  }

  componentDidMount() {
    // Check if browser support css object-fit.
    // Ref: https://github.com/anselmh/object-fit/blob/c6e275b099caf59ca44bfc5cbbaf4c388ace9980/src/polyfill.object-fit.core.js#L396
    this._supportObjectFit =
      'objectFit' in document.documentElement.style === true
    this._isMounted = true
    // If the browser has cached the image already, the `load` event of `<img>` will never be triggered.
    // Hence, we need to trigger `handleImageLoaded` manually.
    if (_.get(this._img.current, 'complete')) {
      this.handleImageLoaded()
    }
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  }

  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('resize', this.handleWindowResize)
  }

  _handleWindowResize = () => {
    const windowWidth = window.innerWidth

    this.setState({
      isMobile: windowWidth < DEFAULT_SCREEN.tablet,
    })
  }

  handleImageLoaded() {
    // Progressive image
    // Let user see the blur image,
    // and slowly make the blur image clearer

    // in order to make sure users see the blur image,
    // delay the clear image rendering
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          isLoaded: true,
        })
      }
    }, 500)

    // after clear image rendered, not display placeholder anymore
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          toShowPlaceholder: false,
        })
      }
    }, 1500)
  }

  _renderImagePlaceholder() {
    const { toShowPlaceholder } = this.state
    const {
      imgPlaceholderSrc,
      placeholderNoBlur,
      noImgPlaceholder,
    } = this.props
    if (noImgPlaceholder) {
      return null
    }
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

  render() {
    const { isLoaded, showFullScreenImg, isMobile } = this.state
    const {
      alt,
      className,
      imgProps,
      imageSet,
      defaultImage,
      objectFit,
      objectPosition,
      sizes,
      clickable,
    } = this.props

    const releaseBranch =
      this?.context?.releaseBranch || releaseBranchConsts.release

    const openFullScreen = () => {
      if (isMobile) return
      this.setState({ showFullScreenImg: true })
      document.body.classList.add('disable-scroll')
    }
    const closeFullScreen = () => {
      this.setState({ showFullScreenImg: false })
      document.body.classList.remove('disable-scroll')
    }

    const appendedClassName = className + ' avoid-break'
    const defaultImageOriginalUrl = _.get(defaultImage, 'url')
    /* Render placeholder only if no valid image is given */
    if (!defaultImageOriginalUrl && (!imageSet || imageSet.length === 0)) {
      return (
        <ImgContainer
          className={appendedClassName}
          $heightString="height: 100%;"
        >
          {this._renderImagePlaceholder()}
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
        >
          {this._renderImagePlaceholder()}
          <ImgBox $toShow={isLoaded}>
            {isObjectFit ? (
              <React.Fragment>
                <ImgWithObjectFit
                  alt={alt}
                  $objectFit={objectFit}
                  $objectPosition={objectPosition}
                  onLoad={this.handleImageLoaded}
                  ref={this._img}
                  sizes={this._supportObjectFit ? sizes : ''}
                  src={defaultImageSrc}
                  srcSet={this._supportObjectFit ? srcset : ''}
                  hide={!this._supportObjectFit}
                  {...imgProps}
                />
                {this._supportObjectFit ? null : (
                  <FallbackObjectFitImg
                    $url={_.get(defaultImage, 'url')}
                    $objectFit={objectFit}
                    $objectPosition={objectPosition}
                  />
                )}
              </React.Fragment>
            ) : (
              <img
                alt={alt}
                onLoad={this.handleImageLoaded}
                ref={this._img}
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
                  ref={this._img}
                  sizes={sizes}
                  src={defaultImageSrc}
                  srcSet={srcset}
                />
                <CrossIcon>
                  <Cross releaseBranch={releaseBranch} />
                </CrossIcon>
              </FullScreenImage>
            </FullScreenImageMask>
          </DesktopAndAbove>
        )}
      </>
    )
  }
}
