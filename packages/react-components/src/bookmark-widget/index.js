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
    console.warn('Error on getting `host` from `window.location`:', err)
  }
}

class BookmarkWidget extends React.PureComponent {
  constructor(props) {
    super(props)
    this.addCurrentPageToBookmarks = this.addCurrentPageToBookmarks.bind(this)
    this.removeCurrentPageFromBookmarks = this.removeCurrentPageFromBookmarks.bind(
      this
    )
    this.requestedBookmarkSlug = ''
  }

  componentWillMount() {
    this.tryToFetchTheBookmarkOnce()
  }

  componentDidUpdate() {
    this.tryToFetchTheBookmarkOnce()
  }
  tryToFetchTheBookmarkOnce() {
    const articleSlug = _.get(this.props, 'articleMeta.slug')
    /* Do nothing if the article slug has not been fetched yet, or the bookmark of it has been requested */
    if (articleSlug && articleSlug !== this.requestedBookmarkSlug) {
      const hostFromWindow = getHostFromWindowLocation()
      if (this.checkIfThisArticleBookmarked()) {
        /* Do not need to fetch bookmark if it has been already fetched (by SSR) */
        this.requestedBookmarkSlug = articleSlug
      } else {
        const { jwt, userID, getSingleBookmark } = this.props
        this.requestedBookmarkSlug = articleSlug
        getSingleBookmark(jwt, userID, articleSlug, hostFromWindow)
      }
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
    if (articleMeta) {
      const bookmarkToBeCreated = {
        ...articleMeta,
        host: getHostFromWindowLocation(),
      }
      return createSingleBookmark(jwt, userID, bookmarkToBeCreated)
    } else {
      console.error(
        'Error on creating bookmark with `BookmarkWidget`: No valid articleMeta'
      )
    }
  }

  removeCurrentPageFromBookmarks() {
    this.checkAuthorization()
    const { jwt, userID, deleteSingleBookmark, bookmark } = this.props
    if (bookmark.id) {
      deleteSingleBookmark(jwt, userID, bookmark.id)
    } else {
      console.error(
        'Error on deleting bookmark with `BookmarkWidget`: No valid bookmark id.'
      )
    }
  }

  checkIfThisArticleBookmarked() {
    const { articleMeta, bookmark } = this.props
    /*
      When server-side rendering, the bookmark is fetched by a request with given `host`.
      The `host` and `slug` should be taken from the parsed url that user requested to the server.
      So it's safe to skip the check.
    */
    const isSSR = typeof window === 'undefined'
    return (
      Boolean(bookmark) &&
      bookmark.slug === _.get(articleMeta, 'slug') &&
      (isSSR || bookmark.host === getHostFromWindowLocation())
    )
  }

  render() {
    const { isMobile, svgColor } = this.props
    const isBookmarked = this.checkIfThisArticleBookmarked()
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
  articleMeta: null,
  mobile: false,
  svgColor: '',
}

BookmarkWidget.propTypes = {
  articleMeta: corePropTypes.articleMetaForBookmark.isRequired,
  isMobile: PropTypes.bool,
  svgColor: PropTypes.string,
  // Props below are provided by redux
  bookmark: corePropTypes.bookmark,
  createSingleBookmark: PropTypes.func.isRequired,
  deleteSingleBookmark: PropTypes.func.isRequired,
  getSingleBookmark: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  jwt: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  const jwt = _.get(state, [reduxStatePropKeys.auth, 'accessToken'])
  const userID = _.get(state, [reduxStatePropKeys.auth, 'userInfo', 'user_id'])
  const isAuthed = _.get(state, [reduxStatePropKeys.auth, 'isAuthed'])
  const bookmark = _.get(state, [reduxStatePropKeys.bookmarkWidget, 'bookmark'])
  return {
    bookmark,
    isAuthed,
    jwt,
    userID,
  }
}

export default connect(
  mapStateToProps,
  { getSingleBookmark, createSingleBookmark, deleteSingleBookmark }
)(BookmarkWidget)
