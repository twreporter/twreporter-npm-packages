// @twreporters
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

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

const { createSingleBookmark, deleteSingleBookmark } = twreporterRedux.actions
/**
 * hook for create or delete bookmark
 * @param {Array.<{state: object, dispatch: Function}>} store
 * @param {object} bookmark
 * @param {string} bookmark.slug
 * @param {boolean} bookmark.is_external
 * @param {string} bookmark.title
 * @param {string} bookmark.desc
 * @param {string} bookmark.thumbnail
 * @param {string} bookmark.published_date
 */
const useBookmark = (store, bookmark) => {
  const [state, dispatch] = store
  const jwt = _.get(state, 'auth.accessToken')
  const userID = _.get(state, 'auth.userInfo.user_id')

  const addCurrentPageToBookmarks = () => {
    const bookmarkToBeCreated = {
      ...bookmark,
      host: getHostFromWindowLocation(),
    }
    return dispatch(createSingleBookmark(jwt, userID, bookmarkToBeCreated))
  }

  const removeCurrentPageFromBookmarks = bookmarkID => {
    if (bookmarkID) {
      return dispatch(deleteSingleBookmark(jwt, userID, bookmarkID))
    } else {
      throw new Error('Error on deleting bookmark: No valid bookmark id.')
    }
  }

  return {
    addAction: addCurrentPageToBookmarks,
    removeAction: removeCurrentPageFromBookmarks,
  }
}

export default useBookmark
