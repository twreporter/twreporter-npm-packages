import PropTypes from 'prop-types'
import predefinedPropTypes from '../../constants/prop-types/body'
import React from 'react'
import styled, { css } from 'styled-components'
import styles from '../../constants/css'
import themeConst from '../../constants/theme'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const P = styled.p`
  ${styles.paragraphText}
  ${styles.linkChildren}

  ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return css`
          strong {
            color: rgba(255, 255, 255, 0.9);
          }
        `
      default:
        return ''
    }
  }}
`

export default function Paragraph({ className, data }) {
  const innerHtmlString = _.get(data, ['content', 0])
  return innerHtmlString ? (
    <P
      className={className}
      dangerouslySetInnerHTML={{ __html: innerHtmlString }}
    />
  ) : null
}

Paragraph.propTypes = {
  className: PropTypes.string,
  data: predefinedPropTypes.elementData,
}

Paragraph.defaultProps = {
  className: '',
}
