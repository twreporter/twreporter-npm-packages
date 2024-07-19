import Leadings from '../components/leading'
import get from 'lodash/get'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

const _ = {
  get,
}

/**
 *  @module LayoutManager
 *  @exports
 */
export default class LayoutManager {
  /**
   *  @param {module:Article:PostObject} post
   *  @param {module:Article:TopicObject} relatedTopic
   *  @return {undefined}
   */
  constructor(post, relatedTopic, theme) {
    this.post = post
    this.relatedTopic = relatedTopic
    this.theme = theme
  }

  /**
   *  @returns {string} - href of topic
   */
  getTopicHref() {
    const slug = _.get(this.relatedTopic, 'slug')
    if (slug) {
      return `/topics/${slug}`
    }
    return ''
  }

  /**
   *  @returns {Function} - React component
   */
  getLeadingComponent() {
    if (this.theme === ARTICLE_THEME.v2.pink) {
      return Leadings.Pink
    }

    switch (_.get(this.post, 'hero_image_size')) {
      case 'extend':
        return Leadings.Extend
      case 'small':
        return Leadings.Small
      case 'fullscreen':
        return Leadings.Fullscreen
      case 'normal':
      default: {
        return Leadings.Normal
      }
    }
  }

  /**
   *  Props of Leading Compoent
   *  @typedef LeadingProps
   *  @property {string} title - Post title
   *  @property {string} subtitle - Post subtitle
   *  @property {string} topicHref - href of topic
   *  @property {string} shortTitle - short title of topic
   *  @property {bool} isTopicPublished - topic is published or not
   *  @property {string} figureCaption - Description of leading image
   *  @property {module:Article:ResizedTargets} poster - A set of images
   *  @property {module:Article:ResizedTargets} portraitPoster - A set of images
   */

  /**
   *  @returns {LeadingProps} - Props of leading React component
   */
  getLeadingComponentProps() {
    const post = this.post
    const relatedTopic = this.relatedTopic

    // TODO
    // In the future,
    // if `LeadingComponent = this.getLeadingComponent()` receive different props,
    // add switch case here to provide props on demand
    return {
      title: _.get(post, 'title'),
      subtitle: _.get(post, 'subtitle'),
      topicHref: this.getTopicHref(),
      shortTitle: _.get(relatedTopic, 'short_title', ''),
      isTopicPublished: _.get(relatedTopic, 'state', '') === 'published',
      figureCaption: _.get(post, 'leading_image_description', ''),
      poster: {
        tiny: _.get(post, 'hero_image.resized_targets.tiny'),
        mobile: _.get(post, 'hero_image.resized_targets.mobile'),
        tablet: _.get(post, 'hero_image.resized_targets.tablet'),
        desktop: _.get(post, 'hero_image.resized_targets.desktop'),
      },
      portraitPoster: {
        tiny: _.get(post, 'leading_image_portrait.resized_targets.tiny'),
        mobile: _.get(post, 'leading_image_portrait.resized_targets.mobile'),
      },
    }
  }
}
