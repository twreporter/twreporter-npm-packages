import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
// constants
import cssConst from '../../constants/css'
import predefinedPropTypes from '../../constants/prop-types/body'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

function getQuoteStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.photo:
      return css`
        color: ${colorGrayscale.gray600};
        border-left: ${colorGrayscale.gray400};
      `
    case ARTICLE_THEME.v2.pink:
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        color: ${colorGrayscale.gray600};
        border-left: ${colorGrayscale.gray500};
      `
  }
}

const Quote = styled.blockquote`
  ${(props) => getQuoteStyles(props.theme.name)}
  ${cssConst.linkChildren}

  /* clear default margin */
  margin: 0;

  /* line breaks */
  white-space: pre-wrap;

  line-height: 2.11;
  letter-spacing: 0.6px;
  font-size: ${(props) => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.normal};
  ${mq.mobileOnly`
    padding-left: 16px;
  `}
  ${mq.tabletOnly`
    padding-left: 18px;
  `}
  ${mq.desktopOnly`
    padding-left: 18px;
  `}
  ${mq.hdOnly`
    padding-left: 20px;
  `}
`

export default class Blockquote extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, data } = this.props
    const quote = _.get(data, ['content', 0])
    return quote ? (
      <Quote
        className={className}
        dangerouslySetInnerHTML={{ __html: quote }}
      />
    ) : null
  }
}
