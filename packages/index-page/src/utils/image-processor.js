import get from 'lodash/get'
import { replaceStorageUrlPrefix } from './url-processor'

const screenSize = {
  smallScreenMinWidth: 480,
  smallScreenMaxWidth: 768,
  mediumScreenMaxWidth: 992,
  mediumScreenMinWidth: 769,
  largeScreenMinWidth: 993,
}

/**
 * Get image set as imgSrc attribute of <img> tag
 * @param {object} imgObj - Image object
 * @param {object} imgObj.resized_targets
 * @param {object} imgObj.resized_targets.desktop
 * @param {object} imgObj.resized_targets.tablet
 * @param {object} imgObj.resized_targets.mobile
 * @param {string} imgObj.resized_targets.desktop.url
 * @param {string} imgObj.resized_targets.tablet.url
 * @param {string} imgObj.resized_targets.mobile.url
 * @return {string} srcSet
 */
export const getImageSrcSet = imgObj => {
  if (typeof imgObj !== 'object') {
    return ''
  }
  const desktopSrc = replaceStorageUrlPrefix(
    get(imgObj, 'resized_targets.desktop.url')
  )
  const tabletSrc = replaceStorageUrlPrefix(
    get(imgObj, 'resized_targets.tablet.url')
  )
  const mobileSrc = replaceStorageUrlPrefix(
    get(imgObj, 'resized_targets.mobile.url')
  )
  return `${mobileSrc} ${screenSize.smallScreenMinWidth}w, ${tabletSrc} ${screenSize.mediumScreenMinWidth}w, ${desktopSrc} ${screenSize.largeScreenMinWidth}w`
}
