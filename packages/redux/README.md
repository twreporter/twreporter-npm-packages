[![Tag](https://img.shields.io/github/tag/twreporter/twreporter-redux.svg)](https://github.com/twreporter/twreporter-redux/tags)
[![NPM version](https://img.shields.io/npm/v/@twreporter/redux.svg)](https://www.npmjs.com/package/@twreporter/redux)

# twreporter-redux

Redux actions and reducers for [twreporter website](https://www.twreporter.org).

## Development

```
CUSTOMER_FOLDER=../entry_project/ npm run dev

// Assume your entry project is located at /home/nickli/entry_project.
// In the entry_project, you install @twreporter/redux,
// all the @twreporter/redux codes will be at /home/nickli/entry_project/@twreporter/redux.
// npm run dev will copy @twreporter/redux transpiled es5 javascript codes to your custom folder, that is entry_project.
```

## Build

`npm run build`

## Publish

`npm publish`

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

The redux state will be like the following example.

If you use this library,
please make sure the field name of your redux state should match the [field name we define](https://github.com/nickhsine/twreporter-redux/blob/master/src/constants/redux-state-field-names.js).

```js
{
  index_page: {
    latest_section: [],
    editor_picks_section: [],
    latest_topic_section: [],
    reviews_section: [],
    opics_section: [],
    photos_section: [],
    infographics_section: [],
  },
  // full topics and posts will be stored here
  entities: {
    posts: {},
    topics: {},
  },
  lists: {
    // list might be any group of posts
    listID1: {
      total: 10,
      // there will be only slugs in items
      items: ['slug-1', 'slug-2', 'slug-4'],
      error: null,

      // pages is used to store items position,
      // say, if
      // pages = {
      //  1: [0, 2]
      // }
      // which means, items of page 1 are stored
      // from items[0] to items[2]
      pages: {
        1: [0, 3],
      }
    },
    listID2: {
      total: 15,
      // there will be only slugs in items
      items: [],
      error: null,
      pages: {},
    }
  },
  // list topics we already get
  topic_list: {
    total: 10,
    // only store topic slug
    items: [],
    totalPages: 1,

    // current page
    page: 1,

    // number per page
    nPerPage: 10,
    error: null,
    isFetching: false,
  },
  // current post we want to show in article page
  selected_post: {
    isFetching: true,
    slug: 'post-slug',
    error: null
  },
  // current topic we want to show in topic landing page
  selected_topic: {
    isFetching: true,
    slug: 'topic-slug',
    error: null
  }
}
```

## Actions

### index-page

Fetch all posts and topics [index page](https://www.twreporter.org) needed.

### posts

- Fetch a full post, which will include details, other than metadata, like what topic it belongs to,
  or what other posts it is releated to.
- Fetch a list of posts, which will only include the metadata(like slug, title, description, published data ...etc) of posts.

### topics

- Fetch a full topic, which will include all the posts belonging to it.
- Fetch a list of topics, which will only include the metadata(like slug, title, description, published data ...etc) of topics.

## reducers

### index-page

`reduxState.indexPage` will contain each sections(like editor_picks, review, latest ...etc) in the [homepage of twreporter](https://www.twreporter.org)

### posts

`reduxState.post` will store `slug`, `error` and `isFetching`

`reduxState.posts` will store `items`, `error`and `total`

### topics

`reduxState.topic` will store `slug`, `error` and `isFetching`

`reduxState.topics` will store `items`, `totalPages`, `page`, `nPerPage`, `error` and `isFetching`

### entities

`reduxState.entities.posts` will store ${POST_SLUG}: ${POST_DATA} (string: Object) pair in a map

`reduxState.entities.topics` will store ${TOPIC_SLUG}: ${TOPIC_DATA} {string: Object} pair in a map
