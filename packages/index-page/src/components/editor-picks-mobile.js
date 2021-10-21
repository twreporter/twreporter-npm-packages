import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import SwipableMixin from './common-utils/swipable-mixin'
import Swipeable from 'react-swipeable'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import sectionStrings from '../constants/section-strings'
import color from '../constants/color'
import styled from 'styled-components'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import { getHref } from '../utils/getHref'
import { itemWidthPct } from '../constants/mobile-mockup-specification'
import { truncate, breakPoints } from '../utils/style-utils'

const _ = {
  get,
}

const mobileWidth = breakPoints.mobileMaxWidth

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
  background: ${color.white};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    display: none;
  }
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
  width: ${itemWidthPct}%;
  font-size: 24px;
  font-weight: ${fontWeight.bold};
  color: ${color.darkGray};
  position: absolute;
`

const TitleSpan = styled.span`
  width: 100%;
  height: 3.99;
  ${truncate('absolute', 1.33, 3, color.white, 'center')};
`

const Description = styled.div`
  top: 150px;
  left: 50%;
  font-size: 18px;
  transform: translateX(-50%);
  width: ${itemWidthPct}%;
  text-align: left;
  color: ${color.darkGray};
  ${truncate('absolute', 1.43, 3, 'white')};
`

const ImgFrame = styled.div`
  height: 186px;
`

const FadeInFadeOut = styled.div`
  opacity: ${props => (props.isSelected ? '1' : '0')};
  z-index: ${props => (props.isSelected ? '1' : '0')};
  transition: 0.5s opacity linear;
`

class EditorPicksMobile extends SwipableMixin {
  render() {
    const onSwiping = (e, deltaX, deltaY, absX, absY) => {
      // In order to avoid slightly vibrating while swiping left and right,
      // we set a threshold to prevent scrolling.
      // 10 is the the threshold value we set after manually testing.
      if (absY < 10) {
        e.preventDefault()
      }
    }
    const ImageComp = post => {
      const isExternal = _.get(post, 'is_external', false)
      const href = getHref(_.get(post, 'slug', 'error'), isExternal)
      const imgObj = _.get(post, 'hero_image') || _.get(post, 'og_image')
      return (
        <TRLink href={href} redirect={isExternal}>
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
    }

    const { data } = this.props
    const flexItems = data.map(post => {
      return (
        <MobileFlexSwipeable.FlexItem
          key={_.get(post, 'id')}
          mobileWidth={mobileWidth}
        >
          {ImageComp(post)}
        </MobileFlexSwipeable.FlexItem>
      )
    })

    const textFrameContent = data.map((post, index) => {
      const isExternal = _.get(post, 'is_external', false)
      const href = getHref(_.get(post, 'slug', 'error'), isExternal)
      const fadingStyle = {
        opacity: this.state.selected === index ? '1' : '0',
        zIndex: this.state.selected === index ? '1' : '0',
        transition: 'opacity .5s linear',
      }
      return (
        <FadeInFadeOut
          key={_.get(post, 'id')}
          isSelected={index === this.state.selected}
        >
          <Category>{_.get(post, 'categories[0].name', '')}</Category>
          <Title style={fadingStyle}>
            <TRLink href={href} redirect={isExternal}>
              <TitleSpan>{_.get(post, 'title', '')}</TitleSpan>
            </TRLink>
          </Title>
          <Description>{_.get(post, 'og_description', '')}</Description>
        </FadeInFadeOut>
      )
    })

    return (
      <CarouselContainer mobileWidth={mobileWidth}>
        <Swipeable
          onSwipedRight={this.onSwipedRight}
          onSwipedLeft={this.onSwipedLeft}
          onSwiping={onSwiping}
        >
          <SectionName mobileWidth={mobileWidth}>
            <span>{sectionStrings.editorPick}</span>
          </SectionName>
          <TextFrame>{textFrameContent}</TextFrame>
          <MobileFlexSwipeable.FlexList
            selected={this.state.selected}
            mobileWidth={mobileWidth}
          >
            {flexItems}
          </MobileFlexSwipeable.FlexList>
        </Swipeable>
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
