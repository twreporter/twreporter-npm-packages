import map from 'lodash/map'

const _ = {
  map,
}

/**
 *
 *
 * @export
 * @param {Array<number>|Array<string>} [values=[]]
 * @param {string} [unit='px']
 * @returns {string}
 */
export function arrayToCssShorthand(values = [], unit = 'px') {
  return _.map(values, value => {
    switch (typeof value) {
      case 'number':
        return value === 0 ? '0' : `${value}${unit}`
      case 'string':
        return value
      default:
        return ''
    }
  }).join(' ')
}
