import Img from '../../img-with-placeholder'
import Multimedia from '../multimedia'
import NextArrowSvg from '../../../assets/body/slideshow/next-arrow.svg'
import PreArrowSvg from '../../../assets/body/slideshow/pre-arrow.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import memoize from 'memoize-one'
import merge from 'lodash/merge'
import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'

const _ = {
  get,
  map,
  merge,
}

const mockup = {
  mobile: {
    container: {
      width: 375, // px
    },
    slide: {
      width: 340, // px
      height: 212, // px
      paddingRight: 2, // px
    },
    offset: {
      left: 18, // px
    },
  },
  tablet: {
    container: {
      width: 768, // px
    },
    slide: {
      width: 690, // px
      height: 478, // px
      paddingRight: 3, // px
    },
    offset: {
      left: 39, // px
    },
  },
  desktop: {
    container: {
      width: 752, // px
    },
    slide: {
      width: 691, // px
      height: 429, // px
      paddingRight: 4, // px
    },
    offset: {
      left: 33, // px
    },
  },
  hd: {
    container: {
      width: 1033, // px
    },
    slide: {
      width: 938, // px
      height: 585, // px
      paddingRight: 4, // px
    },
    offset: {
      left: 50, // px
    },
  },
}

// Assuming there are three images [ A, B, C ] for slideshow.
// If image B is rendered in the center,
// users can see part of image A(left side) and image C(right side) with masks.
// When users click right button to see image C, which means, C is in the center,
// users still can see part of image B(left side) and image A(right side) with masks.
//
// Hence, there are four images rendered arround B at the beginning.
// The image array should be [ C, A, B, C, A ].
//
// `slidesOffset` indicates how many slides rendered before/after image B, which is, 2 (A and C).
//
const slidesOffset = 2

// duration of transition of transform(translateX(?px))
const duration = 300

// current index to indicate which image should be rendered in the center
const defaultCurIndex = 0

const SlideshowFlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${mq.tabletAndBelow`
    width: 100%;
  `}

  ${mq.desktopOnly`
    width: ${mockup.desktop.container.width}px;
  `}

  ${mq.hdOnly`
    width: ${mockup.hd.container.width}px;
  `}
`

const SlidesSection = styled.div`
  flex-shrink: 0;
  flex-basis: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: ${(mockup.desktop.slide.height /
    mockup.desktop.container.width) *
    100}%;

  ${mq.tabletAndBelow`
    order: 2;
  `}

  ${mq.hdOnly`
    padding-bottom: ${(mockup.hd.slide.height / mockup.hd.container.width) *
      100}%;
  `}
`

const PrevNextSection = styled.div`
  margin-top: 20px;

  ${mq.tabletAndBelow`
    order: 3;
  `}

  ${mq.mobileOnly`
    margin-left: 25px;
  `}

  ${mq.tabletOnly`
    margin-left: 47px;
  `}
`

const PrevButton = styled.div`
  cursor: pointer;
  width: 59px;
  height: 59px;
  display: inline-flex;
  border: solid 1px #d8d8d8;

  > svg {
    margin: auto;
    width: 21px;
  }

  ${mq.hdOnly`
    width: 83px;
    height: 83px;

    > svg {
      width: 31px;
    }
  `}

  &:hover {
    > svg {
      transform: translateX(-5px);
      transition: transform 0.3s ease;
    }
  }
`

const NextButton = styled(PrevButton)`
  border-left: none;

  &:hover {
    > svg {
      transform: translateX(5px);
    }
  }
`

const ImageNumberCircle = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.colors.primary.support};
  border-radius: 50%;
  vertical-align: top;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 62px;
    border-top: solid 1px #fff;
    transform: rotate(-45deg);
    transform-origin: bottom left;
    top: 67px;
    left: 7px;
  }

  ${mq.tabletAndBelow`
    order: 1;

    /* align right */
    margin-left: auto;
    /* 10px is the border-right width of body */
    margin-right: 10px;
  `}

  ${mq.desktopAndAbove`
    margin-top: 6px;

    /* align right */
    margin-left: auto;
  `}

  ${mq.hdOnly`
    margin-right: -18px;
    width: 110px;
    height: 110px;

    &::after {
      width: 89px;
      top: 93px;
      left: 10px;
    }
  `}
`

const ImageNumber = styled.span`
  color: #fff;
  position: absolute;
  top: 25px;
  left: 9px;
  font-size: 24px;
  font-family: BioRhyme;
  font-weight: bold;
  line-height: 0.79;

  ${mq.hdOnly`
    top: 35px;
    left: 10px;
  `}
`

const ImageTotal = styled(ImageNumber)`
  top: 46px;
  left: 36px;

  ${mq.hdOnly`
    top: 71px;
    left: 50px;
  `}
`

const Desc = styled(Multimedia.Caption)`
  align-self: flex-start;
  display: inline-block;

  ${mq.tabletAndBelow`
    order: 4;
    padding-top: 15px;
  `}

  ${mq.mobileOnly`
    width: calc(180/355*100%);
  `}

  ${mq.desktopAndAbove`
    position: relative;
    transform: none;
    padding-top: 30px;
  `}
`

const EmptyDesc = styled(Desc)`
  &::after {
    border-bottom: none;
  }
`

const SlidesFlexBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  ${props => {
    if (props.isSliding) {
      return `transition: transform ${props.duration}ms ease-in-out;`
    }
  }}

  ${mq.mobileOnly`
    transform: translateX(${props =>
      (getTranslateX(mockup.mobile, props.translateXUint) /
        getContainerWidth(mockup.mobile)) *
      100}%);
  `}

  ${mq.tabletOnly`
    transform: translateX(${props =>
      (getTranslateX(mockup.tablet, props.translateXUint) /
        getContainerWidth(mockup.tablet)) *
      100}%);
  `}

  ${mq.desktopOnly`
    transform: translateX(${props =>
      getTranslateX(mockup.desktop, props.translateXUint)}px);
  `}

  ${mq.hdOnly`
    transform: translateX(${props =>
      getTranslateX(mockup.hd, props.translateXUint)}px);
  `}
`

const SlideFlexItem = styled.div`
  height: 100%;
  flex-shrink: 0;

  ${mq.mobileOnly`
    flex-basis: ${(getSlideWidth(mockup.mobile) /
      getContainerWidth(mockup.mobile)) *
      100}%;
    padding-right: ${(mockup.mobile.slide.paddingRight /
      getContainerWidth(mockup.mobile)) *
      100}%;
  `}

  ${mq.tabletOnly`
    flex-basis: ${(getSlideWidth(mockup.tablet) /
      getContainerWidth(mockup.tablet)) *
      100}%;
    padding-right: ${(mockup.tablet.slide.paddingRight /
      getContainerWidth(mockup.tablet)) *
      100}%;
  `}


  ${mq.desktopOnly`
    flex-basis: ${getSlideWidth(mockup.desktop)}px;
    padding-right: ${mockup.desktop.slide.paddingRight}px;
  `}

  ${mq.hdOnly`
    flex-basis: ${getSlideWidth(mockup.hd)}px;
    padding-right: ${mockup.hd.slide.paddingRight}px;
  `}
`

const SlideMask = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  opacity: 0.55;
  background: ${props => props.theme.colors.primary.text};
`

const LeftSlideMask = styled(SlideMask)`
  left: 0;

  ${mq.mobileOnly`
    width: ${(getLeftMaskWidth(mockup.mobile) /
      getContainerWidth(mockup.mobile)) *
      100}%;
  `}

  ${mq.tabletOnly`
    width: ${(getLeftMaskWidth(mockup.tablet) /
      getContainerWidth(mockup.tablet)) *
      100}%;
  `}

  ${mq.desktopOnly`
    width: ${getLeftMaskWidth(mockup.desktop)}px;
  `}

  ${mq.hdOnly`
    width: ${getLeftMaskWidth(mockup.hd)}px;
  `}
`

const RightSlideMask = styled(SlideMask)`
  right: 0;

  ${mq.mobileOnly`
    width: ${(getRightMaskWidth(mockup.mobile) /
      getContainerWidth(mockup.mobile)) *
      100}%;
  `}

  ${mq.tabletOnly`
    width: ${(getRightMaskWidth(mockup.tablet) /
      getContainerWidth(mockup.tablet)) *
      100}%;
  `}

  ${mq.desktopOnly`
    width: ${getRightMaskWidth(mockup.desktop)}px;
  `}

  ${mq.hdOnly`
    width: ${getRightMaskWidth(mockup.hd)}px;
  `}
`

/**
 * @typedef {Object} SlideMockup
 * @property {number} width
 * @property {number} height
 * @property {number} paddingRight
 */

/**
 * @typedef {Object} ContainerMockup
 * @property {number} width
 */

/**
 * @typedef {Object} OffsetMockup
 * @property {number} left
 */

/**
 * @typedef {Object} DeviceMockup
 * @property {SlideMockup} slide
 * @property {ContainerMockup} container
 * @property {OffsetMockup} offset
 */

/**
 * @param {DeviceMockup} deviceMockup
 * @param {number} unit
 * @return {number}
 */
function getTranslateX(deviceMockup, unit) {
  const slideWidth = deviceMockup.slide.width

  // total slides width including padding
  let translateX = unit * slideWidth

  // add left mask width and padding
  translateX = translateX + deviceMockup.offset.left
  return translateX // px
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getContainerWidth(deviceMockup) {
  return deviceMockup.container.width
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getSlideWidth(deviceMockup) {
  return deviceMockup.slide.width
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getLeftMaskWidth(deviceMockup) {
  return deviceMockup.offset.left - deviceMockup.slide.paddingRight // px
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getRightMaskWidth(deviceMockup) {
  return (
    deviceMockup.container.width -
    deviceMockup.offset.left -
    deviceMockup.slide.width
  ) // px
}

const imageProp = PropTypes.shape({
  url: PropTypes.string.isRequired,
})

const contentProp = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.string,
    desktop: imageProp.isRequired,
    mobile: imageProp.isRequired,
    tablet: imageProp.isRequired,
  })
)

export default class Slideshow extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      content: contentProp.isRequired,
    }),
  }

  static defaultProps = {
    className: '',
    data: {
      content: [],
    },
  }

  constructor(props) {
    super(props)
    this.defaultTranslateXUnit = -slidesOffset

    this.state = {
      // value of curSlideIndex would be in [ 0 ~ props.data.content.length ] range,
      // it indicates which image should be placed in the center
      curSlideIndex: defaultCurIndex,
      isSliding: false,
      translateXUint: this.defaultTranslateXUnit,
    }

    this.slideToPrev = this._slideToPrev.bind(this)
    this.slideToNext = this._slideToNext.bind(this)
  }

  _slideToPrev() {
    const total = _.get(this.props, 'data.content.length', 0)
    this.setState(
      {
        isSliding: true,
        translateXUint: this.state.translateXUint + 1,
      },
      () => {
        let curSlideIndex = this.state.curSlideIndex - 1

        if (curSlideIndex < defaultCurIndex) {
          curSlideIndex = total + curSlideIndex
        }

        setTimeout(() => {
          this.setState({
            isSliding: false,
            curSlideIndex: curSlideIndex,
            translateXUint: this.defaultTranslateXUnit,
          })
        }, duration * 2)
      }
    )
  }

  _slideToNext() {
    const total = _.get(this.props, 'data.content.length', 0)
    this.setState(
      {
        isSliding: true,
        translateXUint: this.state.translateXUint - 1,
      },
      () => {
        let curSlideIndex = this.state.curSlideIndex + 1

        if (curSlideIndex >= total) {
          curSlideIndex = curSlideIndex % total
        }

        setTimeout(() => {
          this.setState({
            isSliding: false,
            curSlideIndex: curSlideIndex,
            translateXUint: this.defaultTranslateXUnit,
          })
        }, duration * 2)
      }
    )
  }

  buildImagesForSlicing = memoize(images => {
    // For slicing images array easily later,
    // add last `slidesOffset` elements into top of images array.
    // add first `slidesOffset` elements into bottom of images array.
    // EX:
    // slidesOffset: 2
    // input images: [ a, b, c, d ]
    // output images: [c, d, a, b, c, d, a, b]
    const imagesForSlicing = [].concat(
      images.slice(-slidesOffset),
      images,
      images.slice(defaultCurIndex, slidesOffset)
    )

    // since the items of imagesForSlicing would have the same id,
    // we copy the images and append an index on their ids to avoid duplication.
    return _.map(imagesForSlicing, (img, index) => {
      return _.merge({}, img, {
        id: `${img.id}_${index}`,
      })
    })
  })

  render() {
    const { className } = this.props
    const { curSlideIndex, isSliding, translateXUint } = this.state
    const images = _.get(this.props, 'data.content', [])
    const total = images.length

    const imagesForSlicing = this.buildImagesForSlicing(images)

    const slides = imagesForSlicing.slice(
      curSlideIndex,
      curSlideIndex + slidesOffset * 2 + 1
    )

    const slidesJSX = _.map(slides, (slide = {}) => {
      const objectFit =
        _.get(slide, 'mobile.width', 0) > _.get(slide, 'mobile.height', 0)
          ? 'cover'
          : 'contain'
      return (
        <SlideFlexItem key={`slide_${slide.id}`}>
          <Img
            imageSet={[slide.mobile, slide.tablet, slide.desktop]}
            defaultImage={slide.mobile}
            objectFit={objectFit}
            sizes="(max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px"
          />
        </SlideFlexItem>
      )
    })

    const desc = _.get(images, [curSlideIndex, 'description'])

    return (
      <SlideshowFlexBox className={className}>
        <SlidesSection>
          <SlidesFlexBox
            translateXUint={translateXUint}
            duration={duration}
            isSliding={isSliding}
          >
            {slidesJSX}
          </SlidesFlexBox>
          <LeftSlideMask />
          <RightSlideMask />
        </SlidesSection>
        <PrevNextSection>
          <PrevButton onClick={isSliding ? undefined : this.slideToPrev}>
            <PreArrowSvg />
          </PrevButton>
          <NextButton onClick={isSliding ? undefined : this.slideToNext}>
            <NextArrowSvg />
          </NextButton>
        </PrevNextSection>
        <ImageNumberCircle>
          <ImageNumber>{curSlideIndex + 1}</ImageNumber>
          <ImageTotal>{total}</ImageTotal>
        </ImageNumberCircle>
        {desc ? <Desc>{desc}</Desc> : <EmptyDesc />}
      </SlideshowFlexBox>
    )
  }
}
