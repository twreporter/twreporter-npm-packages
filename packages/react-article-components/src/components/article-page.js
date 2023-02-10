import DynamicComponentsContext from '../contexts/dynamic-components-context'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { ThemeProvider, css } from 'styled-components'
// components
import Body from './body'
import DesktopAside from './aside/desktop-aside'
import DonationBox from './donation-box'
import License from './license'
import Link from './link'
import Metadata from './aside/metadata'
import ToolBar from './aside/mobile-tool-bar'
import Related from './related'
import SeparationCurve from './separation-curve'
import UIManager from '../managers/ui-manager'
import Tools from './aside/desktop-tools'
// constants
import themeConst from '../constants/theme'
import colorConst from '../constants/color'
import { RELATED_POST_ANCHOR_ID } from '../constants/anchor'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const shiftLeftCss = css`
  position: relative;
  /* 20px is border-(right|left) width of article page */
  width: calc(100% + 20px);
  left: -10px;
`

const BorderBox = styled.div`
  * {
    box-sizing: border-box;
  }
`

const LeadingBlock = styled.div`
  ${shiftLeftCss}
`

const SeprationLine = styled.div`
  ${mq.desktopAndAbove`
    ${props =>
      props.visible
        ? css`
            width: 100%;
            border-bottom: solid 1px ${colorConst.gray40};
            padding-bottom: 60px;
          `
        : css`
            padding-bottom: 30px;
          `}
  `}
`

const BodyBackground = styled.div`
  width: 100%;
  padding-bottom: 80px;

  ${mq.desktopOnly`
    padding-top: 60px;
  `}

  ${mq.hdOnly`
    padding-top: 55px;
  `}
`

const BodyBlock = styled.div`
  position: relative;
  width: 100%;

  ${mq.desktopOnly`
    max-width: 1024px;
    margin: 0 auto;
  `}

  ${mq.hdOnly`
    max-width: 1440px;
    margin: 0 auto;
  `}
`

const DesktopAsideBlock = styled.div`
  ${mq.tabletAndBelow`
    display: none;
  `}

  ${mq.desktopAndAbove`
    position: absolute;
    height: 100%;
  `}

  ${mq.desktopOnly`
    width: 180px;
    left: 28px;
  `}

  ${mq.hdOnly`
    width: 250px;
    left: 53px;
  `}
`

const MetadataAndToolsBlock = styled.div`
  ${mq.mobileOnly`
    padding-top: 33px;
    padding-bottom: 33px;
  `}

  ${mq.tabletOnly`
    padding-top: 60px;
    padding-bottom: 60px;
  `}

  ${mq.desktopAndAbove`
    display: none;
  `}
`

const DesktopToolsBlock = styled.div`
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const MobileToolBar = styled(ToolBar)`
  ${mq.desktopAndAbove`
    display: none;
  `}
`

const ContentBlock = styled.div`
  margin: 0 auto;

  ${mq.tabletAndBelow`
    ${shiftLeftCss}
  `}

  ${mq.desktopOnly`
    width: 550px;
  `}
  ${mq.hdOnly`
    width: 730px;
  `}
`

const StyledSeparationCurve = styled(SeparationCurve)`
  ${mq.desktopAndAbove`
    display: none;
  `}
`

const RelatedBlock = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  width: 100%;

  ${mq.desktopOnly`
    max-width: 1024px;
    margin-top: 60px;
  `}

  ${mq.hdOnly`
    max-width: 1440px;
    margin-top: 90px;
  `}
`

const BackgroundBlock = styled(BorderBox)`
  ${props => getBackgroundBlockStyles(props.theme.name)}

  @media print {
    // Fix background-image printing issue
    -webkit-print-color-adjust: exact; // Chrome/Safari/Edge
    color-adjust: exact; // Firefox

    .hidden-print {
      display: none;
    }

    .avoid-break {
      break-inside: avoid;
    }
  }

  /* border-(right|left) of article page */
  padding-left: 10px;
  padding-right: 10px;
`

function getBackgroundBlockStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.pink:
      return css`
        background-color: ${colorConst.lightPink};
        ${BodyBackground} {
          background-color: ${colorConst.gray20};
        }
      `
    case themeConst.article.v2.photo:
      return css`
        background-color: ${colorConst.darkBlue};
        ${BodyBackground} {
          background-color: ${colorConst.darkBlue};
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        background-color: ${colorConst.gray30};
        ${BodyBackground} {
          background-color: ${colorConst.gray30};
        }
      `
  }
}

const _fontLevel = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

/**
 *  @module Article
 */

/**
 *  Image Object
 *  @typedef {Object} ImageObj
 *  @property {string} url - url of image
 *  @property {number} width - width of image
 *  @property {number} height - height of image
 */

/**
 *  ResizedTargets Object
 *  @typedef {Object} ResizedTargets
 *  @property {ImageObj} desktop
 *  @property {ImageObj} tablet
 *  @property {ImageObj} mobile
 *  @property {ImageObj} tiny
 */

/**
 *  A set of images
 *  @typedef {Object} ImageSet
 *  @property {ResizedTargets} resized_targets - ResizedTargets of HeroImage
 */

/**
 *  Post Object
 *  @typedef {Object} PostObject
 *  @property {string} slug - Slug of post
 *  @property {string} title - Title of post
 *  @property {string} subtitle - Subtitle of post
 *  @property {string} style - Style of post
 *  @property {bool} is_external - Is post a external link
 *  @property {string} published_date - Published date of post
 *  @property {string} hero_image_size - Size of leading image, the value could be
 *  `normal`, `small`, `extend` and `fullscreen`
 *  @property {ImageSet} hero_image - Leading image of post
 *  @property {ImageSet} og_image - og:image
 *  @property {string} og_description - og:description
 */

/**
 *  Topic Object
 *  @typedef {Object} TopicObject
 *  @property {string} slug - Slug of topic
 *  @property {string} shortTitle - Short title of topic
 */

function noop() {}

/**
 *  @exports
 */
export default class Article extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    relatedTopic: PropTypes.object,
    relatedPosts: PropTypes.array,
    fontLevel: PropTypes.oneOf([
      _fontLevel.small,
      _fontLevel.medium,
      _fontLevel.large,
    ]),
    LinkComponent: PropTypes.elementType,
    onFontLevelChange: PropTypes.func,
    hasMoreRelateds: PropTypes.bool,
    loadMoreRelateds: PropTypes.func,
    releaseBranch: predefinedPropTypes.releaseBranch,
  }

  static defaultProps = {
    LinkComponent: Link,
    fontLevel: _fontLevel.small,
    relatedPosts: [],
    relatedTopic: {},
    hasMoreRelateds: false,
    loadMoreRelateds: noop,
    releaseBranch: releaseBranchConsts.master,
  }

  changeFontLevel = () => {
    const { fontLevel, onFontLevelChange } = this.props
    let nextFontLevel = ''
    switch (fontLevel) {
      case _fontLevel.medium: {
        nextFontLevel = _fontLevel.large
        break
      }
      case _fontLevel.large: {
        nextFontLevel = _fontLevel.small
        break
      }
      case _fontLevel.small:
      default: {
        nextFontLevel = _fontLevel.medium
        break
      }
    }

    if (typeof onFontLevelChange === 'function') {
      onFontLevelChange(nextFontLevel)
    }
  }

  getFontSizeOffset(fontLevel) {
    switch (fontLevel) {
      case _fontLevel.medium: {
        return 2
      }
      case _fontLevel.large: {
        return 4
      }
      case _fontLevel.small:
      default: {
        return 0
      }
    }
  }

  render() {
    const {
      LinkComponent,
      fontLevel,
      post,
      relatedPosts,
      relatedTopic,
      hasMoreRelateds,
      loadMoreRelateds,
      releaseBranch,
    } = this.props

    const articleMetaForBookmark = {
      slug: _.get(post, 'slug', ''),
      title: _.get(post, 'title', ''),
      desc: _.get(post, 'og_description', ''),
      thumbnail:
        _.get(post, 'hero_image.resized_targets.mobile.url') ||
        _.get(post, 'og_image.resized_targets.mobile.url', ''),
      is_external: _.get(post, 'is_external', false),
      published_date: _.get(post, 'published_date', ''),
      topicSlug: _.get(relatedTopic, 'slug', ''),
      topicTitle: _.get(relatedTopic, 'title', ''),
    }

    const uiManager = new UIManager(post, relatedTopic)
    const LeadingComponent = uiManager.getLeadingComponent()
    const leadingProps = uiManager.getLeadingComponentProps()
    const backToTopic =
      leadingProps && leadingProps.isTopicPublished
        ? leadingProps.topicHref
        : ''

    // only for tablet and below
    const metadataAndToolsJSX = (
      <MetadataAndToolsBlock>
        <Metadata
          categories={post.categories} // TODO: remove when categorySet integration is done
          categorySet={post.category_set}
          date={post.published_date}
          designers={post.designers}
          photographers={post.photographers}
          tags={post.tags}
          writers={post.writers}
          engineers={post.engineers}
          rawAutherText={post.extend_byline}
        />
        <DesktopToolsBlock>
          <Tools
            articleMetaForBookmark={articleMetaForBookmark}
            backToTopic={backToTopic}
            onFontLevelChange={this.changeFontLevel}
          />
        </DesktopToolsBlock>
      </MetadataAndToolsBlock>
    )

    return (
      <ThemeProvider
        theme={{
          name: _.get(post, 'style', themeConst.article.v2.default),
          colors: uiManager.getThemeColors(),
          fontSizeOffset: this.getFontSizeOffset(fontLevel),
          releaseBranch,
        }}
      >
        <DynamicComponentsContext.Provider value={{ Link: LinkComponent }}>
          <BackgroundBlock>
            <LeadingBlock>
              <LeadingComponent {...leadingProps} />
              <SeprationLine
                visible={uiManager.toRenderSeparationLineBetweenLeadingAndBody()}
              />
            </LeadingBlock>
            <BodyBackground>
              <BodyBlock>
                <MobileToolBar
                  backToTopic={backToTopic}
                  articleMetaForBookmark={articleMetaForBookmark}
                  onFontLevelChange={this.changeFontLevel}
                />
                <DesktopAsideBlock>
                  <DesktopAside
                    backToTopic={backToTopic}
                    categories={post.categories} // TODO: remove when categorySet integration is done
                    categorySet={post.category_set}
                    date={post.published_date}
                    designers={post.designers}
                    photographers={post.photographers}
                    tags={post.tags}
                    writers={post.writers}
                    engineers={post.engineers}
                    rawAutherText={post.extend_byline}
                    onFontLevelChange={this.changeFontLevel}
                    articleMetaForBookmark={articleMetaForBookmark}
                  />
                </DesktopAsideBlock>
                {metadataAndToolsJSX}
                <ContentBlock>
                  <Body
                    key={_.get(post, 'slug', 'article-page-body-key')}
                    brief={_.get(post, 'brief.api_data')}
                    content={_.get(post, 'content.api_data')}
                  />
                </ContentBlock>
                {metadataAndToolsJSX}
              </BodyBlock>
              <DonationBox />
              <License
                license={post.copyright}
                publishedDate={post.published_date}
                id={RELATED_POST_ANCHOR_ID} // current scroll to releated post anchor
              />
              <StyledSeparationCurve />
              <RelatedBlock>
                <Related
                  id={post.id}
                  data={relatedPosts}
                  hasMore={hasMoreRelateds}
                  loadMore={loadMoreRelateds}
                />
              </RelatedBlock>
            </BodyBackground>
          </BackgroundBlock>
        </DynamicComponentsContext.Provider>
      </ThemeProvider>
    )
  }
}
