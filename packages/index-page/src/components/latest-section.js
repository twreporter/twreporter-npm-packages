import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import PropTypes from 'prop-types'
import React from 'react'
import ContentWrapper from './common-utils/section-content-wrapper'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import styled from 'styled-components'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import { getHref } from '../utils/getHref'
import { breakPoints, finalMedia } from '../utils/style-utils'

const _ = {
  get,
}

const desktopMinWidth = breakPoints.desktopMinWidth
const tabletMinWidth = breakPoints.tabletMinWidth
const mobileMaxWidth = breakPoints.mobileMaxWidth
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
  background-color: #f2f2f2;
  position: relative;
  ${finalMedia.mobile`
    padding: 0;
  `}
`

const ContentContainer = styled(ContentWrapper)`
  display: flex;
  padding: 30px ${headerPadding.desktop};
  overflow-x: hidden;
  justify-content: center;
  ${finalMedia.tablet`
    padding: 30px ${headerPadding.tablet};
  `}
  ${finalMedia.mobile`
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
  ${finalMedia.desktop`
    width: 130px;
  `}
  ${finalMedia.tabletBelow`
    &:nth-child(6) {
      display: none;
    }
    &:nth-child(5) {
      display: none;
    }
  `}
  ${finalMedia.tablet`
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
  ${finalMedia.desktop`
    height: 90px;
  `}
  ${finalMedia.tablet`
    height: 110px;
  `}
  @media (max-width: ${mobileMaxWidth}) {
    height: 100px;
  }
  @media (max-width: ${mobileSemiMidWidth}) {
    height: 93px;
  }
  @media (max-width: ${mobileMinWidth}) {
    height: 88px;
  }
`

const ContentFrame = styled.div`
  width: 88%;
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
  color: #4a4949;
`

class LatestSection extends React.Component {
  render() {
    const latestItems = this.props.data.map(item => {
      const isExternal = _.get(item, 'is_external', false)
      const href = getHref(_.get(item, 'slug', 'error'), isExternal)
      return (
        <ItemFrame key={_.get(item, 'id')}>
          <TRLink href={href} redirect={isExternal}>
            <ImageFrame>
              <ImgWrapper
                alt={_.get(item, 'hero_image.description', '')}
                src={_.get(item, 'hero_image.resized_targets.mobile.url', '')}
                srcSet={_.get(item, 'hero_image.resized_targets', '')}
                sizes={
                  `(min-width: ${desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImageFrame>
            <ContentFrame>
              <Category>{_.get(item, 'categories[0].name', '')}</Category>
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
