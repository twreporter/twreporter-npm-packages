import PropTypes from 'prop-types'
import predefinedPropTypes from '../../constants/prop-types/body'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import styles from '../../constants/css'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const QuoteContent = styled.blockquote`
  /* line breaks */
  white-space: pre-wrap;

  /* clear default margin */
  margin: 0;

  font-weight: ${typography.font.weight.normal};
  font-size: ${props => props.theme.fontSizeOffset + 32}px;
  line-height: 1.56;
  letter-spacing: 1.1px;
  text-align: center;
  color: ${props => props.theme.colors.base.text};
`

const QuoteBy = styled.cite`
  margin: 25px auto 0 auto;
  display: block;
  font-style: normal;
  font-weight: ${typography.font.weight.normal};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  line-height: 1.56;
  letter-spacing: 0.5px;
  text-align: center;
  color: ${props => props.theme.colors.base.text};
  ${styles.linkChildren}
`

const VerticalLine = styled.div`
  width: 2px;
  height: 80px;
  background: ${props => props.theme.colors.primary.support};
  margin: 0 auto 40px auto;
`

export default class CenteredQuote extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { className, data } = this.props
    const content = _.get(data, ['content', 0, 'quote'])
    const by = _.get(data, ['content', 0, 'quoteBy'])
    return content ? (
      <div className={className}>
        <VerticalLine />
        <QuoteContent dangerouslySetInnerHTML={{ __html: content }} />
        {by ? <QuoteBy dangerouslySetInnerHTML={{ __html: by }} /> : null}
      </div>
    ) : null
  }
}
