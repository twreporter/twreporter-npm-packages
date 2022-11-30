import { connect } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
// components
import Bookmarks from './bookmarks'
import Confirmation from '../confirmation'
import More from '../more'
import RedirectToSignIn from './redirect-to-sign-in'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'
import corePropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// lodash
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import map from 'lodash/map'
import slice from 'lodash/slice'

const { deleteSingleBookmark, getMultipleBookmarks } = twreporterRedux.actions
const reduxStatePropKeys = twreporterRedux.reduxStateFields

const _ = {
  findIndex,
  get,
  map,
  slice,
}

const defaultLimit = 5
const defaultSort = 'created_at'
const text = {
  dialog: {
    content: '您確定要刪除這篇文章書籤？',
    confirm: '確定',
    cancel: '取消',
  },
  loadMore: '載入更多',
}

const transitionName = {
  enter: 'effect-enter',
  enterActive: 'effect-enter-active',
  leave: 'effect-exit',
  leaveActive: 'effect-exit-active',
}

const transitionDuration = {
  enter: 400,
  leave: 300,
}

const MoreContainer = styled.div`
  display: ${props => (props.hasMore ? 'inline' : 'none')};
`

const reactTransitionCSS = css`
  .${transitionName.enter} {
    opacity: 0.01;
  }
  .${transitionName.enterActive} {
    opacity: 1;
    transition: opacity ${transitionDuration.enter}ms ease;
  }
  .${transitionName.leave} {
    opacity: 1;
  }
  .${transitionName.leaveActive} {
    opacity: 0.01;
    transition: opacity ${transitionDuration.leave}ms ease;
  }
`

const Container = styled.div`
  ${reactTransitionCSS}
`

const BookmarkList = ({
  releaseBranch = releaseBranchConsts.master,
  bookmarks,
  total,
  getMultipleBookmarks,
  deleteSingleBookmark,
  isAuthed,
  jwt,
  userID,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [idToBeDeleted, setIdToBeDeleted] = useState()
  const [numberToShow, setNumberToShow] = useState(
    total <= defaultLimit ? total : defaultLimit
  )
  const [bookmarkToShow, setBookmarkToShow] = useState(bookmarks)
  let _defaultBodyOverflow = 'scroll'

  useEffect(() => {
    // check authorization
    // redirect to singin page if user has not been authorized
    if (!isAuthed || !jwt) {
      const currentHref =
        typeof window === 'undefined' ? '' : window.location.href
      window.location.href = getSignInHref(currentHref)
    }

    // set overflow value
    _defaultBodyOverflow = _.get(
      document,
      'body.style.overflow',
      _defaultBodyOverflow
    )

    // check bookmark update
    const offset = 0
    getMultipleBookmarks(jwt, userID, offset, defaultLimit, defaultSort)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showConfirmation
      ? 'hidden'
      : _defaultBodyOverflow
  }, [showConfirmation])

  useEffect(() => {
    setBookmarkToShow(_.slice(bookmarks, 0, numberToShow))
  }, [numberToShow, bookmarks])

  useEffect(() => {
    if (total - numberToShow < defaultLimit) {
      setNumberToShow(total)
    }
  }, [total])

  const loadMoreBookmarks = () => {
    const nextNumberToShow =
      numberToShow + defaultLimit < total ? numberToShow + defaultLimit : total
    if (total === bookmarks.length) {
      setNumberToShow(nextNumberToShow)
    } else if (numberToShow < total) {
      const offset = numberToShow
      getMultipleBookmarks(jwt, userID, offset, defaultLimit, defaultSort)
      setNumberToShow(nextNumberToShow)
    }
  }

  const hideComfirmation = () => {
    setShowConfirmation(false)
  }

  const showComfirmation = () => {
    setShowConfirmation(true)
  }

  const handleDeleteButtonClicked = bookmarkID => {
    setIdToBeDeleted(bookmarkID)
    showComfirmation()
  }

  const handleDeletingConfirmed = () => {
    hideComfirmation()
    if (typeof idToBeDeleted === 'number') {
      deleteSingleBookmark(jwt, userID, idToBeDeleted)
    } else {
      console.error(
        `Deleting bookmark failed. Bookmark id should be a number, but is ${idToBeDeleted}`
      ) // eslint-disable-line no-console
    }
    setIdToBeDeleted(null)
  }

  if (!isAuthed || !jwt) {
    return <RedirectToSignIn>您尚未登入，將跳轉至登入頁</RedirectToSignIn>
  }

  return (
    <Container>
      <Bookmarks
        bookmarks={bookmarkToShow}
        handleDelete={handleDeleteButtonClicked}
        total={total}
        releaseBranch={releaseBranch}
      />
      <MoreContainer hasMore={numberToShow < total}>
        <More loadMore={loadMoreBookmarks}>
          <span>{text.loadMore}</span>
        </More>
      </MoreContainer>
      <CSSTransition
        classNames={transitionName}
        in={showConfirmation}
        timeout={{
          enter: transitionDuration.enter,
          exit: transitionDuration.leave,
        }}
        mountOnEnter
        unmountOnExit
      >
        <Confirmation
          onCancel={hideComfirmation}
          onConfirm={handleDeletingConfirmed}
          content={text.dialog.content}
          confirm={text.dialog.confirm}
          cancel={text.dialog.cancel}
        />
      </CSSTransition>
    </Container>
  )
}

BookmarkList.propTypes = {
  releaseBranch: corePropTypes.releaseBranch,
  // Props below are provided by redux
  bookmarks: PropTypes.arrayOf(corePropTypes.bookmark).isRequired,
  total: PropTypes.number.isRequired,
  getMultipleBookmarks: PropTypes.func.isRequired,
  deleteSingleBookmark: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  jwt: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
}

BookmarkList.defaultProps = {
  releaseBranch: releaseBranchConsts.master,
}

const mapStateToProps = state => {
  const bookmarkIDList = _.get(
    state,
    [reduxStatePropKeys.bookmarks, 'bookmarkIDList'],
    []
  )
  const bookmarkEntities = _.get(
    state,
    [reduxStatePropKeys.bookmarks, 'entities'],
    {}
  )
  const bookmarks = _.map(bookmarkIDList, id => _.get(bookmarkEntities, id))
  const total = _.get(state, [reduxStatePropKeys.bookmarks, 'total'], 0)
  const jwt = _.get(state, [reduxStatePropKeys.auth, 'accessToken'])
  const userID = _.get(state, [reduxStatePropKeys.auth, 'userInfo', 'user_id'])
  const isAuthed = _.get(state, [reduxStatePropKeys.auth, 'isAuthed'])
  return {
    bookmarks,
    isAuthed,
    jwt,
    total,
    userID,
  }
}

export default connect(
  mapStateToProps,
  { getMultipleBookmarks, deleteSingleBookmark }
)(BookmarkList)
