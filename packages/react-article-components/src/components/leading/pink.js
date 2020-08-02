import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import Img from '../img-with-placeholder'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '../../constants/prop-types/leading'
import styled from 'styled-components'

const _ = {
  get,
}

const mockup = {
  mobile: {
    title: {
      width: 'calc(282/375*100%)', // %
    },
  },
  desktop: {
    title: {
      width: 437, // px
    },
  },
}

const BackgroundBlock = styled.div`
  /* through ThemeProvider of styled-components */
  background-color: ${props => props.theme.colors.primary.background};

  width: 100%;

  ${mq.desktopAndAbove`
    padding: 0 10px 18px 10px;

    height: ${props => `calc(100vh - ${props.paddingTop || '108px'})`};
  `}
`

const ContentBlock = styled.header`
  width: 100%;
  height: 100%;
  position: relative;

  ${mq.tabletAndBelow`
    padding-top: 60px;
  `}
`

const TextBlock = styled.div`
  ${mq.mobileOnly`
    position: static;
    width: calc(282/375*100%);
    margin-left: calc(30/375*100%);
  `}

  ${mq.tabletOnly`
    position: static;
    width: calc(513/768*100%);
    margin-left: auto;
    margin-right: auto;
  `}

  ${mq.desktopAndAbove`
    position: absolute;
    bottom: 0px;
    z-index: 1;
  `}
`

const TopicTextBlock = styled.div`
  background-color: ${props => props.theme.colors.primary.support};
  border: solid 2px #fff;
  display: inline-block;

  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 30px;

  /* through ThemeProvider of styled-components */
  color: ${props => props.theme.colors.primary.text};
  font-size: 20px;
  font-weight: bold;
  line-height: 1.8;
  letter-spacing: 0.4px;

  box-shadow: 5px 5px #fff;
`

const TitleTextBlock = styled.h1`
  /* through ThemeProvider of styled-components */
  color: ${props => props.theme.colors.primary.text};

  font-weight: bold;
  padding-left: 10px;

  /* overwrite h1 default margin*/
  margin: 0;


  ${mq.mobileOnly`
    font-size: 28px;
    > span {
      line-height: 1.29;
    }
  `}

  ${mq.tabletOnly`
    font-size: 42px;
    > span {
      line-height: 1.38;
    }
  `}

  ${mq.desktopAndAbove`
    width: ${mockup.desktop.title.width}px;
    font-size: 34px;
    > span {
      line-height: 1.6;
      background-color: #fff;
      box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;
    }
  `}

`

const SubtitleTextBlock = styled.h2`
  /* through ThemeProvider of styled-components */
  color: ${props => props.theme.colors.primary.text};
  display: block;

  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;

  > span {
    line-height: 2.1;
    padding: 6px 12px;
  }

  ${mq.desktopAndAbove`
    > span {
      background-color: #fff;
    }
  `}
`

const FigureBlock = styled.figure`
  /* reset margin of figure */
  margin: 0;

  ${mq.tabletAndBelow`
    position: relative;
    width: 100%;
    padding-bottom: 75%;
    margin-top: 40px;

    > .leading-image {
      position: absolute;
    }
  `}

  ${mq.desktopAndAbove`
    width: 100%;
    height: 100%;
    position: absolute;
  `}
`

export default class LeadingBlock extends PureComponent {
  static propTypes = predefinedPropTypes.pink

  static defaultProps = {
    poster: {},
    subtitle: '',
    topicHref: '',
    shortTitle: '',
    paddingTop: '',
  }

  render() {
    const {
      paddingTop,
      poster,
      subtitle,
      title,
      topicHref,
      shortTitle,
    } = this.props

    return (
      <BackgroundBlock paddingTop={paddingTop}>
        <ContentBlock>
          <TextBlock>
            {shortTitle ? (
              <DynamicComponentsContext.Consumer>
                {components => {
                  return (
                    <components.Link to={topicHref}>
                      <TopicTextBlock>{shortTitle}</TopicTextBlock>
                    </components.Link>
                  )
                }}
              </DynamicComponentsContext.Consumer>
            ) : null}
            {subtitle ? (
              <SubtitleTextBlock>
                <span>{subtitle}</span>
              </SubtitleTextBlock>
            ) : null}
            <TitleTextBlock>
              <span>{title}</span>
            </TitleTextBlock>
          </TextBlock>
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
        </ContentBlock>
      </BackgroundBlock>
    )
  }
}
