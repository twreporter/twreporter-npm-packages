import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq from '@twreporter/core/lib/utils/media-query'
import Multimedia from './multimedia'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slider, { Rail, Progress, Indicator } from './slider'
import styled, { css } from 'styled-components'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const Container = Multimedia.Block

const unicodeToString = unicode => String.fromCharCode(parseInt(unicode, 16))

const getResponsiveBackground = imageSetPropKey => css`
  ${mq.desktopAndAbove`
    background-image: url(${props =>
      replaceGCSUrlOrigin(_.get(props, [imageSetPropKey, 'desktop', 'url']))});
  `}
  ${mq.tabletOnly`
    background-image: url(${props =>
      replaceGCSUrlOrigin(_.get(props, [imageSetPropKey, 'tablet', 'url']))});
  `}
  ${mq.mobileOnly`
    background-image: url(${props =>
      replaceGCSUrlOrigin(_.get(props, [imageSetPropKey, 'mobile', 'url']))});
  `}
`

const sharedStyleOfIndicatorPointer = css`
  padding-top: 4px;
  text-align: center;
  font-size: 12px;
  font-family: arial, sans-serif;
  display: block;
  position: absolute;
  top: 0;
  width: 24px;
  height: 24px;
  background: #fff;
  color: ${props => props.theme.colors.primary.support};
`

const Image = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-bottom: ${props => `${100 * props.heightWidthRatio}%`};
  >div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  ${Progress}, ${Rail} {
    background-repeat: no-repeat;
    background-size: auto 100%; /* height 100% of container and keep aspect ratio */
    background-position: left center;
  }
  ${Progress} {
    ${getResponsiveBackground('firstImageSet')}
  }
  ${Rail} {
    ${getResponsiveBackground('secondImageSet')}
  }
  ${Indicator} {
    width: 3px;
    background: #fff;
    &::after {
      content: "${unicodeToString(
        '25C4'
      )}"; /* BLACK LEFT-POINTING POINTER (present in WGL4) */
      ${sharedStyleOfIndicatorPointer}
      left: 0;
      transform: translateX(-100%);
      border-radius: 0 0 0 100%;
      text-align: right;
      padding-right: 3px;
    }
    &::before {
      content: "${unicodeToString(
        '25BA'
      )}"; /* BLACK RIGHT-POINTING POINTER (present in WGL4) */
      ${sharedStyleOfIndicatorPointer}
      right: 0;
      transform: translateX(100%);
      border-radius: 0 0 100% 0;
      text-align: left;
      padding-left: 3px;
    }
  }
`

export default class ImageDiff extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      content: PropTypes.array.isRequired,
    }),
  }
  static defaultProps = {
    data: {
      content: [],
    },
  }

  render() {
    const { data } = this.props
    const { content } = data
    const [firstImageSet, secondImageSet] = content
    const minHeight = Math.min(
      firstImageSet.desktop.height,
      secondImageSet.desktop.height
    )
    const minWidth = Math.min(
      firstImageSet.desktop.width,
      secondImageSet.desktop.width
    )
    /* the redered size will be the intersection of two images */
    const renderedHeightWidthRation = minHeight / minWidth
    /* Use description of image as caption */
    const caption = _.get(
      firstImageSet,
      'description',
      _.get(secondImageSet, 'description')
    )
    return (
      <Container>
        <Image
          heightWidthRatio={renderedHeightWidthRation}
          firstImageSet={firstImageSet}
          secondImageSet={secondImageSet}
        >
          <div>
            <Slider defaultValue={50} min={1} max={100} />
          </div>
        </Image>
        {caption ? <Multimedia.Caption>{caption}</Multimedia.Caption> : null}
      </Container>
    )
  }
}
