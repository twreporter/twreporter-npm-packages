import React from 'react'
import PropTypes from 'prop-types'
import postPropType from './prop-types/post'
import styled from 'styled-components'
// utils
import { breakPoints, truncate } from '../utils/style-utils'
import { getHref } from '../utils/getHref'
// components
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListBase from './common-utils/mobile-list'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
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

const mockup = {
  img: {
    sizes: {
      desktop: '430px',
      tablet: '220px',
      mobile: '372px',
    },
  },
}

const Container = styled.div`
  background-color: ${color.lightGray};
`

const UpperList = styled.div`
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;

  ${mq.mobileOnly`
    display: none;
  `}
`

const LowerList = styled(UpperList)`
  align-items: flex-end;
  margin-top: -282px;
  margin-bottom: 59px;

  ${mq.desktopOnly`
    margin-top: -170px;
  `}

  ${mq.tabletOnly`
    margin-top: -130px;
    margin-bottom: 51px;
  `}
`

const MobileList = styled(MobileListBase)`
  margin-bottom: 39px;
`

const Item = styled.div`
  max-width: 430px;
  transition: 300ms all linear;
  &:first-child {
    margin-right: 30px;
  }

  &:last-child {
    margin-left: 30px;
  }

  ${mq.desktopOnly`
    max-width: 290px;
  `}

  ${mq.tabletOnly`
    max-width: 220px;
    &:first-child {
      margin-right: 20px;
    }

    &:last-child {
      margin-left: 20px;
    }
  `}

  ${mq.mobileOnly`
    max-width: 100%;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  `}

  ${mq.tabletAndAbove`
    &:hover {
      opacity: 0.7;
    }
  `}
`
const WordBlock = styled.div`
  background-color: ${color.white};
  width: 430px;
  min-height: 115px;
  padding: 8px 20px 15px 12px;

  ${mq.desktopOnly`
    width: 290px;
  `}

  ${mq.tabletOnly`
    margin: 0 auto;
    width: 220px;
  `}

  ${mq.mobileOnly`
    width: 100%;
    height: 100%;
  `}
`

const Title = styled.h3`
  margin: 0;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  font-size: 20px;
  color: ${color.darkGray};
  ${mq.desktopAndAbove`
    ${truncate('relative', 1.4, 2, color.white)};
  `}

  ${mq.tabletOnly`
    font-size: 16px;
    ${truncate('relative', 1.4, 3, color.white)};
  `}
`

const ImgFrame = styled.div`
  position: relative;
  width: 430px;
  height: ${props => {
    return props.isPortrait ? '596px' : '282px'
  }};

  ${mq.desktopOnly`
    max-width: 290px;
    height: ${props => {
      return props.isPortrait ? '390px' : '190px'
    }};
  `}

  ${mq.tabletOnly`
    margin: 0 auto;
    width: 220px;
    height: ${props => {
      return props.isPortrait ? '290px' : '145px'
    }};
  `}

  ${mq.mobileOnly`
    width: 100%;
    height: 186px;
  `}
`
const More = styled.div`
  text-align: center;
`

class Infographic extends React.PureComponent {
  render() {
    const { title, imgObj, isPortrait, slug, isExternal } = this.props
    const href = getHref(slug, isExternal)
    return (
      <Item>
        <TRLink href={href} redirect={isExternal}>
          <ImgFrame isPortrait={isPortrait}>
            <ImgWrapper
              alt={imgObj.alt}
              src={imgObj.src}
              width={_.get(imgObj, 'srcSet.mobile.width')}
              height={_.get(imgObj, 'srcSet.mobile.height')}
              srcSet={imgObj.srcSet}
              sizes={
                `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                `${mockup.img.sizes.mobile}`
              }
            />
          </ImgFrame>
          <WordBlock>
            <CategoryName>{sectionStrings.infographic}</CategoryName>
            <Title>{title}</Title>
          </WordBlock>
        </TRLink>
      </Item>
    )
  }
}

Infographic.defaultProps = {
  title: '',
  imgObj: {},
  isExternal: false,
  isPortrait: false,
  slug: '',
}

Infographic.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isExternal: PropTypes.bool,
  isPortrait: PropTypes.bool,
  slug: PropTypes.string,
}

class InfographicSection extends React.PureComponent {
  render() {
    const { data, moreURI, useTinyImg } = this.props
    const listNumber = 3

    const postComps = data.slice(0, 6).map((item, index) => {
      const portraitImg = _.get(item, 'leading_image_portrait')
      let imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')

      if (index === 0 || index === 4 || index === 5) {
        if (typeof _.get(portraitImg, 'resized_targets') === 'object') {
          imgObj = portraitImg
        }
      }
      return (
        <Infographic
          key={_.get(item, 'id')}
          category={_.get(item, 'categories.[0].name')}
          imgObj={{
            alt: _.get(imgObj, 'description'),
            src: _.get(imgObj, [
              'resized_targets',
              useTinyImg ? 'tiny' : 'mobile',
              'url',
            ]),
            srcSet: _.get(imgObj, 'resized_targets'),
          }}
          title={_.get(item, 'title')}
          isPortrait={index === 0 || index === 4 || index === 5}
          slug={_.get(item, 'slug')}
          isExternal={_.get(item, 'is_external', false)}
        />
      )
    })

    return (
      <Container>
        <Section>
          <SectionName>
            <span>{sectionStrings.infographic}</span>
          </SectionName>
          <UpperList>{postComps.slice(0, listNumber)}</UpperList>
          <LowerList>{postComps.slice(listNumber, listNumber * 2)}</LowerList>
          <MobileList>
            <MobileFlexSwipeable.SwipableFlexItems
              maxSwipableItems={5}
              alignItems="flex-start"
            >
              {postComps}
            </MobileFlexSwipeable.SwipableFlexItems>
          </MobileList>
          <More>
            <BottomLink path={moreURI} text="更多多媒體新聞" isDarkBg />
          </More>
        </Section>
      </Container>
    )
  }
}

InfographicSection.defaultProps = {
  data: [],
  moreURI: 'categories/infographic',
  useTinyImg: false,
}

InfographicSection.propTypes = {
  moreURI: PropTypes.string,
  data: PropTypes.arrayOf(postPropType()),
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(InfographicSection)
