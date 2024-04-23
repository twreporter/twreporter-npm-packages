import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { post, posts } from './posts'
import { searchedAuthorsList, authorsList } from './authors'
import { topic, topics } from './topics'
import authReducer from './auth'
import bookmarkWidget from './bookmark-widget'
import bookmarks from './bookmarks'
import entities from './entities'
import entitiesForAuthors from './entities-for-authors'
import featureTopic from './feature-topic'
import indexPage from './index-page'
import origins from './origins'
import reduxStatePropKey from '../constants/redux-state-field-names'
import relatedPostsOf from './related-posts-of'
import settings from './settings'
import latest from './latest'
import user from './user'
import analytics from './analytics'
import footprints from './footprints'
import donationHistory from './donation-history'

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
  [reduxStatePropKey.featureTopic]: featureTopic,
  [reduxStatePropKey.entitiesForAuthors]: entitiesForAuthors,
  [reduxStatePropKey.origins]: origins,
  [reduxStatePropKey.settings]: settings,
  [reduxStatePropKey.latest]: latest,
  [reduxStatePropKey.user]: user,
  [reduxStatePropKey.analytics]: analytics,
  [reduxStatePropKey.footprints]: footprints,
  [reduxStatePropKey.donationHistory]: donationHistory,
})

export default rootReducer
