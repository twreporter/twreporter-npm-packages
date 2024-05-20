import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components'
// constants
import themeConst from '../../constants/theme'
import predefinedProps from '../../constants/prop-types/aside'
// icons
import {
  Topic,
  Bookmark,
  Text,
  Printer,
  Facebook,
  Twitter,
  Line,
} from '@twreporter/react-components/lib/icon'
// @twreporter
import BookmarkWidget from '@twreporter/react-components/lib/bookmark-widget'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorPhoto,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'

function changeFontSizeOffsetToPct(fontSizeOffset) {
  switch (fontSizeOffset) {
    case 2: {
      return '110%'
    }
    case 4: {
      return '120%'
    }
    case 0:
    default: {
      return '100%'
    }
  }
}

const iconBlockCSS = css`
  position: relative;
  cursor: pointer;
  line-height: 1;
  padding: 6px;

  svg {
    width: 18px;
    height: 18px;
    background-color: ${colorGrayscale.gray600};
  }

  &::after {
    position: absolute;
    top: 10px;
    left: 34px;
    color: ${colorGrayscale.gray800};
    font-size: 10px;
    visibility: hidden;
    width: 100px;
  }

  &:hover {
    svg {
      background-color: ${colorGrayscale.gray800};
    }

    &::after {
      visibility: visible;
    }
  }

  ${mq.tabletAndBelow`
    &::after {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }
  `}
`

const TextIconBlock = styled.div`
  ${iconBlockCSS}
  &::after {
    content: '字級大小${props =>
      changeFontSizeOffsetToPct(props.theme.fontSizeOffset)}';
  }
`

const BackToTopicBlock = styled.div`
  ${iconBlockCSS}
  &::after {
    content: '回到專題';
  }
`

const PrintIconBlock = styled.div`
  ${iconBlockCSS}
  &::after {
    content: '列印';
  }
`

const BookmarkIconBlock = styled.div`
  ${iconBlockCSS}
  &::after {
    content: '${props => (props.$isBookmarked ? '取消收藏' : '收藏')}';
  }
`

const ShareIconBlock = styled.div`
  svg {
    width: 18px;
    height: 18px;
    background-color: ${colorGrayscale.gray800};
  }
  background-color: ${colorGrayscale.white};
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  display: flex;
`

const ToolsBlock = styled.div`
  display: flex;

  ${mq.mobileOnly`
    width: calc(300/375*100%);
    margin-left: auto;
    margin-right: auto;
  `}

  ${mq.tabletOnly`
    width: calc(453/768*100%);
    max-width: 453px;
    margin-left: auto;
    margin-right: auto;
    > svg, > div, > a {
      margin-right: 30px;
    }
  `}

  ${mq.tabletAndBelow`
    justify-content: space-between;
  `}

  ${mq.desktopAndAbove`
    width: 36px;
    height: ${props => props.$height || 'auto'};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `}

  ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return css`
          ${ShareIconBlock} {
            background-color: ${colorPhoto.heavy};
            svg {
              background-color: ${colorGrayscale.gray100};
            }
          }
          ${TextIconBlock}, ${BackToTopicBlock}, ${PrintIconBlock}, ${BookmarkIconBlock} {
            svg {
              background-color: ${colorGrayscale.gray100};
            }

            &::after {
              color: ${colorSupportive.pastel};
            }

            &:hover svg{
              background-color: ${colorSupportive.pastel};
            }
          }
        `
      default:
        return ''
    }
  }}
`

function FBShareBT(props) {
  const themeContext = useContext(ThemeContext)
  const { releaseBranch } = themeContext
  const handleClick = () => {
    const currentURL = window.location.href
    const location =
      'https://www.facebook.com/dialog/feed?' +
      'display=page' +
      `&app_id=${props.appID}` +
      `&link=${encodeURIComponent(currentURL)}` +
      `&redirect_uri=${encodeURIComponent('https://www.facebook.com/')}`

    window.open(location, '_blank')
  }

  return (
    <ShareIconBlock id="fb-share">
      <Facebook onClick={handleClick} releaseBranch={releaseBranch} />
    </ShareIconBlock>
  )
}

FBShareBT.propTypes = {
  appID: PropTypes.string.isRequired,
}

function TwitterShareBT(props) {
  const themeContext = useContext(ThemeContext)
  const { releaseBranch } = themeContext
  const handleClick = () => {
    const currentURL = window.location.href
    const location =
      'https://twitter.com/intent/tweet?' +
      `url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(
        document.title + ' #報導者'
      )}`

    window.open(location, '_blank')
  }

  return (
    <ShareIconBlock id="twitter-share">
      <Twitter onClick={handleClick} releaseBranch={releaseBranch} />
    </ShareIconBlock>
  )
}

function LineShareBT(props) {
  const themeContext = useContext(ThemeContext)
  const { releaseBranch } = themeContext
  const handleClick = () => {
    const currentURL = window.location.href
    const location = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      currentURL
    )}`

    window.open(location, '_blank')
  }

  return (
    <ShareIconBlock id="line-share">
      <Line onClick={handleClick} releaseBranch={releaseBranch} />
    </ShareIconBlock>
  )
}

const BookmarkBlock = ({ articleMeta }) => {
  const themeContext = useContext(ThemeContext)
  const { releaseBranch } = themeContext
  const renderIcon = (isBookmarked, addAction, removeAction) => {
    const iconType = isBookmarked ? 'saved' : 'add'
    const id = isBookmarked ? 'remove-bookmark' : 'add-bookmark'
    return (
      <BookmarkIconBlock
        onClick={isBookmarked ? removeAction : addAction}
        $isBookmarked={isBookmarked}
        id={id}
      >
        <Bookmark type={iconType} releaseBranch={releaseBranch} />
      </BookmarkIconBlock>
    )
  }

  return (
    <BookmarkWidget
      toAutoCheck={true}
      articleMeta={articleMeta}
      renderIcon={renderIcon}
    />
  )
}
BookmarkBlock.propTypes = {
  articleMeta: predefinedProps.tools.articleMetaForBookmark,
}

const BackToTopic = ({ backToTopic }) => {
  const themeContext = useContext(ThemeContext)
  const { releaseBranch } = themeContext

  return (
    <DynamicComponentsContext.Consumer>
      {components => (
        <components.Link to={backToTopic} target="_self">
          <BackToTopicBlock>
            <Topic releaseBranch={releaseBranch} />
          </BackToTopicBlock>
        </components.Link>
      )}
    </DynamicComponentsContext.Consumer>
  )
}
BackToTopic.propTypes = {
  backToTopic: predefinedProps.tools.backToTopic,
}

const defaultFbAppID = '962589903815787'

const Tools = ({
  backToTopic,
  fbAppID,
  height,
  onFontLevelChange,
  articleMetaForBookmark,
}) => {
  const themeContext = useContext(ThemeContext)
  const { releaseBranch } = themeContext
  const backToTopicJSX = backToTopic ? (
    <BackToTopic backToTopic={backToTopic} />
  ) : null
  const onPrinterClick = () => window.print()

  return (
    <ToolsBlock $height={height}>
      {backToTopicJSX}
      <BookmarkBlock articleMeta={articleMetaForBookmark} />
      <TextIconBlock>
        <Text onClick={onFontLevelChange} releaseBranch={releaseBranch} />
      </TextIconBlock>
      <PrintIconBlock>
        <Printer onClick={onPrinterClick} releaseBranch={releaseBranch} />
      </PrintIconBlock>
      <FBShareBT appID={fbAppID || defaultFbAppID} />
      <TwitterShareBT />
      <LineShareBT />
    </ToolsBlock>
  )
}
Tools.propTypes = predefinedProps.tools

export default Tools
