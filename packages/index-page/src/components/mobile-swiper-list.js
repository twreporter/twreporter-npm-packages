import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'

// constants
import {
  itemWidthPct,
  itemPaddingRightPct,
} from '../constants/mobile-mockup-specification'
// @twreporter
import { MobileOnly } from '@twreporter/react-components/lib/rwd'

const MobileList = styled(MobileOnly)`
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    width: ${itemWidthPct}%;
  }
`
const defaultFunc = () => {}
const MobileSwiperList = ({ children, onSlideChange = defaultFunc }) => {
  let render
  if (children) {
    render = Array.isArray(children) ? (
      children.map((item, idx) => <SwiperSlide key={idx}>{item}</SwiperSlide>)
    ) : (
      <SwiperSlide>{children}</SwiperSlide>
    )
  }
  return (
    <MobileList>
      <Swiper
        onSlideChange={onSlideChange}
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={`${itemPaddingRightPct}%`}
      >
        {render}
      </Swiper>
    </MobileList>
  )
}

MobileSwiperList.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onSlideChange: PropTypes.func,
}

export default MobileSwiperList
