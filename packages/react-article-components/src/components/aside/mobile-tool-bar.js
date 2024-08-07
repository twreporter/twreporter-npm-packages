import React, { useState, useContext, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
import { useSelector } from 'react-redux'
// context
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
// constant
import predefinedProps from '../../constants/prop-types/aside'
import {
  ARTICLE_ANCHOR_SCROLL,
  RELATED_POST_ANCHOR_ID,
} from '../../constants/anchor'
// util
import { getToolBarTheme } from './utils/theme'
// @twreporter
import {
  useOutsideClick,
  useBookmark,
} from '@twreporter/react-components/lib/hook'
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
import { BookmarkType } from '@twreporter/react-components/lib/icon/enum'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
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
  opacity: ${(props) => (props.$isShow ? '1' : '0')};
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
  opacity: ${(props) => (props.$showSnackBar ? 1 : 0)};
`

const ToolBarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 8px;
  position: fixed;
  left: 0px;
  bottom: env(safe-area-inset-bottom, 0);
  height: ${(props) => (props.$hideText ? '40px' : '55px')};
  transform: ${(props) =>
    props.$isHidden ? 'translateY(200%)' : 'tanslateY(0%)'};
  transition:
    height 200ms,
    transform 200ms ease-in-out;
  background-color: ${(props) => props.$bgColor};
  border-top: 1px solid ${(props) => props.$borderColor};
  z-index: ${zIndexConst.mobileToolBar};
  ${ShareContainer} {
    background-color: ${(props) => props.$shareByBgColor};
    box-shadow: ${(props) => props.$shadow};
  }
  ${SnackBarContainer} {
    bottom: ${(props) =>
      props.$hideText ? '48px' : '62px'}; //toolbar height + padding 8px
  }
`

const ToolBarContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 560px;
  justify-content: space-evenly;
  align-items: center;
`

const FbShare = ({ appID }) => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
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
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
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
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
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
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
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
  const { hideText, toastr, hideToolBar } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
  const onCopyUrl = (isCopied) => {
    if (!isCopied) {
      return
    }
    toastr({ text: '已複製', timeout: 3000 })
  }
  const onButtonClick = () => setShowState((prevValue) => !prevValue)
  const onClickOutside = () => setShowState(false)
  const ref = useOutsideClick(onClickOutside)
  useEffect(() => {
    if (hideToolBar) {
      setShowState(false)
    }
  }, [hideToolBar])

  return (
    <ButtonContainer ref={ref} onClick={onButtonClick}>
      <IconWithTextButton
        text="分享"
        iconComponent={<Share releaseBranch={releaseBranch} />}
        theme={theme}
        hideText={hideText}
      />
      <OptionContainer $isShow={showOption}>
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
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
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

const BookmarkBlock = ({ articleMeta, bookmarkId }) => {
  const { hideText, toastr } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext
  const { addAction, removeAction } = useBookmark()
  const bookmarkIdFromState = useSelector(
    (state) => state.bookmarkWidget?.bookmark?.id
  )
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [iconType, setIconType] = useState(BookmarkType.ADD)
  const [elementId, setElementId] = useState('add-bookmark')
  const [buttonText, setButtonText] = useState('收藏')

  const handleAddBookmark = () => {
    addAction(articleMeta)
  }

  const handleRemoveBookmark = () => {
    const targetBookmarkId = bookmarkId || bookmarkIdFromState
    removeAction(targetBookmarkId)
    setIsBookmarked(() => false)
  }

  useEffect(() => {
    if (bookmarkId || bookmarkIdFromState) {
      setIsBookmarked(true)
    } else {
      setIsBookmarked(false)
    }
  }, [bookmarkId, bookmarkIdFromState])

  useEffect(() => {
    setIconType(isBookmarked ? BookmarkType.SAVED : BookmarkType.ADD)
    setElementId(isBookmarked ? 'remove-bookmark' : 'add-bookmark')
    setButtonText(isBookmarked ? '已收藏' : '收藏')
  }, [isBookmarked])

  const handleClick = async () => {
    const action = isBookmarked ? handleRemoveBookmark : handleAddBookmark
    try {
      await action()
    } catch (err) {
      console.error('add bookmark fail', err)
    }
    onClickButton(isBookmarked)
  }

  const onClickButton = (isBookmarked) => {
    const text = isBookmarked ? '已取消收藏' : '已收藏'
    toastr({ text, timeout: 3000 })
  }

  return (
    <React.Fragment>
      <ButtonContainer onClick={handleClick} id={elementId}>
        <IconWithTextButton
          text={buttonText}
          iconComponent={
            <Bookmark type={iconType} releaseBranch={releaseBranch} />
          }
          theme={theme}
          hideText={hideText}
        />
      </ButtonContainer>
    </React.Fragment>
  )
}
BookmarkBlock.propTypes = {
  articleMeta: predefinedProps.tools.articleMetaForBookmark,
  bookmarkId: PropTypes.number,
}

const BackToTopic = ({ backToTopic }) => {
  const { hideText } = useContext(ToolBarContext)
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
  const { releaseBranch } = themeContext

  return (
    <DynamicComponentsContext.Consumer>
      {(components) => (
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
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
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
  scrollStage,
  bookmarkId,
}) => {
  const themeContext = useContext(ThemeContext)
  const theme =
    themeContext.name === ARTICLE_THEME.v2.photo ? 'photography' : 'normal'
  const { bgColor, borderColor, shareByBgColor } = getToolBarTheme(
    themeContext.name
  )
  const { showSnackBar, snackBarText, toastr } = useSnackBar()
  const backToTopicJSX = backToTopic ? (
    <BackToTopic backToTopic={backToTopic} />
  ) : null
  const hideText = scrollStage >= 2
  const hideToolBar = scrollStage >= 3
  const contextValue = { hideText, toastr, hideToolBar }

  return (
    <ToolBarContext.Provider value={contextValue}>
      <ToolBarWrapper
        $bgColor={bgColor}
        $shareByBgColor={shareByBgColor}
        $borderColor={borderColor}
        $hideText={hideText}
        className={className}
        $isHidden={hideToolBar}
        id="mobile-tool-bar"
      >
        <ToolBarContainer>
          <FontLevel changeFontLevel={onFontLevelChange} />
          <ShareBy fbAppID={fbAppID} />
          <BookmarkBlock
            articleMeta={articleMetaForBookmark}
            bookmarkId={bookmarkId}
          />
          <RelatedPost />
          {backToTopicJSX}
        </ToolBarContainer>
        <SnackBarContainer $showSnackBar={showSnackBar}>
          <SnackBar text={snackBarText} theme={theme} />
        </SnackBarContainer>
      </ToolBarWrapper>
    </ToolBarContext.Provider>
  )
}
ToolBar.propTypes = {
  ...predefinedProps.tools,
  scrollStage: PropTypes.number,
  bookmarkId: PropTypes.number,
}

export default ToolBar
