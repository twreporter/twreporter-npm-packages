import BookmarkWidget from '@twreporter/react-components/lib/bookmark-widget'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/aside'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import themeConst from '../../constants/theme'
// icons
import BackToTopicIcon from '../../assets/aside/back-to-topic.svg'
import FBIcon from '../../assets/aside/share-fb.svg'
import LineIcon from '../../assets/aside/share-line.svg'
import PrintIcon from '../../assets/aside/tool-print.svg'
import TextIcon from '../../assets/aside/tool-text.svg'
import TwitterIcon from '../../assets/aside/share-twitter.svg'
// bookmark icons
import ToAddBookmarkIcon from '../../assets/aside/add-bookmark.svg'
import AddedBookmarkIcon from '../../assets/aside/added-bookmark.svg'

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

  svg {
    width: 36px;
    height: 36px;
  }

  &::after {
    position: absolute;
    top: 5px;
    color: #262626;
    font-size: 14px;
    line-height: 23px;
    visibility: hidden;
    width: 100px;
  }

  &:hover {
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
    content: '${props => (props.isBookmarked ? '取消書籤' : '加入書籤')}';
  }
`

const ShareIconBlock = styled.div`
  width: 36px;
  height: 36px;
  padding: 3px;
  cursor: pointer;
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
    height: ${props => props.height || 'auto'};
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `}

  ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return css`
          ${ShareIconBlock} {
            svg circle:first-child {
              fill: rgba(255, 255, 255, 0.08);
            }
            svg path {
              fill: rgba(255, 255, 255, 0.8);
            }
          }
          ${TextIconBlock}, ${BackToTopicBlock}, ${PrintIconBlock}, ${BookmarkIconBlock} {
            svg circle:first-child {
              fill: #08192d;
            }

            svg path {
              fill: rgba(255, 255, 255, 0.8);
            }

            &::after {
              color: rgba(255, 255, 255, 0.8);
            }
          }

          ${BackToTopicBlock} {
            svg circle:not(:first-child) {
              fill: rgba(255, 255, 255, 0.8);
            }
          }
        `
      default:
        return ''
    }
  }}
`

function FBShareBT(props) {
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
    <ShareIconBlock>
      <FBIcon width="30px" onClick={handleClick} />
    </ShareIconBlock>
  )
}

FBShareBT.propTypes = {
  appID: PropTypes.string.isRequired,
}

function TwitterShareBT(props) {
  const handleClick = () => {
    const currentURL = window.location.href
    const location =
      'https://twitter.com/intent/tweet?' +
      `url=${encodeURIComponent(currentURL)}`

    window.open(location, '_blank')
  }

  return (
    <ShareIconBlock>
      <TwitterIcon width="30px" onClick={handleClick} />
    </ShareIconBlock>
  )
}

function LineShareBT(props) {
  const handleClick = () => {
    const currentURL = window.location.href
    const location = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      currentURL
    )}`

    window.open(location, '_blank')
  }

  return (
    <ShareIconBlock>
      <LineIcon width="30px" onClick={handleClick} />
    </ShareIconBlock>
  )
}

const defaultFbAppID = '962589903815787'

export default class Tools extends React.PureComponent {
  static propTypes = predefinedProps.tools

  render() {
    const {
      backToTopic,
      fbAppID,
      height,
      onFontLevelChange,
      articleMetaForBookmark,
    } = this.props

    return (
      <ToolsBlock height={height}>
        {backToTopic ? (
          <DynamicComponentsContext.Consumer>
            {components => {
              return (
                <components.Link to={backToTopic} target="_self">
                  <BackToTopicBlock>
                    <BackToTopicIcon />
                  </BackToTopicBlock>
                </components.Link>
              )
            }}
          </DynamicComponentsContext.Consumer>
        ) : null}
        <BookmarkWidget
          articleMeta={articleMetaForBookmark}
          renderIcon={(isBookmarked, addAction, removeAction) => {
            return (
              <BookmarkIconBlock
                onClick={isBookmarked ? removeAction : addAction}
                isBookmarked={isBookmarked}
              >
                {isBookmarked ? <AddedBookmarkIcon /> : <ToAddBookmarkIcon />}
              </BookmarkIconBlock>
            )
          }}
        />
        <TextIconBlock>
          <TextIcon onClick={onFontLevelChange} />
        </TextIconBlock>
        <PrintIconBlock>
          <PrintIcon
            onClick={() => {
              window.print()
            }}
          />
        </PrintIconBlock>
        <FBShareBT appID={fbAppID || defaultFbAppID} />
        <TwitterShareBT />
        <LineShareBT />
      </ToolsBlock>
    )
  }
}
