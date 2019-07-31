import Img from '../img-with-placeholder'
import React from 'react'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/related'
import styled from 'styled-components'
import typography from '../../constants/typography'

const mockup = {
  mobile: {
    thumbnail: {
      width: 88, // px
      height: 68, // px
    },
  },
  tablet: {
    thumbnail: {
      width: 88, // px
      height: 68, // px
    },
  },
  desktop: {
    thumbnail: {
      width: 246, // px
      height: 148, // px
    },
  },
  hd: {
    thumbnail: {
      width: 349, // px
      height: 148, // px
    },
  },
}

const Block = styled.article`
  position: relative;
  height: 100%;

  ${mq.tabletAndBelow`
    width: 100%;
    min-height: 152px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}

  ${mq.desktopOnly`
    width: ${mockup.desktop.thumbnail.width}px;
  `}

  ${mq.hdOnly`
    width: ${mockup.hd.thumbnail.width}px;
  `}
`

const Thumbnail = styled.figure`
  margin: 0;

  ${mq.tabletAndBelow`
    order: 2;
  `}

  ${mq.mobileOnly`
    width: ${mockup.mobile.thumbnail.width}px;
    height: ${mockup.mobile.thumbnail.height}px;
  `}

  ${mq.tabletOnly`
    width: ${mockup.tablet.thumbnail.width}px;
    height: ${mockup.tablet.thumbnail.height}px;
  `}

  ${mq.desktopOnly`
    width: 100%;
    height: ${mockup.desktop.thumbnail.height}px;
  `}

  ${mq.hdOnly`
    width: 100%;
    height: ${mockup.hd.thumbnail.height}px;
  `}
`

const TextBlock = styled.div`
  padding: 15px 19px 70px 0px;

  ${mq.tabletAndBelow`
    max-width: 62%;
    order: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
  `}
`

const Category = styled.span`
  color: ${props => props.theme.colors.primary.accent};
  font-size: 14px;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.43;
  margin-right: 10px;

  ${mq.tabletAndBelow`
    order: 1;
  `}
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.5;
  color: ${props => props.theme.colors.base.text};
  margin: 10px 0 0 0;

  ${mq.tabletAndBelow`
    order: 2;
    margin-bottom: 15px;
  `}
`

const DescBlock = styled.div`
  position: absolute;
  left: 0;
  bottom: 15px;

  > p {
    display: none;
  }

  &:hover {
    width: 100%;
    &::before {
      position: absolute;
      content: '';
      left: 18px;
      top: 100%;
      width: 100%;
      height: 12px;
      border-width: 0 0 0 1px;
      border-style: solid;
      border-color: #afafaf;
    }

    > p {
      display: block;
      position: absolute;
      z-index: 1;
      font-size: 14px;
      line-height: 1.43;
      color: #808080;
      background-color: #fff;
      padding: 15px;
      border-radius: 4px;
      margin-top: 12px;
    }
  }

  ${mq.tabletAndBelow`
    display: none;
  `}
`

const DescBT = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: ${typography.font.weight.bold};
  color: #808080;
  line-height: 1;
  padding: 5px 10px;
  &::before {
    content: '更多內容';
  }
`

const DescInfo = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: solid 1px #cdcdcd;
  margin-left: 4px;

  &::after {
    content: 'i';
    color: #9c9c9c;
    position: absolute;
    font-size: 12px;
    top: 50%;
    left: 50%;
    font-family: RobotoSlab;
    transform: translate(-50%, -50%);
  }
`

const PublishedDate = styled.span`
  font-size: 12px;
  line-height: 2;
  color: #afafaf;

  ${mq.tabletAndBelow`
    order: 3;
  `}
`

function Card(props) {
  const date = props.date
    ? new Date(props.date).toLocaleString('zh-hant', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : ''

  return (
    <Block>
      <Thumbnail>
        <Img
          defaultImage={props.thumbnail}
          objectFit="cover"
          objectPosition="center center"
        />
      </Thumbnail>
      <TextBlock>
        {props.category ? <Category>{props.category}</Category> : null}
        {date ? <PublishedDate>{date}</PublishedDate> : null}
        <Title>{props.title}</Title>
      </TextBlock>
      <DescBlock>
        <DescBT>
          <DescInfo />
        </DescBT>
        <p>{props.desc}</p>
      </DescBlock>
    </Block>
  )
}

Card.propTypes = predefinedProps.card

export default Card
