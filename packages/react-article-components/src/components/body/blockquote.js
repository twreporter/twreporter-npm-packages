import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import predefinedPropTypes from '../../constants/prop-types/body'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const Quote = styled.blockquote`
  /* clear default margin */
  margin: 0;

  /* line breaks */
  white-space: pre-wrap;

  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.colors.base.lightText};
  font-size: ${props => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.normal};
  border-left: 2px solid ${props => props.theme.colors.base.line};
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
