import {
  searchConfigs,
  memberConfigs,
  bookmarkConfigs,
} from '@twreporter/core/lib/constants/services'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import Link from 'react-router-dom/Link'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import SearchBox from './search-box'
import styled from 'styled-components'
// assets
import BookmarkListIcon from '../assets/bookmark-list-icon.svg'
import SearchIcon from '../assets/search-icon.svg'
import SignInIcon from '../assets/member-icon.svg'
import SignOutIcon from '../assets/signout.svg'
// import DonateIcon from '../assets/donate-icon.svg'

const styles = {
  iconContainerSize: 3, // em
}

/* Icon alt text takes 2 fullwidth characters specifically */
const ICON_ALT_TEXT = {
  SEARCH: '搜尋',
  SIGN_OUT: '登出',
  MEMBER: '會員',
  BOOKMARK: '書籤',
}

const IconsContainer = styled.div`
  position: relative;
  display: table;
  ${mq.mobileOnly`
    display: none;
  `}
`

const IconContainer = styled.div`
  font-size: 14px;
  cursor: pointer;
  display: table-cell;
  width: ${styles.iconContainerSize}em;
  height: ${styles.iconContainerSize}em;
  line-height: 1;
  vertical-align: middle;
  text-align: center;
  position: relative;
  opacity: ${props => (props.isSearchOpened ? '0' : '1')};
  transition: opacity 600ms ease;
  svg {
    height: 100%;
  }
  span {
    display: none;
  }
  ${mq.dekstopAndAbove`
    svg {
      opacity: 1;
      transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      position: absolute;
      height: 100%;
      top: 0;
      left: 30%;
      z-index: 1;
    }
    span {
      display: inline;
      white-space: nowrap;
      overflow: hidden;
      color: #e60013;
      font-weight: ${fontWeight.bold};
      opacity: 0;
      transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      transform: scale(.4, 1.2);
      position: absolute;
      height: 100%;
      width: 2em;
      line-height: ${styles.iconContainerSize};
      vertical-align: middle;
      top: 0;
      left: 17%;
      z-index: 2;
    }
    &:hover {
      svg {
        transform: scale(1.7, .5);
        opacity: 0;
      }
      span {
        transform: scale(1, 1);
        opacity: 1;
      }
    }
  `}
`

const DisplayOnDesktop = styled(IconContainer)`
  display: none;
  ${mq.dekstopAndAbove`
    display: table-cell;
  `}
`

const HideOnDesktop = styled(IconContainer)`
  display: table-cell;
  ${mq.dekstopAndAbove`
    display: none;
  `}
`

class Icons extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSearchOpened: false,
    }
    this._closeSearchBox = this._closeSearchBox.bind(this)
    this._handleClickSearch = this._handleClickSearch.bind(this)
  }

  componentDidMount() {
    const { authenticationContext } = this.context
    // Becuase intermediate children are PureComponent,
    // Icons will not re-render if App.js (entry point of project) re-render
    // Therefore, Icons subscribe authenticationContext which is intizted in App.js
    // to keep up with the latest props of App.js. Speciffically focus on ifAuthenticated.
    authenticationContext.subscribe(() => {
      this.forceUpdate()
    })
  }

  _closeSearchBox() {
    this.setState({
      isSearchOpened: false,
    })
  }
  _handleClickSearch(e) {
    e.preventDefault()
    this.setState({
      isSearchOpened: true,
    })
  }

  render() {
    const { isSearchOpened } = this.state
    const { authenticationContext } = this.context
    const { ifAuthenticated, signOutAction } = authenticationContext
    const linkTo = ifAuthenticated ? '/' : `/${memberConfigs.path}`
    const Member = (
      <Link
        to={linkTo}
        onClick={() => {
          signOutAction()
          this.forceUpdate()
        }}
      >
        {ifAuthenticated ? <SignOutIcon /> : <SignInIcon />}
        <span>
          {ifAuthenticated
            ? `${ICON_ALT_TEXT.SIGN_OUT}`
            : `${ICON_ALT_TEXT.MEMBER}`}
        </span>
      </Link>
    )
    return (
      <IconsContainer>
        <DisplayOnDesktop
          onClick={this._handleClickSearch}
          isSearchOpened={isSearchOpened}
        >
          <SearchIcon />
          <span>{ICON_ALT_TEXT.SEARCH}</span>
        </DisplayOnDesktop>
        <SearchBox
          isSearchOpened={isSearchOpened}
          closeSearchBox={this._closeSearchBox}
        />
        <HideOnDesktop>
          <Link to={`/${searchConfigs.path}`}>
            <SearchIcon />
          </Link>
        </HideOnDesktop>
        <IconContainer isSearchOpened={isSearchOpened}>
          <Link to={`/${bookmarkConfigs.path}`}>
            <BookmarkListIcon />
            <span>{ICON_ALT_TEXT.BOOKMARK}</span>
          </Link>
        </IconContainer>
        <IconContainer isSearchOpened={isSearchOpened}>{Member}</IconContainer>
      </IconsContainer>
    )
  }
}

Icons.contextTypes = {
  // context.ifAuthenticated and context.signOutAction
  // should be passed in the context by Clients who using this React Component
  // ifAuthenticated: PropTypes.bool.isRequired,
  // signOutAction: PropTypes.func.isRequired,
  authenticationContext: PropTypes.object.isRequired,
}

export default Icons
