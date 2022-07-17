import alignmentConsts from '../../constants/element-alignment'
import Annotation from './annotation'
import Audio from './audio'
import Blockquote from './blockquote'
import Brief from './brief'
import CenteredQuote from './centered-quote'
import Embedded, {
  Block as EmbeddedBlock,
  Caption as EmbeddedCaption,
} from './embedded-code'
import Headings from './headings'
import Image from './image'
import ImageDiff from './image-diff'
import Infobox from './infobox'
import list from './list'
import Multimedia from './multimedia'
import Paragraph from './paragraph'
import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Slideshow from './slideshow'
import styled, { css } from 'styled-components'
import TOC from '../table-of-contents'
import Youtube from './youtube'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

// Change smooth-scroll import path due to SSR issue:
// https://github.com/cferdinandi/smooth-scroll/issues/481
import SmoothScroll from 'smooth-scroll/dist/smooth-scroll'

const _ = {
  get,
  map,
}

const mockup = {
  margin: {
    extend: '60px auto',
    large: '60px auto',
    normal: '40px auto',
    headerOne: '60px auto 40px auto',
    headerTwo: '60px auto 40px auto',
  },
}

const extendWidthCSS = css`
  ${mq.mobileOnly`
    width: 100%;
  `}
  ${mq.tabletOnly`
    width: 100%;
  `}
  ${mq.desktopOnly`
    width: 752px;
  `}
  ${mq.hdOnly`
    width: 1033px;
  `}
`

const largeWidthCSS = css`
  ${mq.mobileOnly`
    width: calc(300/375*100%);
  `}
  ${mq.tabletOnly`
    width: 513px;
  `}
  ${mq.desktopOnly`
    width: 550px;
  `}
  ${mq.hdOnly`
    width: 730px;
  `}
`

const normalWidthCSS = css`
  ${mq.mobileOnly`
    width: calc(300/375*100%);
  `}
  ${mq.tabletOnly`
    width: 453px;
  `}
  ${mq.desktopOnly`
    width: 480px;
  `}
  ${mq.hdOnly`
    width: 580px;
  `}
`

const StyledBrief = styled(Brief)`
  ${normalWidthCSS};
  margin: 0 auto;
`

const alignRightCSS = css`
  ${mq.tabletAndBelow`
    margin: 0 auto;
  `}

  ${mq.desktopAndAbove`
    float: right;
    margin: 0 0 50px 25px;
  `}

  ${mq.desktopOnly`
    width: 403px;
  `}

  ${mq.hdOnly`
    width: 532px;
  `}
`

const clearFloatCSS = css`
  clear: both;
`

const StyledAnnotation = styled(Annotation)`
  ${normalWidthCSS}
  margin: ${mockup.margin.normal};
`

const StyledAudio = styled(Audio)`
  ${largeWidthCSS}
  ${clearFloatCSS}
  margin: ${mockup.margin.large};
`

const StyledCenteredQuote = styled(CenteredQuote)`
  ${largeWidthCSS}
  ${clearFloatCSS}
  margin: ${mockup.margin.large};
`

const StyledBlockquote = styled(Blockquote)`
  ${normalWidthCSS}
  margin: ${mockup.margin.normal};
`

const StyledHeaderOne = styled(Headings.H1)`
  ${normalWidthCSS}
  margin: ${mockup.margin.headerOne};
`

const StyledHeaderTwo = styled(Headings.H2)`
  ${normalWidthCSS}
  margin: ${mockup.margin.headerTwo};
`

const embeddedCSS = css`
  ${clearFloatCSS}
  margin: ${mockup.margin.normal};
  ${mq.tabletAndBelow`
    ${EmbeddedBlock} {
      text-align: center;
    }
  `}
  ${mq.mobileOnly`
    width: calc(350/375*100%);
    ${EmbeddedCaption} {
      width: calc(300/350*100%);
      margin: 15px auto 0 auto;
      /* overwrite default styles */
      padding: 0;
    }
  `}
`

const StyledEmbedded = styled(Embedded)`
  ${largeWidthCSS}
  ${embeddedCSS}
`

const StyledEmbeddedNormal = styled(Embedded)`
  ${normalWidthCSS}
  ${embeddedCSS}
`

const StyledExtendImageBlock = styled.div`
  ${extendWidthCSS}
  ${clearFloatCSS}
  margin: ${mockup.margin.extend};
`

const StyledLargeImageBlock = styled.div`
  ${largeWidthCSS}
  ${clearFloatCSS}

  /* overwrite largeWidthCSS.mobile styles */
  ${mq.mobileOnly`
    width: 100%;
  `}

  /* overwrite the position of image block and caption */
  margin: ${mockup.margin.large};
  ${Multimedia.Caption} {
    /* overwrite existing styles*/
    margin-bottom: 0px;

    ${mq.desktopAndAbove`
      position: absolute;
      bottom: 0;
      transform: translateX(100%);
      &:after {
        width: 100%;
      }
    `}
    ${mq.desktopOnly`
      right: -21px;
    `}
    ${mq.hdOnly`
      right: -38px;
    `}
  }
`

const StyledSlideshow = styled(Slideshow)`
  ${extendWidthCSS}
  ${clearFloatCSS}
  margin: ${mockup.margin.extend};
`

const StyledYoutube = styled(Youtube)`
  ${extendWidthCSS}
  ${clearFloatCSS}
  margin: ${mockup.margin.extend};
`

const StyledInfobox = styled(Infobox)`
  ${largeWidthCSS}
  ${clearFloatCSS}
  margin: ${mockup.margin.large};
`

const StyledOrderedList = styled(list.OrderedList)`
  ${normalWidthCSS}
  margin: ${mockup.margin.normal};
`

const StyledUnorderedList = styled(list.UnorderedList)`
  ${normalWidthCSS}
  margin: ${mockup.margin.normal};
`

const StyledParagraph = styled(Paragraph)`
  ${normalWidthCSS}
  margin: ${mockup.margin.normal};
`

const AlignRight = styled.div`
  ${extendWidthCSS}
  ${clearFloatCSS}
  ${StyledCenteredQuote}, ${StyledBlockquote}, ${StyledEmbedded}, ${StyledInfobox} {
    ${alignRightCSS};
  }

  ${StyledEmbedded} {
    ${mq.desktopAndAbove`
      margin: 0 0 20px 30px;
      ${EmbeddedCaption} {
        padding: 13px 10px 0 10px;
      }
    `}
  }
`

const ClearFloat = styled.div`
  ${clearFloatCSS}
`

/**
 *  Element Data
 *  See `elementData` in `src/constants/prop-types/body.js`
 *  @typedef {Object} ElementData
 *  @property {string} id - Unique id
 *  @property {string} alignment - One of `alignmentConsts`
 *  @property {string} type - Element type
 *  @property {string[]|Object[]} content - Element content
 */

/**
 *
 *
 * @export
 * @param {ElementData} [data={}]
 * @returns
 */
export function renderElement(data = {}, isAnchorScrolling) {
  const isCenterAligned =
    data.alignment === alignmentConsts.center ||
    data.alignment === alignmentConsts.centerSmall
  switch (data.type) {
    case 'annotation':
      return <StyledAnnotation key={data.id} data={data} />
    case 'audio':
      return <StyledAudio key={data.id} content={data.content[0]} />
    case 'centered-quote':
    case 'quoteby':
      return isCenterAligned ? (
        <StyledCenteredQuote key={data.id} data={data} />
      ) : (
        <AlignRight key={data.id}>
          <StyledCenteredQuote data={data} />
        </AlignRight>
      )
    case 'blockquote':
      return isCenterAligned ? (
        <StyledBlockquote key={data.id} data={data} />
      ) : (
        <AlignRight key={data.id}>
          <StyledBlockquote data={data} />
        </AlignRight>
      )
    case 'header-one':
      return <StyledHeaderOne key={data.id} data={data} />
    case 'header-two':
      return <StyledHeaderTwo key={data.id} data={data} />
    case 'code':
      return null
    case 'embedded-code':
    case 'embeddedCode':
    case 'embeddedcode':
      switch (data.alignment) {
        case alignmentConsts.right:
        case alignmentConsts.left: {
          return (
            <AlignRight key={data.id}>
              <StyledEmbedded
                data={data}
                isAnchorScrolling={isAnchorScrolling}
              />
            </AlignRight>
          )
        }
        case alignmentConsts.centerSmall:
          return (
            <StyledEmbeddedNormal
              key={data.id}
              data={data}
              isAnchorScrolling={isAnchorScrolling}
            />
          )
        case alignmentConsts.center:
        default: {
          return (
            <StyledEmbedded
              key={data.id}
              data={data}
              isAnchorScrolling={isAnchorScrolling}
            />
          )
        }
      }
    case 'small-image':
    case 'image':
    case 'image-link': {
      /*
        The `image-link` in keystone editor is using `embedded-code` component actually currently.
        If we add a `image-link` type in the future, we just have to make the data format of `image-link` and `image` the same.
      */
      switch (data.alignment) {
        case alignmentConsts.right:
        case alignmentConsts.left:
          return (
            <StyledExtendImageBlock key={data.id}>
              <Image data={data} small />
            </StyledExtendImageBlock>
          )
        case alignmentConsts.centerSmall:
          return (
            <StyledLargeImageBlock key={data.id}>
              <Image data={data} />
            </StyledLargeImageBlock>
          )
        case alignmentConsts.center:
        default:
          return (
            <StyledExtendImageBlock key={data.id}>
              <Image data={data} />
            </StyledExtendImageBlock>
          )
      }
    }
    case 'imageDiff':
    case 'imagediff':
      return (
        <StyledExtendImageBlock key={data.id}>
          <ImageDiff key={data.id} data={data} />
        </StyledExtendImageBlock>
      )
    case 'infobox':
      return isCenterAligned ? (
        <StyledInfobox key={data.id} data={data} />
      ) : (
        <AlignRight key={data.id}>
          <StyledInfobox data={data} />
        </AlignRight>
      )
    case 'ordered-list-item':
      return <StyledOrderedList key={data.id} data={data} />
    case 'unordered-list-item':
      return <StyledUnorderedList key={data.id} data={data} />
    case 'unstyled':
      return <StyledParagraph key={data.id} data={data} />
    case 'slideshow':
      return <StyledSlideshow key={data.id} data={data} />
    case 'youtube':
      return <StyledYoutube key={data.id} data={data} />
    default:
      return <StyledParagraph key={data.id} data={data} />
  }
}

export default class Body extends Component {
  static propTypes = {
    brief: PropTypes.arrayOf(predefinedPropTypes.elementData),
    content: PropTypes.arrayOf(predefinedPropTypes.elementData),
  }

  static defaultProps = {
    brief: [],
    content: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      isAnchorScrolling: false,
    }
  }

  componentDidMount() {
    // eslint-disable-next-line no-new
    new SmoothScroll('[anchor-scroll]', {
      speed: 500,
      easing: 'easeInOutCubic',
      emitEvents: true,
    })
    document.addEventListener(
      'scrollStart',
      () => this._onAnchorClick(true),
      false
    )
    document.addEventListener(
      'scrollStop',
      () => {
        // Wait for a short time to avoid trigger waypoint's onEnter() of infogram embed
        setTimeout(() => {
          this._onAnchorClick(false)
        }, 50)
      },
      false
    )
  }

  tocManager = TOC.createManager()

  _onAnchorClick = isAnchorScrolling => {
    this.setState({ isAnchorScrolling: isAnchorScrolling })
  }

  _buildContentElement = (data, index) => {
    if (!data.id) {
      data.id = `body_element_${index}`
    }

    return renderElement(data, this.state.isAnchorScrolling)
  }

  render() {
    const { brief, content } = this.props
    let enableTOC = false

    const contentJsx = Array.isArray(content)
      ? _.map(content, (data, index) => {
          const elementJSX = this._buildContentElement(data, index)
          if (data.type === 'header-one') {
            enableTOC = true
            return (
              <TOC.React.Anchor
                key={data.id}
                // provide header-one string as anchor id for article
                id={_.get(data, 'content.0', `section-${index}`)}
                label={_.get(data, 'content.0')}
                manager={this.tocManager}
              >
                {elementJSX}
              </TOC.React.Anchor>
            )
          }
          return elementJSX
        })
      : null
    return (
      <div>
        <StyledBrief data={brief} />
        {contentJsx}
        <ClearFloat />
        {enableTOC ? (
          <TOC.React.TableOfContents manager={this.tocManager} />
        ) : null}
      </div>
    )
  }
}
