import { connect } from 'react-redux'
import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'
import BookmarkAddedIconDesktop from './assets/added-bookmark-desktop.svg'
import BookmarkAddedIconMobile from './assets/added-bookmark-mobile.svg'
import BookmarkUnaddedIconDesktop from './assets/add-bookmark-desktop.svg'
import BookmarkUnaddedIconMobile from './assets/add-bookmark-mobile.svg'
import corePropTypes from '@twreporter/core/lib/constants/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import reduxStatePropKeys from '@twreporter/core/lib/constants/redux-state-prop-keys'
import styled from 'styled-components'
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

const buttonWidth = 52
const buttonHeight = 52

const MobileIconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${buttonWidth}px;
  height: ${buttonHeight}px;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  cursor: pointer;
`

const BookmarkImg = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 200ms linear;
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

// Desktop
const DesktopIconContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  ${props => {
    if (props.svgColor !== '') {
      return `
        path {
          fill: ${props.svgColor};
        }
      `
    }
    return ''
  }};
`

const BookmarkImgDesktop = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 200ms linear;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
`

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
    this.requestedBookmarkSlugs = []
  }

  componentDidMount() {
    this.tryToFetchTheBookmarkOnce()
  }

  componentDidUpdate() {
    this.tryToFetchTheBookmarkOnce()
  }

  componentWillUnmount() {
    this.requestedBookmarkSlugs = []
  }

  tryToFetchTheBookmarkOnce() {
    const articleSlug = _.get(this.props, 'articleMeta.slug')
    /* Do nothing if the article slug has not been fetched yet, or the bookmark of it has been requested */
    /* TODO: Implement `status` for bookmark widget in redux reducer and action:
        There should be different states below for the bookmark widget status of an article:
          unknown: It has not checked the bookmark status yet
          isChecking: The request to check was make but has not gotten the response yet
          bookmarked: The article is bookmarked
          notBookmarked: The article is not bookmarked
          invalid: There's an error or there's no valid authentication info
        The current code is a workaround to identify the `unknown` situation (by logging we've sent request for an article or not).
        We only want to send request to check bookmark when the status is `unknown`.
     */
    if (
      articleSlug &&
      !this.requestedBookmarkSlugs.some(value => value === articleSlug)
    ) {
      const hostFromWindow = getHostFromWindowLocation()
      if (!this.checkIfThisArticleBookmarked()) {
        const { jwt, userID, getSingleBookmark } = this.props
        getSingleBookmark(jwt, userID, articleSlug, hostFromWindow)
      }
      /* Do not need to fetch bookmark if it has been already fetched (by SSR) */
      this.requestedBookmarkSlugs.unshift(articleSlug)
    }
  }

  // Redirect to singin page if user has not been authorized
  checkAuthorization() {
    const { isAuthed, jwt } = this.props
    if (!isAuthed || !jwt) {
      const currentHref =
        typeof window === 'undefined' ? '' : window.location.href
      window.location.href = getSignInHref(currentHref)
    }
  }

  addCurrentPageToBookmarks() {
    this.checkAuthorization()
    const { jwt, userID, createSingleBookmark, articleMeta } = this.props
    const bookmarkToBeCreated = {
      ...articleMeta,
      host: getHostFromWindowLocation(),
    }
    return createSingleBookmark(jwt, userID, bookmarkToBeCreated)
  }

  removeCurrentPageFromBookmarks() {
    this.checkAuthorization()
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
    if (bookmark) {
      const isSSR = typeof window === 'undefined'
      const hostFromWindow = getHostFromWindowLocation()
      if (!isSSR || bookmark.host !== hostFromWindow) {
        /*
          When server-side rendering, the bookmark is fetched by a request with given `host`.
          The `host` should be taken from the parsed url that user requested to the server.
          So it's safe to skip the check.
        */
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
    const { isMobile, svgColor } = this.props
    return isMobile ? (
      <MobileIconContainer
        onClick={
          isBookmarked
            ? this.removeCurrentPageFromBookmarks
            : this.addCurrentPageToBookmarks
        }
      >
        <BookmarkImg show={!isBookmarked}>
          <BookmarkUnaddedIconMobile />
        </BookmarkImg>
        <BookmarkImg show={isBookmarked}>
          <BookmarkAddedIconMobile />
        </BookmarkImg>
      </MobileIconContainer>
    ) : (
      <DesktopIconContainer
        onClick={
          isBookmarked
            ? this.removeCurrentPageFromBookmarks
            : this.addCurrentPageToBookmarks
        }
        svgColor={svgColor}
      >
        <BookmarkImgDesktop show={!isBookmarked}>
          <BookmarkUnaddedIconDesktop />
        </BookmarkImgDesktop>
        <BookmarkImgDesktop show={isBookmarked}>
          <BookmarkAddedIconDesktop />
        </BookmarkImgDesktop>
      </DesktopIconContainer>
    )
  }
}

BookmarkWidget.defaultProps = {
  articleMeta: {},
  isMobile: false,
  svgColor: '',
  bookmark: null,
  isAuthed: false,
  jwt: '',
  userID: NaN,
}

BookmarkWidget.propTypes = {
  articleMeta: corePropTypes.articleMetaForBookmark,
  isMobile: PropTypes.bool,
  svgColor: PropTypes.string,
  // Props below are provided by redux
  bookmark: corePropTypes.bookmark,
  createSingleBookmark: PropTypes.func.isRequired,
  deleteSingleBookmark: PropTypes.func.isRequired,
  getSingleBookmark: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool,
  jwt: PropTypes.string,
  userID: PropTypes.number,
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
    currentSlug && currentSlug === _.get('bookmarkInStore', 'slug')
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
