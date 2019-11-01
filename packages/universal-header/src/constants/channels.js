export const channelKeys = {
  reviews: 'reviews',
  topics: 'topics',
  photography: 'photography',
  infographic: 'infographic',
  categories: 'categories',
}

export const channelPathnames = {
  [channelKeys.reviews]: '/categories/reviews',
  [channelKeys.topics]: '/topics',
  [channelKeys.photography]: '/photography',
  [channelKeys.infographic]: '/categories/infographic',
  [channelKeys.categories]: '/#categories',
}

export const channelLabels = {
  [channelKeys.reviews]: '評論',
  [channelKeys.topics]: '專題',
  [channelKeys.photography]: '攝影',
  [channelKeys.infographic]: '多媒體',
  [channelKeys.categories]: '議題',
}

export const channelOrder = [
  channelKeys.reviews,
  channelKeys.topics,
  channelKeys.photography,
  channelKeys.infographic,
  channelKeys.categories,
]

export const channelLinkType = 'link'
export const channelDropDownType = 'drop-down'

export const channelTypes = {
  [channelKeys.reviews]: channelLinkType,
  [channelKeys.topics]: channelLinkType,
  [channelKeys.photography]: channelLinkType,
  [channelKeys.infographic]: channelLinkType,
  [channelKeys.categories]: channelDropDownType,
}

export default {
  channelDropDownType,
  channelKeys,
  channelLinkType,
  channelLabels,
  channelOrder,
  channelPathnames,
  channelTypes,
}
