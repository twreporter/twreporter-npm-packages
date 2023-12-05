import React from 'react'
import PropTypes from 'prop-types'
import postPropType from './prop-types/post'
import styled from 'styled-components'
// utils
import { getHref } from '../utils/getHref'
import { truncate, breakPoints } from '../utils/style-utils'
// components
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import MobileSwiperList from './mobile-swiper-list'
// constants
import sectionStrings from '../constants/section-strings'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const mockup = {
  img: {
    sizes: {
      desktop: '886px',
      tablet: '450px',
      mobile: '307px',
    },
  },
}

const CarouselContainer = styled(Section)`
  padding-top: 0;
  background: ${colorGrayscale.white};
`

const TextFrame = styled.div`
  height: 240px;
  position: relative;
`

const Category = styled(CategoryName)`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 74px;
  text-align: center;
`

const Title = styled.div`
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: 24px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  color: ${colorGrayscale.gray800};
  position: absolute;
`

const TitleSpan = styled.span`
  width: 100%;
  height: 3.99;
  ${truncate('absolute', 1.33, 3, colorGrayscale.white, 'center')};
`

const Description = styled.div`
  top: 150px;
  left: 50%;
  font-size: 18px;
  transform: translateX(-50%);
  width: 100%;
  text-align: left;
  color: ${colorGrayscale.gray800};
  ${truncate('absolute', 1.43, 3, colorGrayscale.white)};
`

const ImgFrame = styled.div`
  height: 186px;
`

class EditorPicksMobile extends React.Component {
  render() {
    const { data } = this.props
    const flexItems = data.map(post => {
      const isExternal = _.get(post, 'is_external', false)
      const href = getHref(_.get(post, 'slug', 'error'), isExternal)
      const imgObj = _.get(post, 'hero_image') || _.get(post, 'og_image')
      const key = _.get(post, 'id')
      return (
        <TRLink href={href} redirect={isExternal} key={key}>
          <TextFrame>
            <Category>
              {_.get(post, 'category_set[0].category.name', '')}
            </Category>
            <Title>
              <TRLink href={href} redirect={isExternal}>
                <TitleSpan>{_.get(post, 'title', '')}</TitleSpan>
              </TRLink>
            </Title>
            <Description>{_.get(post, 'og_description', '')}</Description>
          </TextFrame>
          <ImgFrame>
            <ImgWrapper
              alt={_.get(imgObj, 'description')}
              src={_.get(imgObj, 'resized_targets.mobile.url')}
              srcSet={_.get(imgObj, 'resized_targets')}
              sizes={
                `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                `${mockup.img.sizes.mobile}`
              }
            />
          </ImgFrame>
        </TRLink>
      )
    })

    return (
      <CarouselContainer>
        <SectionName>
          <span>{sectionStrings.editorPick}</span>
        </SectionName>
        <MobileSwiperList>{flexItems}</MobileSwiperList>
      </CarouselContainer>
    )
  }
}

EditorPicksMobile.defaultProps = {
  data: [],
}

EditorPicksMobile.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
}

export default EditorPicksMobile
