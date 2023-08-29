import postPropType from './prop-types/post'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
// utils
import { breakPoints } from '../utils/style-utils'
import { getHref } from '../utils/getHref'
// components
import BottomLink from './common-utils/bottom-link'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import ImgWrapper from './common-utils/img-wrapper'
import MobileSwiperList from './mobile-swiper-list'
// constants
import sectionStrings from '../constants/section-strings'
import color from '../constants/color'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const desktopMinWidth = breakPoints.desktopMinWidth
const tabletMinWidth = breakPoints.tabletMinWidth
const backgroundColor = color.gray

const mockup = {
  mobile: {
    titleWidth: 209,
    titleFrameWidth: 237,
  },
  img: {
    sizes: {
      desktop: '202px',
      tablet: '210px',
      mobile: '308px',
    },
  },
}

const Container = styled.div`
  background-color: ${backgroundColor};
`

const SectionWrapper = styled(Section)`
  background-color: initial;
  padding-bottom: 10px;
`

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 47px;
  justify-content: center;
  ${mq.tabletOnly`
    padding: 0 34px;
  `}
  ${mq.mobileOnly`
    display: none;
  `}
`

const FlexItem = styled.div`
  background-color: white;
  position: relative;
  margin-bottom: 70px;
  padding-bottom: 20px;
  width: 312px;
  margin-right: 32.6px;
  &:nth-child(4n) {
    margin-right: 0px;
  }
  ${mq.desktopOnly`
    width: 210px;
    margin-right: 30px;
    &:nth-child(4n) {
      margin-right: 0px;
    }
  `}
  ${mq.tabletOnly`
    width: 160px;
    margin-right: 20px;
    &:nth-child(4n) {
      margin-right: 0px;
    }
  `}
  ${mq.mobileOnly`
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  `}
`

const ImgFrame = styled.div`
  height: 202px;
  ${mq.desktopOnly`
    height: 138px;
  `}
  ${mq.tabletOnly`
    height: 138px;
  `}
  ${mq.mobileOnly`
    height: 186px;
  `}
`

const CategoryName = styled.div`
  background-color: ${backgroundColor};
  width: 100%;
  color: ${color.darkGray};
  font-weight: ${fontWeight.bold};
  line-height: 1.4;
  text-align: center;
  font-size: 20px;
  padding-bottom: 8px;
`

const TextFrame = styled.div`
  background: white;
  padding: 16px 0 20px 0;
  min-height: 94px;
`

const Title = styled.div`
  font-family: ${fontFamily.title};
  font-weight: ${fontWeight.bold};
  font-size: 20px;
  color: ${color.darkGray};
  line-height: 1.4;
  width: 92%;
  margin: 0 auto;
  ${mq.mobileOnly`
    width: ${(mockup.mobile.titleWidth / mockup.mobile.titleFrameWidth) * 100}%;
  `}
`

const More = styled.div`
  position: absolute;
  left: 50%;
  bottom: -16px;
  padding-top: 16px;
  transform: translateX(-50%);
  text-align: center;
  width: 101%;
  background-color: ${backgroundColor};
  ${mq.mobileOnly`
    bottom: -24px;
  `}
`

class Category extends React.PureComponent {
  render() {
    const { data, useTinyImg } = this.props
    const items = data.map((item, index) => {
      const isExternal = _.get(item, 'is_external', false)
      const href = getHref(_.get(item, 'slug', 'error'), isExternal)
      const imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')
      const key = `${index}-${_.get(item, 'id')}`
      return (
        <FlexItem key={key}>
          <CategoryName>{_.get(item, 'listName')}</CategoryName>
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
                  `(min-width: ${desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImgFrame>
            <TextFrame>
              <Title>{_.get(item, 'title')}</Title>
            </TextFrame>
          </TRLink>
          <More>
            <BottomLink
              text={`更多${_.get(item, 'listName')}`}
              path={_.get(item, 'moreURI')}
            />
          </More>
        </FlexItem>
      )
    })
    return (
      <Container>
        <SectionWrapper>
          <SectionName>
            <span>{sectionStrings.category}</span>
          </SectionName>
          <FlexBox>{items}</FlexBox>
          <MobileSwiperList>{items}</MobileSwiperList>
        </SectionWrapper>
      </Container>
    )
  }
}

Category.defaultProps = {
  data: [],
  useTinyImg: false,
}

Category.propTypes = {
  data: PropTypes.arrayOf(
    postPropType({
      listName: PropTypes.string.isRequired,
      moreURI: PropTypes.string.isRequired,
    })
  ),
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(Category)
