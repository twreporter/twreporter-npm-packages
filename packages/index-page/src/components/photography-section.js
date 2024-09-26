import React, { useState, useEffect, useCallback } from 'react'
import { Waypoint } from 'react-waypoint'
import PropTypes from 'prop-types'
import postPropType from './prop-types/post'
import styled from 'styled-components'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
// utils
import { breakPoints } from '../utils/style-utils'
import { getHref } from '../utils/getHref'
// components
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
// constants
import sectionStrings from '../constants/section-strings'
import categoryStrings from '../constants/category-strings'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorPhoto,
} from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import { throttle } from 'lodash'
const _ = {
  get,
  throttle,
}

const mockup = {
  img: {
    sizes: {
      desktop: '672px',
      tablet: '350px',
      mobile: '414px',
    },
  },
}

// If window is less than oneColumnWidth,
// there will be only one column. Default is two columns.
const oneColumnWidthInt = 768

const Section = styled.div`
  position: relative;
  background-color: ${props => {
    return props.$isAutoHover ? colorGrayscale.white : colorPhoto.dark
  }};
  padding-bottom: ${props => {
    return props.$isAutoHover ? '40px' : '80px'
  }};
  padding-top: 100px;

  ${mq.mobileOnly`
    padding-top: 0px;
  `}
`

const Listing = styled.ul`
  padding-left: 0px;
  max-width: 1344px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 60px;

  ${mq.desktopOnly`
    max-width: 928px;
  `}

  ${mq.tabletOnly`
    max-width: 700px;
  `}

  ${mq.mobileOnly`
    padding-top: 0px;
    padding-bottom: 40px;
    max-width: 100%;
  `}
`

const Item = styled.li`
  max-width: 672px;
  display: inline-block;
  vertical-align: bottom;

  ${mq.desktopOnly`
    max-width: 464px;
  `}

  ${mq.tabletOnly`
    max-width: 349px;
  `}

  ${mq.mobileOnly`
    max-width: 100%;
    width: 100%;
    height: 100%;
    display: block;
  `}
`
const Title = styled.div`
  position: absolute;
  color: ${colorGrayscale.white};
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.5;
  text-align: justify;
  font-weight: ${fontWeight.normal};
  font-family: ${fontFamily.title};
`

const Img = styled.div`
  position: relative;
  width: 672px;
  height: 450px;

  ${mq.desktopOnly`
    width: 464px;
    height: 310px;
  `}

  ${mq.tabletOnly`
    margin: 0 auto;
    width: 350px;
    height: 234px;
  `}

  ${mq.mobileOnly`
    width: 100%;
    height: 100%;
  `}
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: ${props => {
    return props.$isHover ? 1 : 0
  }};
  transition: 0.5s ease;
  background-color: ${colorPhoto.heavy}b3; // add 70% opacity

  ${mq.tabletAndAbove`
    &:hover {
      opacity: 1;
    }
  `}
`

const More = styled.div`
  text-align: center;
`

const Photography = ({
  title = '',
  imgObj = {},
  isExternal = false,
  isHover = false,
  slug = '',
}) => {
  const href = getHref(slug, isExternal)
  return (
    <Item>
      <TRLink href={href} redirect={isExternal}>
        <Img>
          <ImgWrapper
            alt={imgObj.alt}
            src={imgObj.src}
            srcSet={imgObj.srcSet}
            sizes={
              `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
              `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
              `${mockup.img.sizes.mobile}`
            }
          >
            <Overlay $isHover={isHover}>
              <Title>
                <CategoryName>{categoryStrings.photography}</CategoryName>
                {title}
              </Title>
            </Overlay>
          </ImgWrapper>
        </Img>
      </TRLink>
    </Item>
  )
}

Photography.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isExternal: PropTypes.bool,
  isHover: PropTypes.bool,
  slug: PropTypes.string,
}

const PhotographySection = ({
  data = [],
  moreURI = 'photography',
  useTinyImg = false,
}) => {
  const [eleTouchViewportTop, setEleTouchViewportTop] = useState(-1)
  const [isAutoHover, setIsAutoHover] = useState(false)
  const itemsToShow = 4

  // Check viewport width to determine if auto hover should be enabled (for mobile)
  const checkViewportWidth = useCallback(() => {
    const innerW = _.get(window, 'innerWidth', oneColumnWidthInt)
    setIsAutoHover(innerW < oneColumnWidthInt)
  }, [])

  // Handle element entering or leaving the viewport
  const onElementTouchViewportTop = useCallback(
    index => {
      if (isAutoHover) {
        setEleTouchViewportTop(index)
      }
    },
    [isAutoHover]
  )

  useEffect(() => {
    checkViewportWidth()

    const resizeThrottler = _.throttle(() => {
      checkViewportWidth()
      // The _checkViewportWidth will execute at a rate of 15fps
    }, 500)

    window.addEventListener('resize', resizeThrottler)
    return () => {
      window.removeEventListener('resize', resizeThrottler)
    }
  }, [checkViewportWidth])

  const postComps = data.slice(0, itemsToShow).map((item, index) => {
    const imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')
    const isHover = isAutoHover && eleTouchViewportTop === index

    return (
      <Waypoint
        key={_.get(item, 'id')}
        onEnter={() => onElementTouchViewportTop(index)}
        topOffset="8%"
        bottomOffset="90%"
      >
        <span>
          <Photography
            title={_.get(item, 'title')}
            imgObj={{
              alt: _.get(imgObj, 'description'),
              src: _.get(imgObj, [
                'resized_targets',
                useTinyImg ? 'tiny' : 'tablet',
                'url',
              ]),
              srcSet: _.get(imgObj, 'resized_targets'),
            }}
            isHover={isHover}
            slug={_.get(item, 'slug')}
            isExternal={_.get(item, 'is_external', false)}
          />
        </span>
      </Waypoint>
    )
  })

  return (
    <Waypoint
      key={'section_check_point'}
      onLeave={() => onElementTouchViewportTop(-1)}
    >
      <div>
        <Section $isAutoHover={isAutoHover}>
          <SectionName>
            <span>{sectionStrings.photography}</span>
          </SectionName>
          <Listing>{postComps}</Listing>
          <More>
            <BottomLink text="更多影像新聞" isDarkBg path={moreURI} />
          </More>
        </Section>
      </div>
    </Waypoint>
  )
}

PhotographySection.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
  moreURI: PropTypes.string,
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(PhotographySection)
