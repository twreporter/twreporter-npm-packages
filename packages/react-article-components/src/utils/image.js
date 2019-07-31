// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'

const _ = {
  get,
  map,
}

/**
 * @typedef Image - An image object with its url and width
 * @property {string} url
 * @property {number} width
 */

/**
 *
 * @param {Image} image
 * @returns
 */
function buildImageCandidateString(image) {
  const url = replaceGCSUrlOrigin(_.get(image, 'url'))
  const elementRenderedMaxWidth = _.get(image, 'width')
  if (url && elementRenderedMaxWidth) {
    return `${url} ${elementRenderedMaxWidth}w`
  }
}

/**
 * Get srcset for img tag
 * @param {Image[]} imageSet
 * @return {string} the value of srcset attribute
 */
export const getSrcsetString = imageSet =>
  _.map(imageSet, buildImageCandidateString)
    .filter(Boolean)
    .join(', ')
