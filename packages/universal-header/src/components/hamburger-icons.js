import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import linkUtils from '../utils/links'
import querystring from 'querystring'
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
  iconHeight: {
    mobile: 42, // px
    tablet: 60, // px
  },
  iconWidth: {
    mobile: 42, // px
    tablet: 60, // px
  },
}

const IconContainer = styled.div`
  height: ${styles.iconHeight.mobile}px;
  width: ${styles.iconWidth.mobile}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 17px;

  ${mq.tabletOnly`
    height: ${styles.iconHeight.tablet}px;
    width: ${styles.iconWidth.tablet}px;
    margin-right: 25px;
  `}
`

const IconsContainer = styled.div`
  display: flex;

  ${IconContainer} {
    border: 1px solid;
    border-radius: 50%;
    border-color: ${props => props.borderColor};
  }
`

const Login = ({callback}) => {
  const handleLogin = (releaseBranch) => {
    const redirectURL = window.location.href
    const query = querystring.stringify({
      destination: redirectURL,
    })
    window.location = linkUtils.getLoginLink(releaseBranch).to + '?' + query
  }

  const handleClick = (e, releaseBranch) => {
    e.preventDefault()
    handleLogin(releaseBranch)
    callback()
  }

  return (
    <IconContainer>
      <HeaderContext.Consumer>
        {({ releaseBranch, theme }) => {
          const [LogInIcon] = themeUtils.selectHamburgerServiceIcons(theme).login
          return (
            <a
              onClick={e => handleClick(e, releaseBranch)}
            >
              <LogInIcon />
            </a>
          )
        }}
      </HeaderContext.Consumer>
    </IconContainer>
  )
}

Login.propTypes = {
  callback: PropTypes.func,
}

Login.defaultProps = {
  callback: () => {},
}

const Logout = ({callback}) => {
  const handleLogout = (releaseBranch) => {
    const redirectURL = window.location.href
    const query = querystring.stringify({
      destination: redirectURL,
    })
    window.location = linkUtils.getLogoutLink(releaseBranch).to + '?' + query
  }

  const handleClick = (e, releaseBranch) => {
    e.preventDefault()
    handleLogout(releaseBranch)
    callback()
  }

  return (
    <IconContainer>
      <HeaderContext.Consumer>
        {({ releaseBranch, theme }) => {
          const [LogOutIcon] = themeUtils.selectHamburgerServiceIcons(theme).logout
          return (
            <a
              onClick={e => handleClick(e, releaseBranch)}
            >
              <LogOutIcon />
            </a>
          )
        }}
      </HeaderContext.Consumer>
    </IconContainer>
  )
}

Logout.propTypes = {
  callback: PropTypes.func,
}

Logout.defaultProps = {
  callback: () => {},
}

const Search = ({callback}) => {
  return (
    <IconContainer>
      <HeaderContext.Consumer>
        {({ releaseBranch, isLinkExternal, theme }) => {
          const [SearchIcon] = themeUtils.selectHamburgerServiceIcons(theme).search
          const link = linkUtils.getSearchLink(
            isLinkExternal,
            releaseBranch
          )
          return (
            <Link {...link} onClick={callback}>
              <SearchIcon />
            </Link>
          )
        }}
      </HeaderContext.Consumer>
    </IconContainer>
  )
}

Search.propTypes = {
  callback: PropTypes.func,
}

Search.defaultProps = {
  callback: () => {},
}

const Bookmark = ({callback}) => {
  return (
    <IconContainer>
      <HeaderContext.Consumer>
        {({ releaseBranch, isLinkExternal, theme }) => {
          const [BookmarkIcon] = themeUtils.selectHamburgerServiceIcons(theme).bookmark
          const link = linkUtils.getBookmarksLink(
            isLinkExternal,
            releaseBranch
          )
          return (
            <Link {...link} onClick={callback}>
              <BookmarkIcon />
            </Link>
          )
        }}
      </HeaderContext.Consumer>
    </IconContainer>
  )
}

Bookmark.propTypes = {
  callback: PropTypes.func,
}

Bookmark.defaultProps = {
  callback: () => {},
}

const HamburgerService = ({ services, callback }) => {
  const _prepareIconJsx = (service) => {
    const serviceKey = service.key
    switch(serviceKey) {
      case 'login':
        return <Login callback={callback} key={serviceKey} />
      case 'logout':
        return <Logout callback={callback} key={serviceKey} />
      case 'search':
        return <Search callback={callback} key={serviceKey} />
      case 'bookmarks':
        return <Bookmark callback={callback} key={serviceKey} />
      default:
        return null;
    }
  }

  return (
    <HeaderContext.Consumer>
      {({ theme }) => {
        const { borderColor } = themeUtils.selectHamburgerServiceTheme(theme)
        return (
          <IconsContainer borderColor={borderColor}>
            { _.map(services, service => _prepareIconJsx(service)) }
          </IconsContainer>
        )
      }}
    </HeaderContext.Consumer>
  )
}

HamburgerService.propTypes = {
  services: PropTypes.array,
  callback: PropTypes.func,
}

HamburgerService.defaultProps = {
  services: [],
  callback: () => {},
}

export default HamburgerService
