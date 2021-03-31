import { schema, normalize } from 'normalizr'
import { article as articleSchema } from '../../../schemas/article-schema'
import { camelizeKeys } from 'humps'

const authorId = 'theAurhtorId'
const writers = ['1', '2', '3'].map(v => {
  return {
    id: 'theWriterId' + v,
    bio: {},
    email: 'writer' + v + '@twreporter.org',
    name: 'name of writer ' + v,
  }
})

const author = {
  id: authorId,
  bio: {},
  email: 'photographer@twreporter.org',
  name: 'name of photographer',
}

const records = [
  {
    designers: [],
    engineers: [],
    writters: [writers[0]],
    photographers: [author],
    title: 'article title 1',
    style: 'review',
    slug: 'slug 1',
    id: 'article id 1',
  },
  {
    designers: [],
    engineers: [],
    writters: [writers[1]],
    photographers: [author],
    title: 'article title 2',
    style: 'article',
    slug: 'slug 2',
    id: 'article id 2',
  },
  {
    designers: [],
    engineers: [],
    writters: [writers[2]],
    photographers: [author],
    title: 'article title 3',
    style: 'review',
    slug: 'slug 3',
    id: 'article id 3',
  },
  {
    designers: [],
    engineers: [],
    writters: [writers[2]],
    photographers: [author],
    title: 'article title 4',
    style: 'article',
    slug: 'slug 4',
    id: 'article id 4',
  },
  {
    designers: [],
    engineers: [],
    writters: [writers[2]],
    photographers: [author],
    title: 'article title 5',
    style: 'photography',
    slug: 'slug 5',
    id: 'article id 5',
  },
]

export const mockResponse = {
  status: 'success',
  data: {
    meta: {
      offset: 0,
      limit: 5,
      total: 145,
    },
    records,
  },
}

// mock properties of action after normalize
const camelizedJson = camelizeKeys(mockResponse.data.records)
export const items = normalize(camelizedJson, new schema.Array(articleSchema))
