import { schema, normalize } from 'normalizr'
import { author as authorSchema } from '../../../schemas/article-schema'
import { camelizeKeys } from 'humps'
import {
  NUMBER_OF_FIRST_RESPONSE_PAGE,
  MAX_RESULTS_PER_FETCH,
} from '../../../constants/authors-list'
import fieldNames from '../../../constants/redux-state-field-names'

export const currentDate = Date.now()
export const constKeywords = 'testKeywords'

const mockResponseData = ['1', '2', '3', '4', '5'].map(function(v) {
  return {
    id: `id_${v}`,
    email: `contact_${v}@twreporter.org`,
    job_title: `job_${v}`,
    bio: 'hello world',
    name: `name_${v}`,
    thumbnail: 'mock thumbnails',
    updated_at: '2021-01-27T12:00:00Z',
  }
})

const filteredMockResponseData = mockResponseData.filter(function(item) {
  return item.name === 'name_5'
})

// this is for fetch request
export const responseObjSet = {
  keyNullResponse: {
    status: 'success',
    data: {
      meta: {
        offset: 0,
        limit: 24,
        total: mockResponseData.length,
      },
      records: mockResponseData,
    },
  },
  keyWithVlaueResponse: {
    status: 'success',
    data: {
      meta: {
        offset: 0,
        limit: 24,
        total: filteredMockResponseData.length,
      },
      records: filteredMockResponseData,
    },
  },
}

// this is for property of action which is response
export const mockResponseSet = {
  keyNullResponse: {
    normalizedData: normalize(
      camelizeKeys(mockResponseData),
      new schema.Array(authorSchema)
    ),
    totalPages: 1,
    currentPage: 0,
  },

  keyWithValueResponse: {
    normalizedData: normalize(
      camelizeKeys(filteredMockResponseData),
      new schema.Array(authorSchema)
    ),
    totalPages: 1,
    currentPage: 0,
  },
}

export const mockDefaultStates = {
  initialState: {
    authorsList: {
      isFetching: false,
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
      hasMore: false,
      items: [],
      error: null,
      lastUpdated: 0,
    },
    [fieldNames.origins]: {
      api: 'http://localhost:8080',
    },
  },
  afterFirstPageState: {
    authorsList: {
      isFetching: false,
      currentPage: 0,
      hasMore: true,
      items: [],
      error: null,
      lastUpdated: currentDate,
    },
    [fieldNames.origins]: {
      api: 'http://localhost:8080',
    },
  },

  gotNothing: {
    authorsList: {
      isFetching: false,
      currentPage: 10,
      hasMore: false,
      items: [],
      error: null,
      lastUpdated: currentDate,
    },
    [fieldNames.origins]: {
      api: 'http://localhost:8080',
    },
  },

  hasNoPreviousKeywords: {
    searchedAuthorsList: {
      keywords: '',
      isFetching: false,
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
      items: [],
      error: null,
      lastUpdated: 0,
    },
    [fieldNames.origins]: {
      api: 'http://localhost:8080',
    },
  },

  hasPreviousKeywords: {
    searchedAuthorsList: {
      keywords: constKeywords,
      isFetching: false,
      currentPage: 0,
      items: [],
      error: null,
      lastUpdated: currentDate,
    },
    [fieldNames.origins]: {
      api: 'http://localhost:8080',
    },
  },
}

export const mockSearchParasSet = {
  keyNullSearchParas: {
    keywords: '',
    offset: 0,
    limit: MAX_RESULTS_PER_FETCH,
  },

  keyWithValueParas: {
    keywords: constKeywords,
    offset: 0,
    limit: MAX_RESULTS_PER_FETCH,
  },
}
