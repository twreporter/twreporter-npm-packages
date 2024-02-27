import React, { useState, useContext, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
// context
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
// constant
import predefinedProps from '../../constants/prop-types/aside'
import themeConst from '../../constants/theme'
import {
  ARTICLE_ANCHOR_SCROLL,
  RELATED_POST_ANCHOR_ID,
} from '../../constants/anchor'
// util
import { getToolBarTheme } from './utils/theme'
// @twreporter
import { useOutsideClick } from '@twreporter/react-components/lib/hook'
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
import {
  SnackBar,
  useSnackBar,
} from '@twreporter/react-components/lib/snack-bar'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
// lodash
import isNil from 'lodash/isNil'
const _ = {
  isNil,
}
// global var
const ToolBarContext = createContext()
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
  border-radius: 50%;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`

const OptionContainer = styled.div`
  z-index: 6;
  opacity: ${props => (props.isShow ? '1' : '0')};
  transition: opacity 100ms;
  position: absolute;
  top: -55px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`

const SnackBarContainer = styled.div`
  z-index: 5; // should be less than OptionsContainer in order to click line & twitter icon
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 100ms;
  opacity: ${props => (props.showSnackBar ? 1 : 0)};
`

const ToolBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: ${props => props.bgColor};
  padding: 0 16px;
  border-radius: 60px;
  position: fixed;
  left: 50%;
  transform: ${props =>
    props.isHidden ? 'translate(-50%, 150%)' : 'translate(-50%, 0)'};
  bottom: calc(env(safe-area-inset-bottom, 0) + 8px);
  z-index: ${zIndexConst.mobileToolBar};
  height: ${props => (props.hideText ? '38px' : '56px')};
  transition: height 100ms, transform 100ms ease-in-out;
  box-shadow: ${props => props.shadow};
  ${ShareContainer} {
    background-color: ${props => props.bgColor};
    box-shadow: ${props => props.shadow};
  }
  ${SnackBarContainer} {
    bottom: ${props =>
      props.hideText ? '46px' : '64px'}; //toolbar height + padding 8px
  }
`

const FbShare = ({ appID }) => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
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
      <IconButton
        iconComponent={<Facebook releaseBranch={releaseBranch} />}
        theme={theme}
      />
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
  const { releaseBranch } = themeContext
  const shareToLine = () => {
    const currentURL = window.location.href
    const location = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      currentURL
    )}`

    window.open(location, '_blank')
  }

  return (
    <ShareContainer id="line-share" onClick={shareToLine}>
      <IconButton
        iconComponent={<Line releaseBranch={releaseBranch} />}
        theme={theme}
      />
    </ShareContainer>
  )
}

const TwitterShare = () => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
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
      <IconButton
        iconComponent={<Twitter releaseBranch={releaseBranch} />}
        theme={theme}
      />
    </ShareContainer>
  )
}

const CopyUrl = ({ onclick = defaultFunc }) => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
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
      <IconButton
        iconComponent={<Copy releaseBranch={releaseBranch} />}
        theme={theme}
      />
    </ShareContainer>
  )
}
CopyUrl.propTypes = {
  onclick: PropTypes.func,
}

const ShareBy = ({ fbAppID }) => {
  const [showOption, setShowState] = useState(false)
  const { hideText, toastr } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
  const onCopyUrl = isCopied => {
    if (!isCopied) {
      return
    }
    toastr({ text: '已複製', timeout: 3000 })
  }
  const onButtonClick = () => setShowState(prevValue => !prevValue)
  const onClickOutside = () => setShowState(false)
  const ref = useOutsideClick(onClickOutside)

  return (
    <ButtonContainer ref={ref} onClick={onButtonClick}>
      <IconWithTextButton
        text="分享"
        iconComponent={<Share releaseBranch={releaseBranch} />}
        theme={theme}
        hideText={hideText}
      />
      <OptionContainer isShow={showOption}>
        <FbShare appID={fbAppID} />
        <LineShare />
        <TwitterShare />
        <CopyUrl onclick={onCopyUrl} />
      </OptionContainer>
    </ButtonContainer>
  )
}
ShareBy.propTypes = {
  fbAppID: predefinedProps.tools.fbAppID,
}

const FontLevel = ({ changeFontLevel }) => {
  const { hideText } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext

  return (
    <ButtonContainer onClick={changeFontLevel}>
      <IconWithTextButton
        text="文字大小"
        iconComponent={<Text releaseBranch={releaseBranch} />}
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
  const { hideText, toastr } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
  const renderIcon = (isBookmarked, addAction, removeAction) => {
    const iconType = isBookmarked ? 'saved' : 'add'
    const text = isBookmarked ? '已收藏' : '收藏'
    const id = isBookmarked ? 'remove-bookmark' : 'add-bookmark'
    const handleClick = async () => {
      const action = isBookmarked ? removeAction : addAction
      try {
        await action()
      } catch (err) {
        console.error('add bookmark fail', err)
      }
      onClickButton(isBookmarked)
    }
    return (
      <ButtonContainer onClick={handleClick} id={id}>
        <IconWithTextButton
          text={text}
          iconComponent={
            <Bookmark type={iconType} releaseBranch={releaseBranch} />
          }
          theme={theme}
          hideText={hideText}
        />
      </ButtonContainer>
    )
  }
  const onClickButton = isBookmarked => {
    const text = isBookmarked ? '已取消收藏' : '已收藏'
    toastr({ text, timeout: 3000 })
  }

  return (
    <React.Fragment>
      <BookmarkWidget
        toAutoCheck={true}
        articleMeta={articleMeta}
        renderIcon={renderIcon}
      />
    </React.Fragment>
  )
}
BookmarkBlock.propTypes = {
  articleMeta: predefinedProps.tools.articleMetaForBookmark,
}

const BackToTopic = ({ backToTopic }) => {
  const { hideText } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext

  return (
    <DynamicComponentsContext.Consumer>
      {components => (
        <components.Link to={backToTopic} target="_self">
          <ButtonContainer>
            <IconWithTextButton
              text="前往專題"
              iconComponent={<Topic releaseBranch={releaseBranch} />}
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
  const { hideText } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
  const anchorScrollAttr = { [ARTICLE_ANCHOR_SCROLL]: 'true' }

  return (
    <ButtonContainer>
      <a href={`#${RELATED_POST_ANCHOR_ID}`} {...anchorScrollAttr}>
        <IconWithTextButton
          text="相關文章"
          iconComponent={<Article releaseBranch={releaseBranch} />}
          theme={theme}
          hideText={hideText}
        />
      </a>
    </ButtonContainer>
  )
}

const ToolBar = ({
  backToTopic,
  fbAppID = defaultFbAppID,
  articleMetaForBookmark,
  onFontLevelChange,
  className,
}) => {
  const [scrollDirection, setScrollDirection] = useState('init')
  const [hideToolBar, setHideToolBar] = useState(false)
  useEffect(() => {
    const scrollThreshold = 8 // Threshold to check scrollDirection
    const hideThreshold = 16 // Threshold to hide toolbar
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      if (_.isNil(lastScrollY)) {
        ticking = false
        return
      }

      const scrollDistance = Math.abs(scrollY - lastScrollY)

      if (scrollDistance < scrollThreshold) {
        ticking = false
        return
      }

      const newScrollDirection = scrollY > lastScrollY ? 'down' : 'up'
      setScrollDirection(newScrollDirection)

      if (scrollDistance > hideThreshold) {
        setHideToolBar(newScrollDirection === 'down')
      }

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
  const theme =
    themeContext.name === themeConst.article.v2.photo ? 'photography' : 'normal'
  const { bgColor, shadow } = getToolBarTheme(themeContext.name)
  const { showSnackBar, snackBarText, toastr } = useSnackBar()
  const backToTopicJSX = backToTopic ? (
    <BackToTopic backToTopic={backToTopic} />
  ) : null
  const hideText = scrollDirection === 'down'
  const contextValue = { hideText, toastr }

  return (
    <ToolBarContext.Provider value={contextValue}>
      <ToolBarContainer
        bgColor={bgColor}
        shadow={shadow}
        hideText={hideText}
        className={className}
        isHidden={hideToolBar}
      >
        <FontLevel changeFontLevel={onFontLevelChange} />
        <ShareBy fbAppID={fbAppID} />
        <BookmarkBlock articleMeta={articleMetaForBookmark} />
        <RelatedPost />
        {backToTopicJSX}
        <SnackBarContainer showSnackBar={showSnackBar}>
          <SnackBar text={snackBarText} theme={theme} />
        </SnackBarContainer>
      </ToolBarContainer>
    </ToolBarContext.Provider>
  )
}
ToolBar.propTypes = predefinedProps.tools

export default ToolBar
