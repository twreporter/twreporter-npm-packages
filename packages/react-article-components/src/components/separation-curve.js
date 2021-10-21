import PropTypes from 'prop-types'
import React from 'react'
import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'
import themeConst from '../constants/theme'
import colorConst from '../constants/color'

const Separation = styled.div`
  width: 192px;
  margin: 40px auto;

  ${mq.hdOnly`
    width: 270px;
  `}
  >svg>path {
    fill: ${props => {
      switch (props.theme.name) {
        case themeConst.article.v2.pink:
          return colorConst.pink
        case themeConst.article.v2.photo:
          return colorConst.brown
        case themeConst.article.v2.default:
        default:
          return colorConst.milkTea
      }
    }};
  }
`

const curve = (
  <svg
    viewBox="0 0 270 11"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.414"
  >
    <path
      d="M270,11c-6.285,0 -9.463,-2.629 -12.537,-5.172c-3.097,-2.562 -6.023,-4.982 -12.013,-4.982c-5.99,0 -8.915,2.42 -12.013,4.982c-3.074,2.543 -6.252,5.172 -12.537,5.172c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.99,0 -8.916,2.42 -12.012,4.983c-3.074,2.542 -6.252,5.171 -12.536,5.171c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.989,0 -8.915,2.42 -12.012,4.983c-3.073,2.542 -6.251,5.171 -12.534,5.171c-6.284,0 -9.461,-2.629 -12.534,-5.172c-3.097,-2.562 -6.021,-4.982 -12.01,-4.982c-5.988,0 -8.912,2.42 -12.008,4.982c-3.073,2.543 -6.251,5.172 -12.534,5.172c-6.283,0 -9.459,-2.629 -12.532,-5.172c-3.096,-2.562 -6.02,-4.982 -12.008,-4.982c-5.989,0 -8.914,2.42 -12.01,4.982c-3.073,2.543 -6.251,5.172 -12.535,5.172c-6.283,0 -9.46,-2.629 -12.533,-5.172c-3.097,-2.562 -6.022,-4.982 -12.01,-4.982l0,-0.846c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.021,4.982 12.009,4.982c5.989,0 8.914,-2.42 12.011,-4.982c3.073,-2.543 6.251,-5.172 12.534,-5.172c6.283,0 9.46,2.629 12.533,5.172c3.095,2.562 6.019,4.982 12.007,4.982c5.988,0 8.913,-2.42 12.009,-4.982c3.073,-2.543 6.25,-5.172 12.533,-5.172c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.022,4.982 12.01,4.982c5.989,0 8.913,-2.42 12.01,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.461,2.629 12.535,5.172c3.096,2.562 6.022,4.982 12.011,4.982c5.989,0 8.915,-2.42 12.012,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.462,2.629 12.535,5.172c3.097,2.562 6.022,4.982 12.011,4.982c5.99,0 8.916,-2.42 12.013,-4.982c3.074,-2.543 6.252,-5.172 12.537,-5.172c6.286,0 9.463,2.629 12.537,5.172c3.098,2.562 6.023,4.982 12.013,4.982l0,0.846Z"
      fill="#fabcf0"
    />
  </svg>
)

export default function SeparationCurve(props = {}) {
  return <Separation className={props.className}>{curve}</Separation>
}

SeparationCurve.propTypes = {
  className: PropTypes.string,
}
