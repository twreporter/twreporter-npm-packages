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
