import { author as authorSchema } from '../../../schemas/article-schema'
import { camelizeKeys } from 'humps'
import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../../constants/authors-list'
import { schema, normalize } from 'normalizr'
import types from '../../../constants/action-types'

export const MOCK_KEYWORDS = 'mock keyworkds'
const CURRENT_DATE = Date.now()
const ERROR_MSG = new Error('mock search authors failure')

function theNormalize(records) {
  const camelizedJson = camelizeKeys(records)
  return normalize(camelizedJson, new schema.Array(authorSchema))
}

function generateMockAuthors(authors) {
  if (Array.isArray(authors)) {
    return authors.map(function(v) {
      return {
        id: `id_${v}`,
        email: `contact_${v}@twreporter.org`,
        job_title: `job_${v}`,
        bio: 'hello world',
        name: `name_${v}`,
        thumbnail: {
          id: `image_id_${v}`,
          description: `some descriptions for ${v}`,
          filetype: 'image/jpeg',
          resized_targets: {},
        },
        updated_at: '2021-01-27T12:00:00Z',
      }
    })
  }
  return authors
}

const mockAuthors = generateMockAuthors(['1', '2', '3', '4', '5'])
const mockMoreAuthors = generateMockAuthors(['6', '7', '8', '9', '10'])

const singleAuthorHit = [
  {
    id: `id_single`,
    email: `contact_single@twreporter.org`,
    job_title: `job_single`,
    bio: 'hello world',
    name: `name_single`,
    thumbnail: {
      id: `image_id_single`,
      description: `some descriptions for id_single`,
      filetype: 'image/jpeg',
      resized_targets: {},
    },
    updated_at: '2021-01-27T12:00:00Z',
  },
]

export const normalizedMockAuthors = theNormalize(mockAuthors)
export const normalizedMockMoreAuthors = theNormalize(mockMoreAuthors)
export const normalizedSingleAuthorHit = theNormalize(singleAuthorHit)

export const FETCH_MORE_AUTHORS_SUCCESS = {
  payload: {
    keywords: '',
    normalizedData: normalizedMockMoreAuthors,
    totalPages: 8,
    currentPage: 0,
    receivedAt: CURRENT_DATE,
  },
}
export const mockActionsSet = {
  [types.SEARCH_AUTHORS_REQUEST]: {
    type: types.SEARCH_AUTHORS_REQUEST,
    payload: {
      keywords: MOCK_KEYWORDS,
    },
  },

  [types.SEARCH_AUTHORS_SUCCESS]: {
    type: types.SEARCH_AUTHORS_SUCCESS,
    payload: {
      keywords: MOCK_KEYWORDS,
      normalizedData: normalizedSingleAuthorHit,
      totalPages: 1,
      currentPage: 0,
      receivedAt: CURRENT_DATE,
    },
  },

  [types.SEARCH_AUTHORS_FAILURE]: {
    type: types.SEARCH_AUTHORS_FAILURE,
    payload: {
      error: ERROR_MSG,
      failedAt: CURRENT_DATE,
    },
  },

  [types.LIST_ALL_AUTHORS_REQUEST]: {
    type: types.LIST_ALL_AUTHORS_REQUEST,
    payload: {
      keywords: '',
    },
  },

  [types.LIST_ALL_AUTHORS_SUCCESS]: {
    type: types.LIST_ALL_AUTHORS_SUCCESS,
    payload: {
      keywords: '',
      normalizedData: normalizedMockAuthors,
      totalPages: 8,
      currentPage: 0,
      receivedAt: CURRENT_DATE,
    },
  },

  [types.LIST_ALL_AUTHORS_FAILURE]: {
    type: types.LIST_ALL_AUTHORS_FAILURE,
    payload: {
      error: ERROR_MSG,
      failedAt: CURRENT_DATE,
    },
  },
}

// whole authors list
export const mockStatesSet = {
  initialState: {
    isFetching: false,
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    hasMore: false,
    items: [],
    error: null,
    lastUpdated: 0,
  },

  expStateSucwithInit: {
    currentPage: 0,
    error: null,
    hasMore: true,
    isFetching: false,
    items: ['id_1', 'id_2', 'id_3', 'id_4', 'id_5'],
    lastUpdated: CURRENT_DATE,
  },

  expStateSucwithPre: {
    currentPage: 0,
    error: null,
    hasMore: true,
    isFetching: false,
    items: [
      'id_1',
      'id_2',
      'id_3',
      'id_4',
      'id_5',
      'id_1',
      'id_2',
      'id_3',
      'id_4',
      'id_5',
    ],
    lastUpdated: CURRENT_DATE,
  },

  expStateFailwithInit: {
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    isFetching: false,
    hasMore: false,
    items: [],
    error: ERROR_MSG,
    lastUpdated: CURRENT_DATE,
  },

  expStateFailwithPre: {
    currentPage: 0,
    isFetching: false,
    hasMore: true,
    items: ['id_1', 'id_2', 'id_3', 'id_4', 'id_5'],
    error: ERROR_MSG,
    lastUpdated: CURRENT_DATE,
  },
}

// search specific author
export const searchedMockStatesSet = {
  initialState: {
    keywords: '',
    isFetching: false,
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    items: [],
    error: null,
    lastUpdated: 0,
  },

  expStateSuc: {
    keywords: MOCK_KEYWORDS,
    isFetching: false,
    currentPage: 0,
    error: null,
    items: ['id_single'],
    lastUpdated: CURRENT_DATE,
  },

  expStateFail: {
    keywords: '',
    isFetching: false,
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    error: ERROR_MSG,
    items: [],
    lastUpdated: CURRENT_DATE,
  },
}
