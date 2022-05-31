import React, { useState, useContext, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
// context
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
// constant
import predefinedProps from '../../constants/prop-types/aside'
import themeConst from '../../constants/theme'
// util
import { getToolBarTheme } from './utils/theme'
// @twreporter
import BookmarkWidget from '@twreporter/react-components/lib/bookmark-widget'
import {
  Topic,
  Bookmark,
  Text,
  Article,
  Share,
  Facebook,
  Twitter,
  Line,
  Copy,
} from '@twreporter/react-components/lib/icon'
import {
  IconButton,
  IconWithTextButton,
} from '@twreporter/react-components/lib/button'
import { SnackBar } from '@twreporter/react-components/lib/snack-bar'
// global var
const HideTextContext = createContext()
const defaultFbAppID = '962589903815787'
const defaultFunc = () => {}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-right: 8px;
  border-radius: 50%;
`

const OptionContainer = styled.div`
  opacity: ${props => (props.isShow ? '1' : '0')};
  transition: opacity 100ms;
  position: absolute;
  top: -55px;
  left: 50px;
  display: flex;
`

const SnackBarContainer = styled.div`
  opacity: ${props => (props.showSnackBar ? '1' : '0')};
  position: absolute;
  left: 50%;
  bottom: 56px; // toolbar height + padding 8px
  transform: translateX(-50%);
  transition: opacity 100ms;
`

const ToolBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: ${props => props.bgColor};
  padding: 4px 16px;
  border-radius: 60px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 8px;
  z-index: 1000;
  height: ${props => (props.hideText ? '38px' : '48px')};
  transition: height 100ms;
  ${ShareContainer} {
    background-color: ${props => props.bgColor};
  }
`

const FbShare = ({ appID }) => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const shareToFb = () => {
    const currentURL = window.location.href
    const location =
      'https://www.facebook.com/dialog/feed?' +
      'display=page' +
      `&app_id=${appID}` +
      `&link=${encodeURIComponent(currentURL)}` +
      `&redirect_uri=${encodeURIComponent('https://www.facebook.com/')}`

    window.open(location, '_blank')
  }

  return (
    <ShareContainer id="fb-share" onClick={shareToFb}>
      <IconButton iconComponent=<Facebook /> theme={theme} />
    </ShareContainer>
  )
}
FbShare.propTypes = {
  appID: predefinedProps.tools.fbAppID,
}

const LineShare = () => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const shareToLine = () => {
    const currentURL = window.location.href
    const location = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      currentURL
    )}`

    window.open(location, '_blank')
  }

  return (
    <ShareContainer id="line-share" onClick={shareToLine}>
      <IconButton iconComponent=<Line /> theme={theme} />
    </ShareContainer>
  )
}

const TwitterShare = () => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const shareToTwitter = () => {
    const currentURL = window.location.href
    const location =
      'https://twitter.com/intent/tweet?' +
      `url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(
        document.title + ' #報導者'
      )}`

    window.open(location, '_blank')
  }

  return (
    <ShareContainer id="twitter-share" onClick={shareToTwitter}>
      <IconButton iconComponent=<Twitter /> theme={theme} />
    </ShareContainer>
  )
}

const CopyUrl = ({ onclick = defaultFunc }) => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const copyUrl = async () => {
    try {
      const currentURL = window.location.href
      await navigator.clipboard.writeText(currentURL)
      onclick(true)
    } catch (err) {
      onclick(false)
    }
  }

  return (
    <ShareContainer onClick={copyUrl}>
      <IconButton iconComponent=<Copy /> theme={theme} />
    </ShareContainer>
  )
}
CopyUrl.propTypes = {
  onclick: PropTypes.func,
}

const ShareBy = ({ fbAppID }) => {
  const [showOption, setShowState] = useState(false)
  const [showSnackBar, setSnackBar] = useState(false)
  const hideText = useContext(HideTextContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const onCopyUrl = isCopied => {
    if (!isCopied) {
      return
    }
    setSnackBar(true)
    setTimeout(() => {
      setSnackBar(false)
    }, 3000)
  }

  return (
    <ButtonContainer onClick={() => setShowState(prevValue => !prevValue)}>
      <IconWithTextButton
        text="分享"
        iconComponent=<Share />
        theme={theme}
        hideText={hideText}
      />
      <OptionContainer isShow={showOption}>
        <FbShare appID={fbAppID} />
        <LineShare />
        <TwitterShare />
        <CopyUrl onclick={onCopyUrl} />
      </OptionContainer>
      <SnackBarContainer showSnackBar={showSnackBar}>
        <SnackBar text="已複製" theme={theme} />
      </SnackBarContainer>
    </ButtonContainer>
  )
}
ShareBy.propTypes = {
  fbAppID: predefinedProps.tools.fbAppID,
}

const FontLevel = ({ changeFontLevel }) => {
  const hideText = useContext(HideTextContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'

  return (
    <ButtonContainer onClick={changeFontLevel}>
      <IconWithTextButton
        text="文字大小"
        iconComponent=<Text />
        theme={theme}
        hideText={hideText}
      />
    </ButtonContainer>
  )
}
FontLevel.propTypes = {
  changeFontLevel: predefinedProps.tools.onFontLevelChange,
}

const BookmarkBlock = ({ articleMeta }) => {
  const hideText = useContext(HideTextContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const renderIcon = (isBookmarked, addAction, removeAction) => {
    const iconType = isBookmarked ? 'saved' : 'add'
    return (
      <ButtonContainer onClick={isBookmarked ? removeAction : addAction}>
        <IconWithTextButton
          text="加入書籤"
          iconComponent=<Bookmark type={iconType} />
          theme={theme}
          hideText={hideText}
        />
      </ButtonContainer>
    )
  }

  return (
    <BookmarkWidget
      toAutoCheck={false}
      articleMeta={articleMeta}
      renderIcon={renderIcon}
    />
  )
}
BookmarkBlock.propTypes = {
  articleMeta: predefinedProps.tools.articleMetaForBookmark,
}

const BackToTopic = ({ backToTopic }) => {
  const hideText = useContext(HideTextContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'

  return (
    <DynamicComponentsContext.Consumer>
      {components => (
        <components.Link to={backToTopic} target="_self">
          <ButtonContainer>
            <IconWithTextButton
              text="專題"
              iconComponent=<Topic />
              theme={theme}
              hideText={hideText}
            />
          </ButtonContainer>
        </components.Link>
      )}
    </DynamicComponentsContext.Consumer>
  )
}
BackToTopic.propTypes = {
  backToTopic: predefinedProps.tools.backToTopic,
}

const RelatedPost = () => {
  const hideText = useContext(HideTextContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const scrollToBottom = () => {
    document.getElementById('related-post-anchor').scrollIntoView()
  }

  return (
    <ButtonContainer onClick={scrollToBottom}>
      <IconWithTextButton
        text="相關文章"
        iconComponent=<Article />
        theme={theme}
        hideText={hideText}
      />
    </ButtonContainer>
  )
}

const ToolBar = ({
  backToTopic,
  fbAppID,
  articleMetaForBookmark,
  onFontLevelChange,
  className,
}) => {
  const [scrollDirection, setScrollDirection] = useState('init')
  useEffect(() => {
    const threshold = 0
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up'
      setScrollDirection(scrollDirection)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      lastScrollY = null
      ticking = null
    }
  }, [scrollDirection])
  const themeContext = useContext(ThemeContext)
  const { bgColor } = getToolBarTheme(themeContext.name)
  const backToTopicJSX = backToTopic ? <BackToTopic /> : ''
  const hideText = scrollDirection === 'down'

  return (
    <HideTextContext.Provider value={hideText}>
      <ToolBarContainer
        bgColor={bgColor}
        hideText={hideText}
        className={className}
      >
        <FontLevel changeFontLevel={onFontLevelChange} />
        <ShareBy fbAppID={fbAppID || defaultFbAppID} />
        <BookmarkBlock articleMeta={articleMetaForBookmark} />
        <RelatedPost />
        {backToTopicJSX}
      </ToolBarContainer>
    </HideTextContext.Provider>
  )
}
ToolBar.propTypes = predefinedProps.tools

export default ToolBar
