import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import get from 'lodash/get'

// twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '../../constants/prop-types/body'
import cssConsts from '../../constants/css'
import themeConst from '../../constants/theme'
import typography from '../../constants/typography'
import color from '../../constants/color'

const _ = {
  get,
}

const widthCSS = css`
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

const Title = styled.div`
  ${widthCSS}
  color: ${color.gray85};
  line-height: 1.9;
  letter-spacing: 0.7px;
  font-weight: ${typography.font.weight.bold};
  font-size: ${props => props.theme.fontSizeOffset + 20}px;
  margin: 0 auto 21px auto;
`

const Content = styled.div`
  ${widthCSS}

  color: ${color.gray85};
  line-height: 1.75;
  letter-spacing: 0.5px;
  font-weight: ${typography.font.weight.normal};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  margin: 0 auto;
`

function getContainerStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return css`
        &::before,
        &::after {
          background: ${color.brown};
        }
      `
    case themeConst.article.v2.pink:
      return css`
        &::before,
        &::after {
          background: ${color.pink};
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        &::before,
        &::after {
          background: ${color.milkTea};
        }
      `
  }
}

const Container = styled.div`
  ${props => getContainerStyles(props.theme.name)}

  ${cssConsts.linkChildren}

  /* line breaks */
  white-space: pre-wrap;

  background: ${color.white};
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
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, data } = this.props
    const contentHtmlString = _.get(data, ['content', 0, 'body'], '')
    const title = _.get(data, ['content', 0, 'title'], '')

    const anchorRegex = /<a[^>]*>/g
    const mutatedContentHtmlString = contentHtmlString?.replace(
      anchorRegex,
      anchorString => {
        const hashRegex = /href="#/ // TODO: href={"#"}
        const newTabRegex = /target="_blank"/ // TODO: target={"_blank"}

        // Here we replace internal anchor's "target" props with a onclick event handler to achieve:
        // 1. Legacy <a href="#..."> tags inside infobox contain target="_blank" prop,
        //    but we don't want an opened new tab when the anchor is clicked.
        // 2. We need a custom smooth scroll behavior when the anchor is clicked.
        return hashRegex.exec(anchorString)
          ? anchorString.replace(
              newTabRegex,
              `anchor-scroll` // TODO: just add a prop, no replace
            )
          : anchorString
      }
    )

    return mutatedContentHtmlString ? (
      <Container className={className}>
        {title ? <Title>{title}</Title> : null}
        <Content
          dangerouslySetInnerHTML={{ __html: mutatedContentHtmlString }}
        />
      </Container>
    ) : null
  }
}
