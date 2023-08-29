import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
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
    height: 100%;
  }
  .swiper-slide {
    width: ${itemWidthPct}%;
  }
`

const MobileSwiperList = ({ children }) => {
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
}

export default MobileSwiperList
