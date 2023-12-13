import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import topicPropType from './prop-types/topic'
// utils
import { breakPoints, truncate } from '../utils/style-utils'
import { getHref } from '../utils/getHref'
// components
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import TRLink from './common-utils/twreporter-link'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import MobileSwiperList from './mobile-swiper-list'
// constants
import sectionStrings from '../constants/section-strings'
import strings from '../constants/strings'
import { itemWidthPct } from '../constants/mobile-mockup-specification'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
const _ = {
  forEach,
  get,
}

const mockup = {
  img: {
    sizes: {
      desktop: '426px',
      tablet: '220px',
      mobile: '279px',
    },
  },
}

const categoryPrefix = strings.topic + strings.fullShapeDot
const Container = styled.div`
  background-color: ${colorGrayscale.gray100};
`

const ContentContainer = styled(Section)`
  text-align: center;
`

const TopicFrame = styled.div`
  width: 447px;
  margin: 0 auto;
  ${mq.mobileOnly`
    width: 100%;
  `}
`

const Title = styled.div`
  width: 374px;
  font-size: 32px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  line-height: 1.25;
  color: ${colorGrayscale.gray800};
  text-align: center;
  margin: 2px auto 0 auto;
  ${mq.mobileOnly`
    font-size: 24px;
    width: ${itemWidthPct}%;
  `}
`

const Description = styled.div`
  margin-top: 12px;
  width: 447px;
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  color: ${colorGrayscale.gray800};
  ${mq.mobileOnly`
    width: ${itemWidthPct}%;
    margin: 6px auto 0 auto;
    font-size: 18px;
  `}
`

// container for relateds FlexItem
const FlexBox = styled.div`
  margin-top: 48px;
  min-height: 335px;
  padding: 0 48px;
  display: flex;
  justify-content: center;
  ${mq.desktopOnly`
    padding: 0 49px;
  `}
  ${mq.tabletOnly`
    padding: 0 34px;
  `}
  ${mq.mobileOnly`
    display: none;
  `}
`

// container for each related articles
const FlexItem = styled.div`
  min-height: 335px;
  width: 426px;
  &:nth-child(2) {
    margin: 0 33px;
  }
  ${mq.desktopOnly`
    width: 290px;
    &:nth-child(2) {
      margin: 0 28px;
    }
  `}
  ${mq.tabletOnly`
    width: 220px;
    &:nth-child(2) {
      margin: 0 20px;
    }
  `}
  ${mq.mobileOnly`
    width: 100%;
  `}
`

const MobileList = styled.div`
  margin-top: 30px;
`

const RelatedsContentFrame = styled.div`
  width: 100%;
  height: auto;
  padding: 0 8px 0 8px;
`

const RelatedCategory = styled(CategoryName)`
  text-align: left;
  margin: 12px 0 2px 0;
`

const RelatedTitle = styled.div`
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  color: ${colorGrayscale.gray800};
  line-height: 1.5;
`

const RelatedDescription = styled.div`
  margin-top: 8px;
  height: auto;
  font-size: 16px;
  line-height: 20px;
  color: ${colorGrayscale.gray800};
  ${truncate('relative', 1.43, 4, colorGrayscale.gray100)};
  ${mq.mobileOnly`
    font-size: 18px;
  `}
`
const MoreFrame = styled.div`
  margin: 60px auto 0 auto;
  ${mq.mobileOnly`
    margin: 40px auto 0 auto;
  `}
`

const ImgFrame = styled.div`
  height: 274px;
  ${mq.desktopOnly`
    height: 186px;
  `}
  ${mq.tabletOnly`
    height: 140px;
  `}
  ${mq.mobileOnly`
    height: 186px;
  `}
`

class LatestTopic extends React.PureComponent {
  render() {
    const { data, useTinyImg } = this.props
    const relateds = _.get(data, 'relateds', [])
    let relatedsJsx = []
    _.forEach(relateds, post => {
      if (typeof post !== 'object' || post === null) {
        return
      }

      const isExternal = _.get(post, 'is_external', false)
      const href = getHref(_.get(post, 'slug', 'error'), isExternal)
      const imgObj = _.get(post, 'hero_image') || _.get(post, 'og_image')
      relatedsJsx.push(
        <FlexItem key={_.get(post, 'id')}>
          <TRLink href={href} redirect={isExternal}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(imgObj, 'description')}
                src={_.get(imgObj, [
                  'resized_targets',
                  useTinyImg ? 'tiny' : 'mobile',
                  'url',
                ])}
                srcSet={_.get(imgObj, 'resized_targets')}
                sizes={
                  `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImgFrame>
            <RelatedsContentFrame>
              <RelatedCategory>
                {`${categoryPrefix}${_.get(data, 'short_title', '')}`}
              </RelatedCategory>
              <RelatedTitle>{_.get(post, 'title', '')}</RelatedTitle>
              <RelatedDescription>
                {_.get(post, 'og_description', '')}
              </RelatedDescription>
            </RelatedsContentFrame>
          </TRLink>
        </FlexItem>
      )
    })

    return (
      <Container>
        <ContentContainer>
          <SectionName>
            <span>{sectionStrings.latestTopic}</span>
          </SectionName>
          <TopicFrame>
            <CategoryName>{`${categoryPrefix}${_.get(
              data,
              'short_title',
              ''
            )}`}</CategoryName>
            <Title>{_.get(data, 'title', '')}</Title>
            <Description>{_.get(data, 'og_description', '')}</Description>
          </TopicFrame>
          <FlexBox>{relatedsJsx}</FlexBox>
          <MobileList>
            <MobileSwiperList>{relatedsJsx}</MobileSwiperList>
          </MobileList>
          <MoreFrame>
            <BottomLink
              text={`更多${_.get(data, 'short_title', '')}文章`}
              path={`topics/${_.get(data, 'slug', '')}`}
            />
          </MoreFrame>
        </ContentContainer>
      </Container>
    )
  }
}

LatestTopic.defaultProps = {
  data: {},
  useTinyImg: false,
}

LatestTopic.propTypes = {
  data: topicPropType(),
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(LatestTopic)
