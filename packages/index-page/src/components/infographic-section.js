import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListBase from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
import { breakPoints, finalMedia, truncate } from '../utils/style-utils'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import { getHref } from '../utils/getHref'

const _ = {
  get,
}

// If window is less than oneColumnWidth,
// there will be only one column. Default is three columns.
const oneColumnWidth = breakPoints.mobileMaxWidth

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
  background-color: #f2f2f2;
`

const UpperList = styled.div`
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;

  ${finalMedia.mobile`
    display: none;
  `}
`

const LowerList = styled(UpperList)`
  align-items: flex-end;
  margin-top: -282px;
  margin-bottom: 59px;

  ${finalMedia.desktop`
    margin-top: -170px;
  `}

  ${finalMedia.tablet`
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

  ${finalMedia.desktop`
    max-width: 290px;
  `}

  ${finalMedia.tablet`
    max-width: 220px;
    &:first-child {
      margin-right: 20px;
    }

    &:last-child {
      margin-left: 20px;
    }
  `}

  ${finalMedia.mobile`
    max-width: 100%;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  `}

  @media (min-width: ${oneColumnWidth}) {
    &:hover {
      opacity: 0.7;
    }
  }
`
const WordBlock = styled.div`
  background-color: #fff;
  width: 430px;
  min-height: 115px;
  padding: 8px 20px 15px 12px;

  ${finalMedia.desktop`
    width: 290px;
  `}

  ${finalMedia.tablet`
    margin: 0 auto;
    width: 220px;
  `}

  ${finalMedia.mobile`
    width: 100%;
    height: 100%;
  `}
`

const Title = styled.h3`
  margin: 0;
  font-weight: ${fontWeight.bold};
  font-size: 20px;
  color: #4a4a4a;
  @media (min-width: ${breakPoints.desktopMinWidth}) {
    ${truncate('relative', 1.4, 2, '#fff')};
  }

  ${finalMedia.tablet`
    font-size: 16px;
    ${truncate('relative', 1.4, 3, '#fff')};
  `}
`

const ImgFrame = styled.div`
  position: relative;
  width: 430px;
  height: ${props => {
    return props.isPortrait ? '596px' : '282px'
  }};

  ${finalMedia.desktop`
    max-width: 290px;
    height: ${props => {
      return props.isPortrait ? '390px' : '190px'
    }};
  `}

  ${finalMedia.tablet`
    margin: 0 auto;
    width: 220px;
    height: ${props => {
      return props.isPortrait ? '290px' : '145px'
    }};
  `}

  ${finalMedia.mobile`
    width: 100%;
    height: 186px;
  `}
`
const More = styled.div`
  text-align: center;
`

class Infographic extends React.PureComponent {
  render() {
    const { title, imgObj, isPortrait, slug, style } = this.props
    const href = getHref(slug, style)
    return (
      <Item>
        <TRLink href={href} redirect={style === 'interactive'}>
          <ImgFrame isPortrait={isPortrait}>
            <ImgWrapper
              alt={imgObj.alt}
              src={imgObj.src}
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
  isPortrait: false,
  slug: '',
  style: '',
}

Infographic.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isPortrait: PropTypes.bool,
  slug: PropTypes.string,
  style: PropTypes.string,
}

class InfographicSection extends React.PureComponent {
  render() {
    const { data, moreURI, useTinyImg } = this.props
    const listNumber = 3

    const postComps = data.slice(0, 6).map((item, index) => {
      const portraitImg = _.get(item, 'leading_image_portrait')
      let imgObj = _.get(item, 'hero_image')

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
          style={_.get(item, 'style')}
        />
      )
    })

    return (
      <Container>
        <Section mobileWidth={oneColumnWidth}>
          <SectionName mobileWidth={oneColumnWidth}>
            <span>{sectionStrings.infographic}</span>
          </SectionName>
          <UpperList>{postComps.slice(0, listNumber)}</UpperList>
          <LowerList>{postComps.slice(listNumber, listNumber * 2)}</LowerList>
          <MobileList maxWidth={oneColumnWidth}>
            <MobileFlexSwipeable.SwipableFlexItems
              mobileWidth={oneColumnWidth}
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
