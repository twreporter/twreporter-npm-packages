import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import React from 'react'
import styled, { css } from 'styled-components'
// components
import Img from '../img-with-placeholder'
// constants
import predefinedPropTypes from '../../constants/prop-types/leading'
import themeConst from '../../constants/theme'
import typography from '../../constants/typography'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'
import { H1 } from '@twreporter/react-components/lib/text/headline'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const ContentBlock = styled.div`
  letter-spacing: 0.4px;

  ${mq.mobileOnly`
    line-height: 1.43;
  `}
`

const TextBlock = styled.div`
  margin: 0 auto;

  ${mq.mobileOnly`
    padding-left: 24px;
    padding-right: 24px;
  `}

  ${mq.tabletOnly`
    width: calc(513/768*100%);
  `}

  ${mq.desktopAndAbove`
    width: 718px;
  `}
`

const Title = styled(H1)`
  margin: 0 0 40px 0;

  ${mq.mobileOnly`
    margin-bottom: 38px;
  `}
`

const Subtitle = styled.h2`
  font-weight: ${typography.font.weight.bold};
  margin: 0 0 10px 0;
  ${mq.mobileOnly`
    font-size: 16px;
  `}

  ${mq.tabletAndAbove`
    line-height: 2.1;
    font-size: 20px;
  `}
`

const Topic = styled.div`
  font-size: 14px;
  display: inline-block;
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  margin-bottom: 15px;
`

const Figure = styled.figure`
  /* clear default figure margin */
  margin: 0;
  ${props => props.css}
`

const FigCaption = styled.figcaption`
  margin-top: 15px;

  ${mq.tabletAndBelow`
    font-size: 14px;
  `}

  ${mq.mobileOnly`
    margin-left: calc(6/375*100%);
    margin-right: calc(6/375*100%);
  `}

  ${mq.tabletAndAbove`
    margin-left: calc(15/768*100%);
    margin-right: calc(15/768*100%);
  `}

  ${mq.hdOnly`
    margin-top: 20px;
  `}
`

const BackgroundBlock = styled.div`
  ${props => getBackgroundBlockStyles(props.theme.name)}
  ${mq.hdOnly`
    padding-top: 100px;
  `}
  ${mq.desktopOnly`
    padding-top: 48px;
  `}
  ${mq.tabletOnly`
    padding-top: 32px;
  `}
  ${mq.mobileOnly`
    padding-top: 30px;
  `}
`

function getBackgroundBlockStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return css`
        background-color: ${COLOR_PINK_ARTICLE.darkBlue};
        ${FigCaption} {
          color: ${colorGrayscale.gray600};
        }
        ${Topic} {
          color: ${colorSupportive.main};
          border-color: ${colorSupportive.heavy};
        }
        ${Subtitle}, ${Title} {
          color: ${colorGrayscale.gray300};
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        background-color: ${colorGrayscale.gray100};
        ${FigCaption} {
          color: ${colorGrayscale.gray600};
        }
        ${Topic} {
          color: ${colorSupportive.heavy};
          border-color: ${colorSupportive.main};
        }
        ${Subtitle}, ${Title} {
          color: ${colorGrayscale.gray800};
        }
      `
  }
}

export default class NormalLeading extends React.PureComponent {
  static propTypes = predefinedPropTypes.default

  static defaultProps = {
    figureCaption: '',
    poster: {},
    subtitle: '',
    topicHref: '',
    shortTitle: '',
    isTopicPublished: false,
  }

  constructor(props) {
    super(props)

    this.figureWidth = {
      tablet: 567,
      desktop: 778,
      hd: 1080,
    }
  }

  getFigureCSS() {
    return css`
      ${mq.mobileOnly`
        width: 100%;
      `}
      ${mq.tabletAndAbove`
        margin: 0 auto;
      `}
      ${mq.tabletOnly`
        width: calc(${this.figureWidth.tablet}/768*100%);
      `}
      ${mq.desktopOnly`
        width: ${this.figureWidth.desktop}px;
      `}
      ${mq.hdOnly`
        width: ${this.figureWidth.hd}px;
      `}
    `
  }

  render() {
    const {
      figureCaption,
      poster,
      subtitle,
      title,
      topicHref,
      shortTitle,
      isTopicPublished,
    } = this.props

    return (
      <BackgroundBlock>
        <ContentBlock>
          <TextBlock>
            {isTopicPublished && shortTitle ? (
              <DynamicComponentsContext.Consumer>
                {components => {
                  return (
                    <components.Link to={topicHref}>
                      <Topic>{shortTitle}</Topic>
                    </components.Link>
                  )
                }}
              </DynamicComponentsContext.Consumer>
            ) : null}
            {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
            <Title text={title} />
          </TextBlock>
          <Figure css={this.getFigureCSS()}>
            <Img
              imgPlaceholderSrc={_.get(poster, 'tiny.url', '')}
              imageSet={[poster.mobile, poster.tablet, poster.desktop]}
              defaultImage={poster.mobile}
              sizes="(max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px"
            />
            {figureCaption ? <FigCaption>{figureCaption}</FigCaption> : null}
          </Figure>
        </ContentBlock>
      </BackgroundBlock>
    )
  }
}
