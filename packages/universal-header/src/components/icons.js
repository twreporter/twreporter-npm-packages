import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import SearchBox from './search-box'
import fonts from '../constants/fonts'
import linkUtils from '../utils/links'
import querystring from 'querystring'
import serviceConst from '../constants/services'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const styles = {
  iconContainerSize: 3, // em
}

const IconsContainer = styled.div`
  position: relative;
  display: table;
  ${mq.mobileOnly`
    display: none;
  `}
`

const IconContainer = styled.div`
  font-size: ${fonts.size.base};
  cursor: pointer;
  display: table-cell;
  width: ${styles.iconContainerSize}em;
  height: ${styles.iconContainerSize}em;
  line-height: 1;
  position: relative;
  opacity: ${props => (props.isSearchOpened ? '0' : '1')};
  transition: opacity 600ms ease;
  svg {
    opacity: 1;
    position: absolute;
    height: 100%;
    top: 0;
    left: 30%;
    z-index: 1;
  }
`

const ShowOnHover = styled.div`
   display: none;

   ${IconContainer}:hover & {
     display: block;
   }
`

const HideOnHover = styled.div`
   display: block;

   ${IconContainer}:hover & {
     display: none;
   }
`

class Icons extends React.PureComponent {
  static propTypes = {
    services: PropTypes.array,
  }

  static defaultProps = {
    services: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      isSearchOpened: false,
    }
    this._closeSearchBox = this._closeSearchBox.bind(this)
    this._handleClickSearch = this._handleClickSearch.bind(this)
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

  _handleLogIconClick = (e, isAuthed, releaseBranch) => {
    e.preventDefault()

    const redirectURL = window.location.href
    const query = querystring.stringify({
      destination: redirectURL,
    })
    if (isAuthed) {
      window.location = linkUtils.getLogoutLink(releaseBranch).to + '?' + query
      return
    }
    window.location = linkUtils.getLoginLink(releaseBranch).to + '?' + query
  }

  _prepareIconJsx(service) {
    const { isSearchOpened } = this.state
    const Login = (
      <IconContainer isSearchOpened={isSearchOpened} key="login">
        <HeaderContext.Consumer>
          {({ releaseBranch, theme }) => {
            const [LogInIcon, LogInHoverIcon] = themeUtils.selectServiceIcons(theme).login
            return (
              <a
                onClick={e => {
                  this._handleLogIconClick(e, false, releaseBranch)
                }}
              >
                <React.Fragment>
                  <HideOnHover>
                    <LogInIcon />
                  </HideOnHover>
                  <ShowOnHover>
                    <LogInHoverIcon />
                  </ShowOnHover>
                </React.Fragment>
              </a>
            )
          }}
        </HeaderContext.Consumer>
      </IconContainer>
    )
    const Logout = (
      <IconContainer isSearchOpened={isSearchOpened} key="logout">
        <HeaderContext.Consumer>
          {({ releaseBranch, theme }) => {
            const [LogOutIcon, LogOutHoverIcon] = themeUtils.selectServiceIcons(theme).logout
            return (
              <a
                onClick={e => {
                  this._handleLogIconClick(e, true, releaseBranch)
                }}
              >
                <React.Fragment>
                  <HideOnHover>
                    <LogOutIcon />
                  </HideOnHover>
                  <ShowOnHover>
                    <LogOutHoverIcon />
                  </ShowOnHover>
                </React.Fragment>
              </a>
            )
          }}
        </HeaderContext.Consumer>
      </IconContainer>
    )
    const Search = (
      <React.Fragment key="search">
        <IconContainer
          onClick={this._handleClickSearch}
          isSearchOpened={isSearchOpened}
        >
          <HeaderContext.Consumer>
            {({ theme }) => {
              const [SearchIcon, SearchHoverIcon] = themeUtils.selectServiceIcons(theme).search
              return (
                <React.Fragment>
                  <HideOnHover>
                    <SearchIcon />
                  </HideOnHover>
                  <ShowOnHover>
                    <SearchHoverIcon />
                  </ShowOnHover>
                </React.Fragment>
              )
            }}
          </HeaderContext.Consumer>
        </IconContainer>
        <SearchBox
          isSearchOpened={isSearchOpened}
          closeSearchBox={this._closeSearchBox}
        />
      </React.Fragment>
    )
    const Bookmark = (
      <IconContainer isSearchOpened={isSearchOpened} key="bookmark">
        <HeaderContext.Consumer>
          {({ releaseBranch, isLinkExternal, theme }) => {
            const [BookmarkIcon, BookmarkHoverIcon] = themeUtils.selectServiceIcons(theme).bookmark
            const link = linkUtils.getBookmarksLink(
              isLinkExternal,
              releaseBranch
            )
            return (
              <Link {...link}>
                <HideOnHover>
                  <BookmarkIcon />
                </HideOnHover>
                <ShowOnHover>
                  <BookmarkHoverIcon />
                </ShowOnHover>
              </Link>
            )
          }}
        </HeaderContext.Consumer>
      </IconContainer>

    )
    switch(service) {
      case 'login':
        return Login
      case 'logout':
        return Logout
      case 'search':
        return Search
      case 'bookmarks':
        return Bookmark
      default:
        return null;
    }
  }

  render() {
    const { services } = this.props;
    return (
      <IconsContainer>
        { _.map(services, service => this._prepareIconJsx(service.key)) }
      </IconsContainer>
    )
  }
}

export default Icons
