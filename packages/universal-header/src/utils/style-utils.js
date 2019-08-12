import { breakpoints } from '../constants/break-points'
import { css, keyframes } from 'styled-components'

import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'

const _ = {
  isArray,
  reduce,
}

const changeOpacity = (valueFrom, valueTo) => keyframes`
  from {
    opacity: ${valueFrom};
  }
  to {
    opacity: ${valueTo};
  }
`

export const linkUnderline = css`
  animation: ${changeOpacity('0', '1')} 0.5s linear;
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  content: '';
  width: 100%;
  height: 3px;
  background-color: red;
`

/**
 * @prop {array|number} values - Array or number of values
 * @prop {string} unit - Unit
 * */
export const arrayToCssShorthand = (values, unit = 'px') => {
  const _handleValue = value => {
    switch (typeof value) {
      case 'number':
        return value === 0 ? '0' : `${value}${unit}`
      case 'string':
        return value
      default:
        return ''
    }
  }
  if (!_.isArray(values)) {
    return _handleValue(values)
  }
  return values.map(_handleValue).join(' ')
}

export const mq = mqSettingsObj => {
  const mqString = _.reduce(mqSettingsObj, (result, value, key) => {
    switch (key) {
      case 'mediaType':
        return `${value} ${result}`
      default:
        return `${result} and (${key}: ${value})`
    }
  })
  return (...cssCode) => css`
    @media ${mqString} {
      ${css(...cssCode)}
    }
  `
}

const bp = {
  small: {
    max: `${breakpoints.medium.min - 1}px`,
  },
  medium: {
    min: `${breakpoints.medium.min}px`,
    max: `${breakpoints.large.min - 1}px`,
  },
  large: {
    min: `${breakpoints.large.min}px`,
    max: `${breakpoints.xlarge.min - 1}px`,
  },
  xlarge: {
    min: `${breakpoints.xlarge.min}px`,
  },
}

export const screen = {
  mobileOnly: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'max-width': bp.small.max,
    })(...cssCode),
  tabletAbove: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'min-width': bp.medium.min,
    })(...cssCode),
  tabletOnly: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'min-width': bp.medium.min,
      'max-width': bp.medium.max,
    })(...cssCode),
  tabletBelow: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'max-width': bp.medium.max,
    })(...cssCode),
  desktopOnly: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'min-width': bp.large.min,
      'max-width': bp.large.max,
    })(...cssCode),
  desktopAbove: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'min-width': bp.large.min,
    })(...cssCode),
  hdAbove: (...cssCode) =>
    mq({
      mediaType: 'only screen',
      'min-width': bp.xlarge.min,
    })(...cssCode),
}
