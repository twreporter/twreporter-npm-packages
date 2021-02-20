import types from '../../../../src/constants/action-types'
import {
  mockActions as authorArticles,
  FETCH_FIRST_AUTHOR_SEC_TIMES,
  FETCH_SEC_AUTHOR_COLLECTION_SUCCESS,
} from './author-articles'
import {
  normalizedMockAuthors,
  normalizedMockMoreAuthors,
  FETCH_MORE_AUTHORS_SUCCESS,
  mockActionsSet as authors,
  normalizedSingleAuthorHit,
} from './authors'
// lodash
import merge from 'lodash/merge'

const _ = { merge }

const fetchSameAuthorSecondTimeSuccessAction = {
  type: types.FETCH_AUTHOR_COLLECTION_SUCCESS,
  ...FETCH_FIRST_AUTHOR_SEC_TIMES,
}

const fetchDifferentAuthorSuccessAction = {
  type: types.FETCH_AUTHOR_COLLECTION_SUCCESS,
  ...FETCH_SEC_AUTHOR_COLLECTION_SUCCESS,
}

const fetchMoreAuthorsSuccessAction = {
  type: types.LIST_ALL_AUTHORS_SUCCESS,
  ...FETCH_MORE_AUTHORS_SUCCESS,
}

export const mockActions = {
  ...authorArticles,
  ...authors,
  fetchSameAuthorCollectionTwiceSuccess: _.merge(
    {},
    authorArticles.FETCH_AUTHOR_COLLECTION_SUCCESS,
    fetchSameAuthorSecondTimeSuccessAction
  ),
  fetchDifferentAuthorCollectionSameArticlesSuccess: _.merge(
    {},
    authorArticles.FETCH_AUTHOR_COLLECTION_SUCCESS,
    fetchDifferentAuthorSuccessAction
  ),
  fetchMoreAuthors: _.merge(
    {},
    authors.LIST_ALL_AUTHORS_SUCCESS,
    fetchMoreAuthorsSuccessAction
  ),
}

export const mockStates = {
  InitialState: {},

  PrevState: {
    articles: {},
    authors: {},
  },

  ExpectedStateSuccessWithFetchArthorCollection: {
    articles: { articleId1: {}, articleId2: {}, articleId3: {} },
    authors: { authorId1: {}, authorId2: {}, authorId3: {} },
  },

  ExpectedStateSuccessWithFetchArthorCollectionsMore: {
    articles: {
      articleId1: {},
      articleId2: {},
      articleId3: {},
      articleId4: {},
      articleId5: {},
      articleId6: {},
    },
    authors: { authorId1: {}, authorId2: {}, authorId3: {} },
  },

  ExpectedStateSuccessWithFetchAuthors: {
    ...normalizedMockAuthors.entities,
  },

  ExpectedStateSuccessWithFetchMoreAuthors: {
    ..._.merge(
      {},
      normalizedMockAuthors.entities,
      normalizedMockMoreAuthors.entities
    ),
  },

  ExpectedStateSuccessWithSearchSpecificAuthor: {
    ...normalizedSingleAuthorHit.entities,
  },

  ExpectedStateSuccessWithSpecificAuthorAppended: {
    ..._.merge(
      {},
      normalizedMockAuthors.entities,
      normalizedSingleAuthorHit.entities
    ),
  },
}
