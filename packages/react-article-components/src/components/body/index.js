import Annotation from './annotation'
import Audio from './audio'
import Blockquote from './blockquote'
import Brief from './brief'
import CenteredQuote from './centered-quote'
import Embedded from './embedded-code'
import Headings from './headings'
import Image from './image'
import ImageDiff from './image-diff'
import Infobox from './infobox'
import list from './list'
import map from 'lodash/map'
import mq from '@twreporter/core/lib/utils/media-query'
import Paragraph from './paragraph'
import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slideshow from './slideshow'
import styled, { css } from 'styled-components'
import Youtube from './youtube'

const _ = {
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

const StyledAnnotation = styled(Annotation)`
  ${normalWidthCSS};
  margin: ${mockup.margin.normal};
`

const StyledAudio = styled(Audio)`
  ${largeWidthCSS};
  margin: ${mockup.margin.large};
`

const StyledCenteredQuote = styled(CenteredQuote)`
  ${largeWidthCSS};
  margin: ${mockup.margin.large};
`

const StyledBlockquote = styled(Blockquote)`
  ${normalWidthCSS};
  margin: ${mockup.margin.normal};
`

const StyledHeaderOne = styled(Headings.H1)`
  ${normalWidthCSS};
  margin: ${mockup.margin.headerOne};
`

const StyledHeaderTwo = styled(Headings.H2)`
  ${normalWidthCSS};
  margin: ${mockup.margin.headerTwo};
`

const StyledEmbedded = styled(Embedded)`
  ${largeWidthCSS};
  margin: ${mockup.margin.large};
`

const StyledImageBlock = styled.div`
  ${extendWidthCSS};
`

const StyledSlideshow = styled(Slideshow)`
  ${extendWidthCSS};
  margin: ${mockup.margin.extend};
`

const StyledYoutube = styled(Youtube)`
  ${extendWidthCSS};
  margin: ${mockup.margin.extend};
`

const StyledInfobox = styled(Infobox)`
  ${largeWidthCSS};
  margin: ${mockup.margin.large};
`

const StyledOrderedList = styled(list.OrderedList)`
  ${normalWidthCSS};
  margin: ${mockup.margin.normal};
`

const StyledUnorderedList = styled(list.UnorderedList)`
  ${normalWidthCSS};
  margin: ${mockup.margin.normal};
`

const StyledParagraph = styled(Paragraph)`
  ${normalWidthCSS};
  margin: ${mockup.margin.normal};
`

const AlignRight = styled.div`
  ${extendWidthCSS};
  ${StyledCenteredQuote}, ${StyledBlockquote}, ${StyledEmbedded}, ${StyledInfobox} {
    ${alignRightCSS};
  }
`

function renderElement(data = {}) {
  const isCenterAligned =
    data.alignment !== 'left' && data.alignment !== 'right'
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
      return isCenterAligned ? (
        <StyledEmbedded key={data.id} data={data} />
      ) : (
        <AlignRight key={data.id}>
          <StyledEmbedded data={data} />
        </AlignRight>
      )
    case 'small-image':
    case 'image':
    case 'image-link':
      /*
        The `image-link` in keystone editor is using `embedded-code` component actually currently.
        If we add a `image-link` type in the future, we just have to make the data format of `image-link` and `image` the same.
      */
      return (
        <StyledImageBlock key={data.id}>
          <Image data={data} small={!isCenterAligned} />
        </StyledImageBlock>
      )
    case 'imageDiff':
    case 'imagediff':
      return (
        <StyledImageBlock key={data.id}>
          <ImageDiff key={data.id} data={data} />
        </StyledImageBlock>
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

export default class Body extends PureComponent {
  static propTypes = {
    brief: PropTypes.arrayOf(predefinedPropTypes.elementData),
    content: PropTypes.arrayOf(predefinedPropTypes.elementData),
  }

  static defaultProps = {
    brief: [],
    content: [],
  }

  _buildContentElement = (data, index) => {
    if (!data.id) {
      data.id = `body_element_${index}`
    }
    return renderElement(data)
  }

  render() {
    const { brief, content } = this.props
    const contentJsx = Array.isArray(content)
      ? _.map(content, this._buildContentElement)
      : null
    return (
      <div>
        <StyledBrief data={brief} />
        {contentJsx}
      </div>
    )
  }
}
