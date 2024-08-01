import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import get from 'lodash/get'

// constants
import predefinedPropTypes from '../../constants/prop-types/body'
import cssConsts from '../../constants/css'
import typography from '../../constants/typography'
import { ARTICLE_ANCHOR_SCROLL } from '../../constants/anchor'

// twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

const _ = {
  get,
}

const articleBodyWidthCSS = css`
  ${mq.mobileOnly`
    width: calc(248/300*100%);
  `}

  ${mq.tabletOnly`
    width: 445px;
  `}

  ${mq.desktopOnly`
    width: 480px;
  `}

  ${mq.hdOnly`
    width: 580px;
  `}
`

const trackingSectionWidthCSS = css`
  ${mq.mobileOnly`
    width: 256px;
  `}

  ${mq.tabletOnly`
    width: 386px;
  `}

  ${mq.desktopAndAbove`
    width: 476px;
  `}
`

const Title = styled.div`
  ${(props) =>
    props.$forTrackingSection ? trackingSectionWidthCSS : articleBodyWidthCSS}
  color: ${colorGrayscale.gray700};
  line-height: 1.9;
  letter-spacing: 0.7px;
  font-weight: ${typography.font.weight.bold};
  font-size: ${(props) => props.theme.fontSizeOffset + 20}px;
  margin: 0 auto 21px auto;
`

const Content = styled.div`
  ${(props) =>
    props.$forTrackingSection ? trackingSectionWidthCSS : articleBodyWidthCSS}

  color: ${colorGrayscale.gray700};
  line-height: 1.75;
  letter-spacing: 0.5px;
  font-weight: ${typography.font.weight.normal};
  font-size: ${(props) => props.theme.fontSizeOffset + 16}px;
  margin: 0 auto;
`

function getContainerStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.photo:
      return css`
        &::before,
        &::after {
          background: ${colorSupportive.heavy};
        }
      `
    case ARTICLE_THEME.v2.pink:
      return css`
        &::before,
        &::after {
          background: ${COLOR_PINK_ARTICLE.pink};
        }
      `
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        &::before,
        &::after {
          background: ${colorSupportive.main};
        }
      `
  }
}

const Container = styled.div`
  ${(props) => getContainerStyles(props.theme.name)}

  ${cssConsts.linkChildren}

  /* line breaks */
  white-space: pre-wrap;

  background: ${colorGrayscale.white};
  position: relative;
  margin: 60px auto 0 auto;
  ${mq.tabletAndBelow`
    padding-top: 30px;
    padding-bottom: 30px;
  `}
  ${mq.desktopAndAbove`
    padding-top: 40px;
    padding-bottom: 40px;
  `}
  &::before {
    /* sides of the triangle: 58 48 33 */
    content: '';
    display: block;
    width: 58px;
    height: 1px;
    transform: rotate(34.51deg);
    transform-origin: right center;
    position: absolute;
    right: -15px;
    top: 28px;
  }
  &::after {
    /*
      sides of the triangle: 58 48 33 (px)
      translate hori: -6, verti: 11 (px)
    */
    content: '';
    display: block;
    width: 58px;
    height: 1px;
    transform: rotate(34.51deg);
    transform-origin: left center;
    position: absolute;
    left: -6px;
    bottom: 22px;
  }
`

export default class Infobox extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
    forTrackingSection: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    forTrackingSection: false,
  }

  render() {
    const { className, data, forTrackingSection } = this.props
    const contentHtmlString = _.get(data, ['content', 0, 'body'], '')
    const title = _.get(data, ['content', 0, 'title'], '')

    const anchorRegex = /<a([^>]*)>/g
    const hashRegex = /href={?["']#/
    const mutatedContentHtmlString = contentHtmlString?.replace(
      anchorRegex,
      (anchorString, attrs) => {
        // Here we insert a custom attribute 'ARTICLE_ANCHOR_SCROLL' in order to apply
        // smooth scroll effect on <a href="#..."> anchors inside infobox
        return hashRegex.exec(anchorString)
          ? `<a ${ARTICLE_ANCHOR_SCROLL}="true" ${attrs}>`
          : anchorString
      }
    )

    return mutatedContentHtmlString ? (
      <Container className={className} $forTrackingSection={forTrackingSection}>
        {title ? (
          <Title $forTrackingSection={forTrackingSection}>{title}</Title>
        ) : null}
        <Content
          $forTrackingSection={forTrackingSection}
          dangerouslySetInnerHTML={{ __html: mutatedContentHtmlString }}
        />
      </Container>
    ) : null
  }
}
