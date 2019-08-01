import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import Img from '../img-with-placeholder'
import React from 'react'
import get from 'lodash/get'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '../../constants/prop-types/leading'
import styled from 'styled-components'

const _ = {
  get,
}

const FullScreenBlock = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`

const TextBlock = styled.div`
  z-index: 100;
  position: absolute;
  left: 65px;
  ${mq.hdOnly`
    bottom: 100px;
    width: 45%;
  `}
  ${mq.desktopOnly`
    bottom: 85px;
    width: 55%;
  `}
  ${mq.tabletOnly`
    left: 35px;
    bottom: 37px;
    width: 70%;
  `}
  ${mq.mobileOnly`
    width: 60%;
    bottom: 60px;
    left: 30px;
  `}

  > div:first-child {
    margin-bottom: 25px;
  }
  > div:last-child {
    margin-top: 20px;
  }
`

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  line-height: 1.4;
  color: #fff;
  font-size: 50px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  ${mq.mobileOnly`
    font-size: 32px;
  `}
`

const Subtitle = styled.div`
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 40px;
  font-weight: 100;
  ${mq.tabletAndAbove`
    font-size: 40px;
  `}
  ${mq.mobileOnly`
    font-size: 26px;
  `}
`

const Topic = styled.div`
  display: inline-block;
  padding: 5px;
  background-color: rgba(166, 122, 68, 0.55);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

const RightArrow = styled.div`
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-45deg);
  margin: 0 10px 1px 3px;
`

const FigureBlock = styled.figure`
  /* reset margin of figure */
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  > .leading-image {
    position: absolute;
  }
`
const FigureOverlayMask = styled.div`
  position: absolute;
  height: 50%;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);
`

const DisplayOnPortrait = styled.div`
  display: none;

  @media (orientation: portrait) {
    display: block;
  }
`

const DisplayOnLandscape = styled.div`
  display: none;

  @media (orientation: landscape) {
    display: block;
  }
`

export default class FullScreenLeading extends React.PureComponent {
  static propTypes = predefinedPropTypes.fullscreen

  static defaultProps = {
    poster: {},
    portraitPoster: {},
    subtitle: '',
    topicHref: '',
    topicName: '',
  }

  isEmptyPortraitPoster(portraitPoster) {
    const tinyURL = _.get(portraitPoster, 'tiny.url')
    const mobileURL = _.get(portraitPoster, 'mobile.url')
    return !tinyURL || !mobileURL
  }

  render() {
    const {
      portraitPoster,
      poster,
      subtitle,
      title,
      topicHref,
      topicName,
    } = this.props

    let portraitPosterJSX = null

    const posterJSX = (
      <FigureBlock>
        <Img
          className="leading-image"
          imgPlaceholderSrc={_.get(poster, 'tiny.url', '')}
          imageSet={[poster.mobile, poster.tablet, poster.desktop]}
          defaultImage={poster.mobile}
          objectFit="cover"
          objectPostion="center center"
          sizes="(max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px"
        />
      </FigureBlock>
    )

    if (!this.isEmptyPortraitPoster(portraitPoster)) {
      portraitPosterJSX = (
        <DisplayOnPortrait>
          <FigureBlock>
            <Img
              className="leading-image"
              imgPlaceholderSrc={_.get(portraitPoster, 'tiny.url', '')}
              imageSet={[portraitPoster.mobile]}
              defaultImage={portraitPoster.mobile}
              objectFit="cover"
              objectPostion="center center"
            />
          </FigureBlock>
        </DisplayOnPortrait>
      )
    }

    return (
      <FullScreenBlock>
        {portraitPosterJSX ? (
          <React.Fragment>
            {portraitPosterJSX}
            <DisplayOnLandscape>{posterJSX}</DisplayOnLandscape>
          </React.Fragment>
        ) : (
          posterJSX
        )}
        <FigureOverlayMask />
        <TextBlock>
          {topicName ? (
            <DynamicComponentsContext.Consumer>
              {components => {
                return (
                  <components.Link to={topicHref}>
                    <Topic>
                      {topicName}
                      <RightArrow />
                    </Topic>
                  </components.Link>
                )
              }}
            </DynamicComponentsContext.Consumer>
          ) : null}
          <Title>{title}</Title>
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        </TextBlock>
      </FullScreenBlock>
    )
  }
}
