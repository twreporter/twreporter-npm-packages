import React from 'react'
import PropTypes from 'prop-types'
import postPropType from './prop-types/post'
import styled from 'styled-components'
// utils
import { getHref } from '../utils/getHref'
import { breakPoints } from '../utils/style-utils'
// components
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import ContentWrapper from './common-utils/section-content-wrapper'
import TRLink from './common-utils/twreporter-link'
// constants
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
const mobileMidWidth = '578px'
const mobileSemiMidWidth = '414px'
const mobileMinWidth = '320px'

const mockup = {
  img: {
    sizes: {
      desktop: '199px',
      tablet: '160px',
      mobile: '136px',
    },
  },
}

const headerPadding = {
  desktop: '47px',
  tablet: '34px',
  mobile: '16px',
}

const Container = styled.div`
  background-color: ${color.lightGray};
  position: relative;
  ${mq.mobileOnly`
    padding: 0;
  `}
`

const ContentContainer = styled(ContentWrapper)`
  display: flex;
  padding: 30px ${headerPadding.desktop};
  overflow-x: hidden;
  justify-content: center;
  ${mq.tabletOnly`
    padding: 30px ${headerPadding.tablet};
  `}
  ${mq.mobileOnly`
    padding: 30px ${headerPadding.mobile};
  `}
`

const ItemFrame = styled.div`
  width: 199px;
  padding: 0;
  margin-left: 30px;
  &:first-child {
    margin: 0;
  }
  ${mq.desktopOnly`
    width: 130px;
  `}
  ${mq.tabletAndBelow`
    &:nth-child(6) {
      display: none;
    }
    &:nth-child(5) {
      display: none;
    }
  `}
  ${mq.tabletOnly`
    width: 160px;
    margin-left: 20px;
  `}
  @media (max-width: ${mobileMidWidth}) {
    &:nth-child(4) {
      display: none;
    }
  }
  @media (max-width: ${mobileSemiMidWidth}) {
    &:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: ${mobileMinWidth}) {
    width: 136px;
    margin-left: 16px;
  }
`

const ImageFrame = styled.div`
  width: 100%;
  height: 128px;
  background: ${props =>
    props.background ? `url(${props.background})` : 'backgroun-image'};
  background-size: cover;
  background-position: center;
  display: block;
  ${mq.desktopOnly`
    height: 90px;
  `}
  ${mq.tabletOnly`
    height: 110px;
  `}
  ${mq.mobileOnly`
    height: 100px;
  `}
  @media (max-width: ${mobileSemiMidWidth}) {
    height: 93px;
  }
  @media (max-width: ${mobileMinWidth}) {
    height: 88px;
  }
`

const ContentFrame = styled.div`
  margin: 0 auto;
`

const Category = styled(CategoryName)`
  height: 16px;
  line-height: 1.33;
  margin-top: 12px;
  margin-bottom: 4px;
`
const Title = styled.div`
  height: auto;
  font-size: 16px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  color: ${color.darkGray};
`

class LatestSection extends React.Component {
  render() {
    const latestItems = this.props.data.map(item => {
      const isExternal = _.get(item, 'is_external', false)
      const href = getHref(_.get(item, 'slug', 'error'), isExternal)
      const imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')
      const categoryName = _.get(item, 'category_set[0].category.name', '')
      const subcategoryName = _.get(
        item,
        'category_set[0].subcategory.name',
        ''
      )
      const categorySetName = `${categoryName}/${
        subcategoryName || '全部'
      }`
      return (
        <ItemFrame key={_.get(item, 'id')}>
          <TRLink href={href} redirect={isExternal}>
            <ImageFrame>
              <ImgWrapper
                alt={_.get(imgObj, 'description')}
                src={_.get(imgObj, 'resized_targets.mobile.url')}
                srcSet={_.get(imgObj, 'resized_targets')}
                sizes={
                  `(min-width: ${desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImageFrame>
            <ContentFrame>
              <Category>{categorySetName}</Category>
              <Title>{_.get(item, 'title', '')}</Title>
            </ContentFrame>
          </TRLink>
        </ItemFrame>
      )
    })

    return (
      <Container>
        <ContentContainer>{latestItems}</ContentContainer>
      </Container>
    )
  }
}

LatestSection.defaultProps = {
  data: [],
  moduleMap: {},
}

LatestSection.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
}

export default LatestSection
