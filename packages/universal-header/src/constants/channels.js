import { INFOGRAM_ID } from '@twreporter/core/lib/constants/infogram'

const channelKey = {
  latest: 'latest',
  topic: 'topic',
  category: 'category',
  opinion: 'opinion',
  column: 'column',
  humanStory: 'human-story',
  photography: 'photography',
  podcast: 'podcast',
  kidsReporter: 'kids-reporter',
  infographic: 'infographic',
}
export const CHANNEL_KEY = channelKey

export const CHANNEL_PATH = {
  [channelKey.latest]: '/categories/latest',
  [channelKey.topic]: '/topics',
  [channelKey.humanStory]: '/tags/xxx',
  [channelKey.photography]: '/photography',
  [channelKey.infographic]: `/tags/${INFOGRAM_ID}`,
}

export const CHANNEL_LABEL = {
  [channelKey.latest]: '最新',
  [channelKey.topic]: '深度專題',
  [channelKey.category]: '議題',
  [channelKey.opinion]: '評論',
  [channelKey.column]: '專欄',
  [channelKey.humanStory]: '人物故事',
  [channelKey.photography]: '攝影',
  [channelKey.podcast]: 'Podcast',
  [channelKey.kidsReporter]: 'Teens Reporter',
  [channelKey.infographic]: '數位敘事',
}

const channelLinkType = 'link'
const channelDropDownType = 'drop-down'

export const CHANNEL_LINK_TYPE = channelLinkType
export const CHANNEL_DROPDOWN_TYPE = channelDropDownType

export const CHANNEL_TYPE = {
  [channelKey.latest]: channelLinkType,
  [channelKey.topic]: channelLinkType,
  [channelKey.category]: channelDropDownType,
  [channelKey.opinion]: channelDropDownType,
  [channelKey.column]: channelLinkType,
  [channelKey.humanStory]: channelLinkType,
  [channelKey.photography]: channelLinkType,
  [channelKey.podcast]: channelDropDownType,
  [channelKey.kidsReporter]: channelLinkType,
  [channelKey.infographic]: channelLinkType,
}

export const CHANNEL_ORDER = [
  channelKey.latest,
  'divider',
  channelKey.topic,
  channelKey.category,
  channelKey.opinion,
  channelKey.humanStory,
  'divider',
  channelKey.photography,
  channelKey.podcast,
  channelKey.kidsReporter,
  channelKey.infographic,
  'divider',
]

export default {
  CHANNEL_LINK_TYPE,
  CHANNEL_DROPDOWN_TYPE,
  CHANNEL_PATH,
  CHANNEL_LABEL,
  CHANNEL_TYPE,
  CHANNEL_ORDER,
}
