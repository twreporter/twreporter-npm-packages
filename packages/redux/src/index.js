import { denormalizePosts, denormalizeTopics } from './utils/denormalize-asset'
import { formURL } from './utils/url'
import { post, posts } from './reducers/posts'
import { topic, topics } from './reducers/topics'
import actionTypes from './constants/action-types'
import actions from './actions'
import auth from './reducers/auth'
import createStore from './store/create-store'
import entities from './reducers/entities'
import indexPage from './reducers/index-page'
import origins from './reducers/origins'
import pagination from './utils/pagination'
import reduxStateFields from './constants/redux-state-field-names'
import ReduxStoreContext from './context/redux-store'
import ReduxStoreProvider from './component/provider'

export default {
  actions,
  actionTypes,
  createStore,
  reducers: {
    auth,
    entities,
    indexPage,
    origins,
    post,
    posts,
    topic,
    topics,
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
}
