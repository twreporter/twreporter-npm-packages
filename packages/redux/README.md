[![Tag](https://img.shields.io/github/tag/twreporter/twreporter-redux.svg)](https://github.com/twreporter/twreporter-redux/tags)
[![NPM version](https://img.shields.io/npm/v/@twreporter/redux.svg)](https://www.npmjs.com/package/@twreporter/redux)

# twreporter-redux

Redux actions and reducers for [twreporter website](https://www.twreporter.org).

## Usage

```js
// src/client.js
/* global __DEVELOPMENT__ */
import React from 'react'
import ReactDOM from 'react-dom'
import twreporterRedux from '@twreporter/redux'

import StoreProvider = twreporterRedux.StoreProvider

const ssrReduxState = window.__REDUX_STATE__ || {}

twreporterRedux.createStore(ssrReduxState, null, __DEVELOPMENT__)
  .then(store => {
    const jsx = (
      <StoreProvider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={scrollToTopAndFirePageview} />
            <App releaseBranch={releaseBranch}/>
          </React.Fragment>
        </BrowserRouter>
      </StoreProvider>
    )
    if (__DEVELOPMENT__) {
      ReactDOM.render(jsx, document.getElementById('root'))
    } else {
      ReactDOM.hydrate(jsx, document.getElementById('root'))
    }
  })
```

```js
// src/containers/article.js
import Article from '@twreporter/react-article-components'
import PropTypes from 'prop-types'
import React from 'react'
import twreporterRedux from '@twreporter/redux'

const ReduxStoreContext = twreporterRedux.ReduxStoreContext

class ArticleContainer extends React.Component {
  static contextType = ReduxStoreContext
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape(
        slug: PropTypes.string.isRequired,
      )
    })
  }
  componentDidMount() {
    const { store } = this.context
    const slug = _.get(this.props, 'match.params.slug')
    store.actions.fetchAFullPost(slug)
  }
  render() {
    const { store } = this.context
    const { entities, selectedPost } = store.getState()
    const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})
    return (
      <Article post={post}/>
    )
  }
}
```

```js
// src/data-loaders/article.js
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get,
}

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `a/:slug` page.
 *
 *  @param {Object} match - `match` object of `react-router`
 *  @param {Object} match.params - key/value pairs parsed from the URL corresponding to the dynamic segments of the path
 *  @param {string} match.params.slug - dynamic path segment
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves with loading successfully or rejects with error
 */
export default function loadData({ match, store }) {
  const slug = _.get(match, 'params.slug')
  return store.dispatch(store.actions.fetchAFullPost(slug)).then(() => {
    const state = store.getState()
    const selectedPost = _.get(
      state,
      twreporterRedux.reduxStateFields.selectedPost,
      {}
    )
    if (_.get(selectedPost, 'error')) {
      return Promise.reject(_.get(selectedPost, 'error'))
    }
    return Promise.resolve()
  })
}
```

## State

For redux state data structure, we can check `src/typedef.js` for more information.
