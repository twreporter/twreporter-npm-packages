import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { post, posts } from './posts'
import { searchedAuthorsList, authorsList } from './authors'
import { topic, topics } from './topics'
import authReducer from './auth'
import bookmarks from './bookmarks'
import bookmarkWidget from './bookmark-widget'
import entities from './entities'
import indexPage from './index-page'
import origins from './origins'
import reduxStatePropKey from '../constants/redux-state-field-names'
import relatedPostsOf from './related-posts-of'
import settings from './settings'
import types from '../constants/action-types'
// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

/**
 *  @param {import(../typedef).ReduxState} reduxState
 */
const rootReducer = combineReducers({
  [reduxStatePropKey.articlesByAuthor]: articlesByAuthor,
  [reduxStatePropKey.auth]: authReducer,
  [reduxStatePropKey.authorsList]: authorsList,
  [reduxStatePropKey.bookmarks]: bookmarks,
  [reduxStatePropKey.bookmarkWidget]: bookmarkWidget,
  [reduxStatePropKey.entities]: entities,
  [reduxStatePropKey.indexPage]: indexPage,
  [reduxStatePropKey.lists]: posts,
  [reduxStatePropKey.searchedAuthorsList]: searchedAuthorsList,
  [reduxStatePropKey.selectedPost]: post,
  [reduxStatePropKey.selectedTopic]: topic,
  [reduxStatePropKey.topicList]: topics,
  [reduxStatePropKey.relatedPostsOf]: relatedPostsOf,

  [reduxStatePropKey.entitiesForAuthors]: (state = {}, action) => {
    const entities = _.get(action, 'payload.normalizedData.entities')
    if (entities) {
      // WORKAROUND:
      // When the data of an author is updated, we have not build the function to synchronize the author data saved in old post records on Algolia.
      // So the author data in post records that already existed will be outdated.
      // The temporarily solution is that we do not update authors in entities when fetching articles of an author.
      if (action.type === types.FETCH_AUTHOR_COLLECTION_SUCCESS) {
        return _.merge({}, state, { articles: entities.articles })
      }
      return _.merge({}, state, entities)
    }
    return state
  },
  [reduxStatePropKey.nextNotifyPopupTS]: (state = 0, action) => {
    if (action.type === types.SET_NEXT_POPUP_TIME_STAMP) {
      return action.payload
    }
    return state
  },
  [reduxStatePropKey.origins]: origins,
  [reduxStatePropKey.settings]: settings,
})

export default rootReducer
