import { connect } from 'react-redux'
import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'
import corePropTypes from '@twreporter/core/lib/constants/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const {
  createSingleBookmark,
  deleteSingleBookmark,
  getSingleBookmark,
} = twreporterRedux.actions

const reduxStatePropKeys = twreporterRedux.reduxStateFields

function getHostFromWindowLocation() {
  const defaultHost = 'https://www.twreporter.org'
  try {
    const { host, protocol } = window.location
    if (host && protocol) {
      return `${protocol}//${host}`
    } else {
      console.warn(
        'The host or protocol in `window.location` is not valid:',
        'window.location.protocol:',
        protocol,
        'window.location.host:',
        host,
        `Return default host '${defaultHost}' instead.`
      )
      return defaultHost
    }
  } catch (err) {
    console.warn(
      'Error on getting `host` and `protocol` from `window.location`:',
      err
    )
  }
}

class BookmarkWidget extends React.PureComponent {
  constructor(props) {
    super(props)
    this.addCurrentPageToBookmarks = this.addCurrentPageToBookmarks.bind(this)
    this.removeCurrentPageFromBookmarks = this.removeCurrentPageFromBookmarks.bind(
      this
    )
  }

  componentDidMount() {
    /* TODO: Implement `status` for bookmark widget in redux reducer and action:
      There should be different states below for the bookmark widget status of an article:
        unknown: It has not checked the bookmark status yet
        isChecking: The request to check was made but has not gotten the response yet
        bookmarked: The article is bookmarked
        notBookmarked: The article is not bookmarked
        invalid: There's an error or there's no valid authentication info
      The current code does not distinguish the `unknown`, `notBookmarked`, `isChecking`, and `invalid` situation.
      The best result is that we only send request to check bookmark when the status is `unknown`.
      But now we send request when there's no bookmark data for this component in the redux store when `componentDidMount`, no matter what's the reason of it.
     */
    const articleSlug = _.get(this.props, 'articleMeta.slug')
    if (articleSlug && typeof articleSlug === 'string') {
      const { isAuthed, toAutoCheck } = this.props
      if (isAuthed && toAutoCheck && !this.checkIfThisArticleBookmarked()) {
        const { jwt, userID, getSingleBookmark } = this.props
        getSingleBookmark(jwt, userID, articleSlug, getHostFromWindowLocation())
      }
    } else {
      console.error(
        '`this.props.articleMeta.slug` must be an unempty string, but is',
        articleSlug
      )
    }
  }

  redirectToLoginPageIfNotAuthorized() {
    const { isAuthed, jwt } = this.props
    if (!isAuthed || !jwt) {
      const currentHref =
        typeof window === 'undefined' ? '' : window.location.href
      window.location.href = getSignInHref(currentHref)
    }
  }

  addCurrentPageToBookmarks() {
    this.redirectToLoginPageIfNotAuthorized()
    const { jwt, userID, createSingleBookmark, articleMeta } = this.props
    const bookmarkToBeCreated = {
      ...articleMeta,
      host: getHostFromWindowLocation(),
    }
    return createSingleBookmark(jwt, userID, bookmarkToBeCreated)
  }

  removeCurrentPageFromBookmarks() {
    this.redirectToLoginPageIfNotAuthorized()
    const { jwt, userID, deleteSingleBookmark, bookmark } = this.props
    const bookmarkID = _.get(bookmark, 'id')
    if (bookmarkID) {
      deleteSingleBookmark(jwt, userID, bookmarkID)
    } else {
      console.error(
        'Error on deleting bookmark with `BookmarkWidget`: No valid bookmark id.'
      )
    }
  }

  checkIfThisArticleBookmarked() {
    const { bookmark } = this.props
    const isClient = typeof window !== 'undefined'
    if (bookmark && isClient) {
      const hostFromWindow = getHostFromWindowLocation()
      if (_.get(bookmark, 'host') !== hostFromWindow) {
        /* Only check the consistency of `host` when client-side rendering. */
        console.warn(
          'Warning on checking bookmark status in `BookmarkWidget`:',
          'The `host` in the bookmark data is diffrent from the `host` in current `window`.',
          'host in bookmark:',
          bookmark.host,
          'host in `window.location`:',
          hostFromWindow
        )
      }
    }
    return Boolean(bookmark)
  }

  render() {
    const { articleMeta } = this.props
    const { slug } = articleMeta

    if (!slug) {
      return null
    }

    const isBookmarked = this.checkIfThisArticleBookmarked()
    const { renderIcon } = this.props

    return typeof renderIcon === 'function'
      ? renderIcon(
          isBookmarked,
          this.addCurrentPageToBookmarks,
          this.removeCurrentPageFromBookmarks
        )
      : null
  }
}

BookmarkWidget.defaultProps = {
  articleMeta: {},
  bookmark: null,
  isAuthed: false,
  jwt: '',
  userID: NaN,
  toAutoCheck: true,
}

BookmarkWidget.propTypes = {
  articleMeta: corePropTypes.articleMetaForBookmark,
  // Props below are provided by redux
  bookmark: corePropTypes.bookmark,
  createSingleBookmark: PropTypes.func.isRequired,
  deleteSingleBookmark: PropTypes.func.isRequired,
  getSingleBookmark: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool,
  jwt: PropTypes.string,
  userID: PropTypes.number,
  renderIcon: PropTypes.func.isRequired,
  toAutoCheck: PropTypes.bool,
}

function mapStateToProps(state, ownProps) {
  const currentSlug = _.get(ownProps, 'articleMeta.slug')
  const jwt = _.get(state, [reduxStatePropKeys.auth, 'accessToken'])
  const userID = _.get(state, [reduxStatePropKeys.auth, 'userInfo', 'user_id'])
  const isAuthed = _.get(state, [reduxStatePropKeys.auth, 'isAuthed'])
  const bookmarkInStore = _.get(state, [
    reduxStatePropKeys.bookmarkWidget,
    'bookmark',
  ])
  const bookmarkForThisWidget =
    currentSlug && currentSlug === _.get(bookmarkInStore, 'slug')
      ? bookmarkInStore
      : null
  return {
    bookmark: bookmarkForThisWidget,
    isAuthed,
    jwt,
    userID,
  }
}

export default connect(
  mapStateToProps,
  { getSingleBookmark, createSingleBookmark, deleteSingleBookmark }
)(BookmarkWidget)
