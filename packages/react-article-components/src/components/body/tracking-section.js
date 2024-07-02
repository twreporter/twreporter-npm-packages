import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import {
  colorSupportive,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { H4 } from '@twreporter/react-components/lib/text/headline'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import mq from '@twreporter/core/lib/utils/media-query'
// constants
import predefinedPropTypes from '../../constants/prop-types/body'
// components
import AnnotationParagraph from './annotation'
import Paragraph from './paragraph'
import Image from './image'
import Infobox from './infobox'
import list from './list'
import CenteredQuote from './centered-quote'
import Blockquote from './blockquote'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const TrackingSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${colorSupportive.heavy};
  border-radius: 50%;
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const H4Gray800 = styled(H4)`
  color: ${colorGrayscale.gray800};
`

const DateRow = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  &:first-child {
    align-items: center;
  }
`

const ContentContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 4px;
  border-left: 1px solid ${colorGrayscale.gray300};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  gap: 20px;
`

const InfoBoxContainer = styled.div`
  ${mq.mobileOnly`
    width: 296px;
  `}
  ${mq.tabletOnly`
    width: 456px;
  `}
  ${mq.desktopAndAbove`
    width: 556px;
  `}
`

const TrackingSection = ({ data }) => {
  const { title, publishDate, content } = data

  const createContentElement = (data, idx) => {
    if (!data.id) {
      data.id = `body_element_${idx}`
    }
    switch (data.type) {
      case 'annotation':
        return <AnnotationParagraph key={data.id} data={data} />
      case 'centered-quote':
      case 'quoteby':
        return <CenteredQuote key={data.id} data={data} />
      case 'blockquote':
        return <Blockquote key={data.id} data={data} />
      case 'unstyled':
        return <Paragraph key={data.id} data={data} forTrackingSection={true} />
      case 'small-image':
      case 'image':
      case 'image-link':
        return <Image key={data.id} data={data} forTrackingSection={true} />
      case 'infobox':
        return (
          <InfoBoxContainer key={data.id}>
            <Infobox data={data} forTrackingSection={true} />
          </InfoBoxContainer>
        )
      case 'ordered-list-item':
        return <list.OrderedList key={data.id} data={data} />
      case 'unordered-list-item':
        return <list.UnorderedList key={data.id} data={data} />
      default:
        return null
    }
  }

  const contentJSX = Array.isArray(content)
    ? _.map(content, (data, idx) => {
        const elementJSX = createContentElement(data, idx)
        return elementJSX
      })
    : null
  return (
    <TrackingSectionContainer id={title}>
      <DateRow>
        <Dot />
        <P2Gray600 text={date2yyyymmdd(publishDate, '/')} />
      </DateRow>
      <ContentContainer>
        <Content>
          <H4Gray800 text={title} />
          {contentJSX}
        </Content>
      </ContentContainer>
    </TrackingSectionContainer>
  )
}

TrackingSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    publishDate: PropTypes.string,
    content: PropTypes.arrayOf(predefinedPropTypes.elementData),
  }).isRequired,
}

export default TrackingSection
