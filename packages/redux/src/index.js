import { denormalizePosts, denormalizeTopics } from './utils/denormalize-asset'
import { formURL } from './utils/url'
import actionTypes from './constants/action-types'
import createStore from './store/create-store'
import pagination from './utils/pagination'
import reduxStateFields from './constants/redux-state-field-names'
import { LATEST_LIST_ID } from './constants/latest'
import ReduxStoreContext from './context/redux-store'
import ReduxStoreProvider from './component/provider'

// actions
import actions from './actions'

// reducers
import auth from './reducers/auth'
import entities from './reducers/entities'
import featureTopic from './reducers/feature-topic'
import indexPage from './reducers/index-page'
import origins from './reducers/origins'
import relatedPostsOf from './reducers/related-posts-of'
import { post, posts } from './reducers/posts'
import { topic, topics } from './reducers/topics'
import user from './reducers/user'

export default {
  actions,
  actionTypes,
  createStore,
  reducers: {
    auth,
    entities,
    featureTopic,
    indexPage,
    origins,
    post,
    posts,
    relatedPostsOf,
    topic,
    topics,
    user,
  },
  reduxStateFields,
  ReduxStoreContext,
  ReduxStoreProvider,
  utils: {
    denormalizePosts,
    denormalizeTopics,
    formURL,
    pagination,
  },
  LATEST_LIST_ID,
}
