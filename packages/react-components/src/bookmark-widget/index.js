import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// @twreporter
import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'
import corePropTypes from '@twreporter/core/lib/constants/prop-types'
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
  return defaultHost
}

const BookmarkWidget = ({ articleMeta, renderIcon, toAutoCheck = true }) => {
  const dispatch = useDispatch()
  const jwt = useSelector(state =>
    _.get(state, [reduxStatePropKeys.auth, 'accessToken'])
  )
  const userID = useSelector(state =>
    _.get(state, [reduxStatePropKeys.auth, 'userInfo', 'user_id'])
  )
  const isAuthed = useSelector(state =>
    _.get(state, [reduxStatePropKeys.auth, 'isAuthed'])
  )
  const bookmark = useSelector(state => {
    const bookmarkInStore = _.get(state, [
      reduxStatePropKeys.bookmarkWidget,
      'bookmark',
    ])
    const currentSlug = _.get(articleMeta, 'slug')
    return currentSlug && currentSlug === _.get(bookmarkInStore, 'slug')
      ? bookmarkInStore
      : null
  })

  const checkIfThisArticleBookmarked = () => {
    if (bookmark) {
      const hostFromWindow = getHostFromWindowLocation()
      if (_.get(bookmark, 'host') !== hostFromWindow) {
        console.warn(
          'Warning on checking bookmark status in `BookmarkWidget`:',
          'The `host` in the bookmark data is different from the `host` in current `window`.',
          'host in bookmark:',
          bookmark.host,
          'host in `window.location`:',
          hostFromWindow
        )
      }
    }
    return Boolean(bookmark)
  }

  useEffect(() => {
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
    const articleSlug = _.get(articleMeta, 'slug')
    if (articleSlug && typeof articleSlug === 'string') {
      if (isAuthed && toAutoCheck && !checkIfThisArticleBookmarked()) {
        dispatch(
          getSingleBookmark(
            jwt,
            userID,
            articleSlug,
            getHostFromWindowLocation()
          )
        )
      }
    } else {
      console.error(
        '`articleMeta.slug` must be a non-empty string, but is',
        articleSlug
      )
    }
  }, [])

  const redirectToLoginPageIfNotAuthorized = () => {
    if (!isAuthed || !jwt) {
      const currentHref =
        typeof window === 'undefined' ? '' : window.location.href
      window.location.href = getSignInHref(currentHref)
    }
  }

  const addCurrentPageToBookmarks = () => {
    redirectToLoginPageIfNotAuthorized()
    const bookmarkToBeCreated = {
      ...articleMeta,
      host: getHostFromWindowLocation(),
    }
    dispatch(createSingleBookmark(jwt, userID, bookmarkToBeCreated))
  }

  const removeCurrentPageFromBookmarks = () => {
    redirectToLoginPageIfNotAuthorized()
    const bookmarkID = _.get(bookmark, 'id')
    if (bookmarkID) {
      dispatch(deleteSingleBookmark(jwt, userID, bookmarkID))
    } else {
      console.error(
        'Error on deleting bookmark with `BookmarkWidget`: No valid bookmark id.'
      )
    }
  }

  if (!articleMeta.slug) {
    return null
  }

  const isBookmarked = checkIfThisArticleBookmarked()

  return typeof renderIcon === 'function'
    ? renderIcon(
        isBookmarked,
        addCurrentPageToBookmarks,
        removeCurrentPageFromBookmarks
      )
    : null
}

BookmarkWidget.propTypes = {
  articleMeta: corePropTypes.articleMetaForBookmark.isRequired,
  renderIcon: PropTypes.func.isRequired,
  toAutoCheck: PropTypes.bool,
}

export default BookmarkWidget
