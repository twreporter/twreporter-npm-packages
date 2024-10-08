import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import topicPropType from './prop-types/topic'
// utils
import { breakPoints, truncate } from '../utils/style-utils'
// components
import BottomTRLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import MobileSwiperList from './mobile-swiper-list'
// constants
import sectionStrings from '../constants/section-strings'
import strings from '../constants/strings'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
const _ = {
  forEach,
  get,
}

const mockup = {
  hd: {
    width: {
      default: 543,
    },
  },
  desktop: {
    width: {
      default: 369,
      desc: 340,
    },
  },
  tablet: {
    width: {
      default: 280,
    },
  },
  img: {
    sizes: {
      desktop: '543px',
      tablet: '280px',
      mobile: '308px',
    },
  },
}

const Container = styled.div`
  background-color: ${colorGrayscale.gray100};
`

const Rows = styled.div`
  margin-bottom: 70px;

  ${mq.mobileOnly`
    display: none;
  `}
`

const Row = styled.div`
  display: flex;
  text-align: center;
`

const TopicNameRow = styled(Row)`
  align-items: flex-end;
  justify-content: center;
`

const TitleRow = styled(Row)`
  align-items: center;
  justify-content: center;
`

const ImgRow = styled(Row)`
  align-items: flex-start;
  justify-content: center;
`

const DescRow = styled(Row)`
  align-items: flex-start;
  justify-content: center;
  text-align: justify;
`

const Column = styled.div`
  flex: 0 0 ${mockup.hd.width.default}px;
  margin-bottom: 12px;
  cursor: pointer;
  &:first-child {
    margin-right: 30px;
  }

  opacity: ${props => (props.$ifHover ? 0.7 : 1)};
  transition: 0.2s opacity linear;

  ${mq.desktopOnly`
    flex: 0 0 ${mockup.desktop.width.default}px;
  `}

  ${mq.tabletOnly`
    flex: 0 0 ${mockup.tablet.width.default}px;
    &:first-child {
      margin-right: 20px;
    }
  `}
`

const TopicNameColumn = styled(Column)`
  margin-bottom: 0;
  font-size: 12px;
  color: ${colorBrand.heavy};
`

const TitleColumn = styled(Column)`
  font-size: 32px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
`

const Title = styled.div`
  color: ${colorGrayscale.gray800};
  line-height: 1.25;
`

const ImgColumn = styled(Column)`
  height: 364px;
  flex: 0 0 ${mockup.hd.width.default}px;

  ${mq.desktopOnly`
    height: 247px;
    flex: 0 0 ${mockup.desktop.width.default}px;
  `}

  ${mq.tabletOnly`
    height: 186px;
    flex: 0 0 ${mockup.tablet.width.default}px;
  `}
`

const DescColumn = styled(Column)`
  font-size: 16px;
  line-height: 1.5;
`

const Desc = styled.div`
  width: ${(mockup.desktop.width.desc / mockup.desktop.width.default) * 100}%;
  margin: 0 auto;
  color: ${colorGrayscale.gray800};
`

const Mobile = {
  TopicName: styled(CategoryName)`
    text-align: center;
  `,
  Item: styled.div`
    padding-bottom: 40px;
    width: 100%;
  `,
  Title: styled(Title)`
    line-height: 1.33;
    text-align: center;
    font-family: ${fontFamily.title};
    font-weight: ${fontWeight.bold};
    font-size: 24px;
    margin-bottom: 15px;
    margin-top: 4px;
  `,
  Img: styled.div`
    height: 186px;
    width: 100%;
    margin: 0 auto;
  `,
  DescFrame: styled.div`
    width: 100%;
    height: 165px;
    margin-top: 15px;
  `,
  Desc: styled(Desc)`
    width: 100%;
    font-size: 18px;
    ${truncate('relative', 1.5, 6, colorGrayscale.gray100)}
    margin-left: 0;
  `,
}

const More = styled.div`
  text-align: center;
`

const sizesForsrcSet =
  `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
  `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
  `${mockup.img.sizes.mobile}`

const MobileTopic = ({
  title = '',
  topicName = '',
  desc = '',
  imgObj = {},
  slug = '',
}) => {
  const href = `topics/${slug}`
  return (
    <Mobile.Item>
      <TRLink href={href} plain>
        <Mobile.TopicName>{`${strings.topic}${strings.fullShapeDot}${topicName}`}</Mobile.TopicName>
        <Mobile.Title>{title}</Mobile.Title>
        <Mobile.Img>
          <ImgWrapper
            src={imgObj.src}
            alt={imgObj.alt}
            srcSet={imgObj.srcSet}
            sizes={sizesForsrcSet}
          />
        </Mobile.Img>
        <Mobile.DescFrame>
          <Mobile.Desc>{desc}</Mobile.Desc>
        </Mobile.DescFrame>
      </TRLink>
    </Mobile.Item>
  )
}

MobileTopic.propTypes = {
  title: PropTypes.string,
  topicName: PropTypes.string,
  desc: PropTypes.string,
  imgObj: PropTypes.object,
  slug: PropTypes.string,
}

const TopicsInARow = ({ data = [], useTinyImg = false }) => {
  const [indexHovered, setIndexHovered] = useState(-1)

  const handleHover = index => {
    setIndexHovered(index)
  }

  const topicNameColumns = []
  const titleColumns = []
  const imgColumns = []
  const descColumns = []

  _.forEach(data, (topic, index) => {
    const slug = _.get(topic, 'slug')
    const href = `topics/${slug}`
    const id = _.get(topic, 'id')
    const topicName = _.get(topic, 'topic_name', '')
    const title = _.get(topic, 'title', '')
    const imgObj = _.get(topic, 'leading_image') || _.get(topic, 'og_image')
    const desc = _.get(topic, 'og_description', '')

    topicNameColumns.push(
      <TopicNameColumn key={id}>{topicName}</TopicNameColumn>
    )

    titleColumns.push(
      <TitleColumn
        key={id}
        $ifHover={indexHovered === index}
        onMouseOver={() => {
          handleHover(index)
        }}
        onMouseLeave={() => {
          handleHover(-1)
        }}
      >
        <TRLink href={href} plain>
          <Title>{title}</Title>
        </TRLink>
      </TitleColumn>
    )

    imgColumns.push(
      <ImgColumn
        key={id}
        $ifHover={indexHovered === index}
        onMouseOver={() => {
          handleHover(index)
        }}
        onMouseLeave={() => {
          handleHover(-1)
        }}
      >
        <TRLink href={href} plain>
          <ImgWrapper
            alt={_.get(imgObj, 'description')}
            src={_.get(imgObj, [
              'resized_targets',
              useTinyImg ? 'tiny' : 'mobile',
              'url',
            ])}
            srcSet={_.get(imgObj, 'resized_targets', '')}
            sizes={sizesForsrcSet}
          />
        </TRLink>
      </ImgColumn>
    )

    descColumns.push(
      <DescColumn
        key={id}
        $ifHover={indexHovered === index}
        onMouseOver={() => {
          handleHover(index)
        }}
        onMouseLeave={() => {
          handleHover(-1)
        }}
      >
        <TRLink href={href} plain>
          <Desc>{desc}</Desc>
        </TRLink>
      </DescColumn>
    )
  })

  return (
    <Rows>
      <TopicNameRow>{topicNameColumns}</TopicNameRow>
      <TitleRow>{titleColumns}</TitleRow>
      <ImgRow>{imgColumns}</ImgRow>
      <DescRow>{descColumns}</DescRow>
    </Rows>
  )
}

TopicsInARow.propTypes = {
  data: PropTypes.arrayOf(topicPropType()),
  useTinyImg: PropTypes.bool,
}

const TopicsSection = ({
  data = [],
  moreURI = 'topics',
  useTinyImg = false,
}) => {
  const totalTopics = 4
  if (!Array.isArray(data) || _.get(data, 'length', 0) === 0) {
    return null
  }

  const mobileTopicComps = data.map(item => {
    const desc = _.get(item, 'og_description')
    const imgObj = _.get(item, 'leading_image') || _.get(item, 'og_image')
    return (
      <MobileTopic
        key={_.get(item, 'id')}
        title={_.get(item, 'title')}
        topicName={_.get(item, 'topic_name')}
        desc={desc}
        imgObj={{
          alt: _.get(imgObj, 'description'),
          src: _.get(imgObj, [
            'resized_targets',
            useTinyImg ? 'tiny' : 'mobile',
            'url',
          ]),
          srcSet: _.get(imgObj, 'resized_targets', ''),
        }}
        slug={_.get(item, 'slug')}
      />
    )
  })

  return (
    <Container>
      <Section>
        <SectionName>
          <span>{sectionStrings.topic}</span>
        </SectionName>
        <TopicsInARow data={data.slice(0, 2)} useTinyImg={useTinyImg} />
        <TopicsInARow
          data={data.slice(2, totalTopics)}
          useTinyImg={useTinyImg}
        />
        <MobileSwiperList>{mobileTopicComps}</MobileSwiperList>
        <More>
          <BottomTRLink text="更多報導者專題" path={moreURI} />
        </More>
      </Section>
    </Container>
  )
}

TopicsSection.propTypes = {
  data: PropTypes.arrayOf(topicPropType()),
  moreURI: PropTypes.string,
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(TopicsSection)
