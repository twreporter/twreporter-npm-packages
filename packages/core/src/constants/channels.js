import entityPath from './entitiy-path'

export const order = [
  'review',
  'topics',
  'photography',
  'infographic',
  'categories',
]

export const configs = {
  review: {
    text: '評論',
    type: 'link',
    prefix: entityPath.categories,
    path: 'reviews',
  },
  topics: {
    text: '專題',
    type: 'link',
    prefix: '/',
    path: 'topics',
  },
  photography: {
    text: '攝影',
    type: 'link',
    prefix: '/',
    path: 'photography',
  },
  infographic: {
    text: '多媒體',
    type: 'link',
    prefix: entityPath.categories,
    path: 'infographic',
  },
  categories: {
    text: '議題',
    type: 'submenu',
    prefix: '/',
    path: '?section=categories',
  },
  hiring: {
    text: '徵才中',
    type: 'link',
    prefix: '/a/',
    path: 'hiring-job-description',
    styles: {
      color: '#c71b0a',
    },
  },
}
