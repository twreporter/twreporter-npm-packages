import LayoutManager from './layout-manager'
import ThemeManager from './theme-manager'
import get from 'lodash/get'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

const _ = {
  get,
}

const _heroImageSize = {
  normal: 'normal',
  fullscreen: 'fullscreen',
  extend: 'extend',
}

/**
 *  @module UIManager
 *  @exports
 */
export default class UIManager {
  /**
   *  @param {module:Article:PostObject} post
   *  @param {module:Article:TopicObject} relatedTopic
   *  @return {undefined}
   */
  constructor(post, relatedTopic) {
    this.post = post || {}
    this.relatedTopic = relatedTopic || {}

    this.layoutManager = new LayoutManager(
      this.post,
      this.relatedTopic,
      this.getTheme()
    )
    this.themeManager = new ThemeManager(this.getTheme())
  }

  /**
   *  @returns {string} - Size of leading image
   */
  getLeadingImageSize() {
    return _.get(this.post, 'hero_image_size', _heroImageSize.normal)
  }

  /**
   *  @returns {string} - Style of post
   */
  getTheme() {
    return _.get(this.post, 'style', ARTICLE_THEME.v2.default)
  }

  /**
   *  @returns {Object} - Instance of `LayoutManager`
   */
  getLayoutManager() {
    return this.layoutManager
  }

  /**
   *  @returns {Object} - Instance of `ThemeManager`
   */
  getThemeManager() {
    return this.themeManager
  }

  /**
   *  @returns {module:ThemeManager:ThemeColors} - A set of colors
   */
  getThemeColors() {
    return this.getThemeManager().getColors()
  }

  /**
   *  @returns {Function} - React component
   */
  getLeadingComponent() {
    return this.getLayoutManager().getLeadingComponent()
  }

  /**
   *  @returns {Object} - props of leading React component
   */
  getLeadingComponentProps() {
    return this.getLayoutManager().getLeadingComponentProps()
  }

  toRenderSeparationLineBetweenLeadingAndBody() {
    if (
      this.getTheme() === ARTICLE_THEME.v2.default &&
      this.getLeadingImageSize() !== _heroImageSize.fullscreen &&
      this.getLeadingImageSize() !== _heroImageSize.extend
    ) {
      return true
    }
    return false
  }
}
