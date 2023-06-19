import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import styled from 'styled-components'
import CSSTransition from 'react-transition-group/CSSTransition'
// context
import HeaderContext from '../contexts/header-context'
// utils
import {
  getLogoutLink,
  getLoginLink,
  getSearchLink,
  getBookmarksLink,
} from '../utils/links'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import { IconButton, TextButton } from '@twreporter/react-components/lib/button'
import { Member, Search, Bookmark } from '@twreporter/react-components/lib/icon'
import { Dialog } from '@twreporter/react-components/lib/card'
import { SearchBar } from '@twreporter/react-components/lib/input'
import { useOutsideClick } from '@twreporter/react-components/lib/hook'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { THEME } from '@twreporter/core/lib/constants/theme'

const IconsContainer = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  position: relative;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
  a {
    display: flex;
  }
`

const Container = styled.div`
  opacity: ${props => (props.isSearchOpened ? '0' : '1')};
  transition: opacity 300ms ease;
`

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchContainer = styled.div`
  opacity: ${props => (props.isSearchOpened ? '1' : '0')};
  transition: opacity 300ms ease;
  position: absolute;
  right: 0;
  top: -8px;
  z-index: ${props => (props.isSearchOpened ? 999 : -1)};
`

const StyledDialog = styled(Dialog)`
  opacity: ${props => (props.showDialog ? '1' : '0')};
  transition: opacity 100ms;
  position: absolute;
  top: 24px;
  right: -16px;
  width: max-content;
  cursor: pointer;
  color: ${colorGrayscale.gray800};
`

const LogInOutIcon = ({ loginButtonType = 'icon', isForHambuger = false }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { releaseBranch, theme, isAuthed } = useContext(HeaderContext)
  const onClickIcon = e => {
    e.preventDefault()

    if (isAuthed) {
      setShowDialog(!showDialog)
      return
    }
    const redirectURL = window.location.href
    const query = querystring.stringify({ destination: redirectURL })
    window.location = getLoginLink(releaseBranch).to + '?' + query
  }
  const onClickLogOut = e => {
    e.preventDefault()

    const redirectURL = window.location.href
    const query = querystring.stringify({ destination: redirectURL })
    window.location = getLogoutLink(releaseBranch).to + '?' + query
  }
  const closeDialog = () => setShowDialog(false)
  const ref = useOutsideClick(closeDialog)
  const Icon = <Member releaseBranch={releaseBranch} />
  let buttonTheme
  if (isForHambuger) {
    if (theme === THEME.transparent) {
      buttonTheme = THEME.normal
    } else {
      buttonTheme = theme
    }
  } else {
    buttonTheme = theme
  }
  const LoginButton =
    loginButtonType === 'icon' || isAuthed ? (
      <IconButton iconComponent={Icon} theme={buttonTheme} />
    ) : (
      <TextButton
        text="登入"
        theme={buttonTheme}
        style={TextButton.Style.DARK}
      />
    )

  return (
    <IconContainer key="login">
      <LogContainer onClick={onClickIcon} ref={ref}>
        {LoginButton}
        <CSSTransition
          in={showDialog}
          classNames="dialog-effect"
          timeout={{ appear: 0, enter: 100, exit: 100 }}
          unmountOnExit
        >
          <StyledDialog
            text="登出"
            size="L"
            showDialog={showDialog}
            onClick={onClickLogOut}
          />
        </CSSTransition>
      </LogContainer>
    </IconContainer>
  )
}
LogInOutIcon.propTypes = {
  loginButtonType: PropTypes.oneOf(['icon', 'text']),
  isForHambuger: PropTypes.bool,
}

const SearchIcon = () => {
  const [isSearchOpened, setSearchOpened] = useState(false)
  const { isLinkExternal, releaseBranch, theme } = useContext(HeaderContext)

  const closeSearchBox = () => {
    setSearchOpened(false)
  }
  const handleClickSearch = e => {
    e.preventDefault()
    setSearchOpened(true)
    if (!ref.current) {
      return
    }
    const input = ref.current.getElementsByTagName('INPUT')[0]
    if (input) {
      input.focus()
    }
  }
  const onSearch = keywords => {
    if (!window) {
      return
    }
    window.location = `${
      getSearchLink(isLinkExternal, releaseBranch).to
    }?q=${keywords}`
  }

  const Icon = <Search releaseBranch={releaseBranch} />
  const ref = useOutsideClick(closeSearchBox)
  return (
    <IconContainer ref={ref} key="search">
      <Container onClick={handleClickSearch} isSearchOpened={isSearchOpened}>
        <IconButton iconComponent={Icon} theme={theme} />
      </Container>
      <SearchContainer isSearchOpened={isSearchOpened}>
        <SearchBar
          placeholder="關鍵字搜尋"
          theme={theme}
          onClose={closeSearchBox}
          onSearch={onSearch}
          handleBlur={closeSearchBox}
        />
      </SearchContainer>
    </IconContainer>
  )
}

const BookmarkIcon = () => {
  const { releaseBranch, isLinkExternal, theme } = useContext(HeaderContext)
  const link = getBookmarksLink(isLinkExternal, releaseBranch)
  const Icon = <Bookmark releaseBranch={releaseBranch} />

  return (
    <IconContainer key="bookmark">
      <Link {...link}>
        <IconButton iconComponent={Icon} theme={theme} />
      </Link>
    </IconContainer>
  )
}

const Icons = () => (
  <IconsContainer>
    <SearchIcon />
    <BookmarkIcon />
    <LogInOutIcon />
  </IconsContainer>
)

export const MobileIcons = ({ isForHambuger = false }) => (
  <IconsContainer>
    <LogInOutIcon loginButtonType="text" isForHambuger={isForHambuger} />
  </IconsContainer>
)

MobileIcons.propTypes = {
  isForHambuger: PropTypes.bool,
}

export default Icons
