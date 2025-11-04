import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import styled from 'styled-components'
// context
import HeaderContext from '../contexts/header-context'
// utils
import {
  getLoginLink,
  getSearchLink,
  getMyReadingLink,
  getMemberLink,
} from '../utils/links'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import { IconButton, TextButton } from '@twreporter/react-components/lib/button'
import { Member, Search, KidStar } from '@twreporter/react-components/lib/icon'
import { SearchBar } from '@twreporter/react-components/lib/input'
import { useOutsideClick } from '@twreporter/react-components/lib/hook'
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
  opacity: ${(props) => (props.$isSearchOpened ? '0' : '1')};
  transition: opacity 300ms ease;
`

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchContainer = styled.div`
  opacity: ${(props) => (props.$isSearchOpened ? '1' : '0')};
  transition: opacity 300ms ease;
  position: absolute;
  right: 0;
  top: -8px;
  z-index: ${(props) => (props.$isSearchOpened ? 999 : -1)};
`

const MemberButtonType = {
  ICON: 'icon',
  TEXT: 'text',
}
const MemberIcon = ({
  memberButtonType = MemberButtonType.ICON,
  isForHambuger = false,
}) => {
  const { releaseBranch, theme, isAuthed, isLinkExternal } =
    useContext(HeaderContext)
  const onClickIcon = (e) => {
    e.preventDefault()

    if (isAuthed) {
      window.location = getMemberLink(isLinkExternal, releaseBranch).to
      return
    }

    const redirectURL = window.location.href
    const query = querystring.stringify({ destination: redirectURL })
    window.location = getLoginLink(releaseBranch).to + '?' + query
  }
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
    memberButtonType === MemberButtonType.ICON || isAuthed ? (
      <IconButton iconComponent={Icon} theme={buttonTheme} />
    ) : (
      <TextButton
        text="登入"
        theme={buttonTheme}
        style={TextButton.Style.DARK}
      />
    )

  return (
    <IconContainer key="login" aria-label="前往個人專區">
      <LogContainer onClick={onClickIcon}>{LoginButton}</LogContainer>
    </IconContainer>
  )
}
MemberIcon.propTypes = {
  memberButtonType: PropTypes.oneOf(Object.values(MemberButtonType)),
  isForHambuger: PropTypes.bool,
}

const SearchIcon = () => {
  const [isSearchOpened, setSearchOpened] = useState(false)
  const { isLinkExternal, releaseBranch, theme } = useContext(HeaderContext)

  const closeSearchBox = () => {
    setSearchOpened(false)
  }
  const handleClickSearch = (e) => {
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
  const onSearch = (keywords) => {
    setSearchOpened(false)
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
    <IconContainer ref={ref} key="search" aria-label="搜尋">
      <Container onClick={handleClickSearch} $isSearchOpened={isSearchOpened}>
        <IconButton iconComponent={Icon} theme={theme} />
      </Container>
      <SearchContainer $isSearchOpened={isSearchOpened}>
        <SearchBar
          placeholder="關鍵字搜尋"
          theme={theme}
          onClose={closeSearchBox}
          onSearch={onSearch}
        />
      </SearchContainer>
    </IconContainer>
  )
}

const MyReadingIcon = () => {
  const { releaseBranch, isLinkExternal, theme } = useContext(HeaderContext)
  const link = getMyReadingLink(isLinkExternal, releaseBranch)
  const Icon = <KidStar releaseBranch={releaseBranch} />

  return (
    <IconContainer key="bookmark" aria-label="前往我的閱讀">
      <Link {...link}>
        <IconButton iconComponent={Icon} theme={theme} />
      </Link>
    </IconContainer>
  )
}

const Icons = () => (
  <IconsContainer>
    <SearchIcon />
    <MyReadingIcon />
    <MemberIcon />
  </IconsContainer>
)

export const MobileIcons = ({ isForHambuger = false }) => (
  <IconsContainer>
    <MemberIcon
      memberButtonType={MemberButtonType.TEXT}
      isForHambuger={isForHambuger}
    />
  </IconsContainer>
)

MobileIcons.propTypes = {
  isForHambuger: PropTypes.bool,
}

export default Icons
