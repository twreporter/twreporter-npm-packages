import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
// constants
import predefinedPropTypes from '../../constants/prop-types/body'
import styles from '../../constants/css'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const P = styled.p`
  ${styles.paragraphText}
  ${styles.linkChildren}

  ${(props) =>
    props.$forTrackingSection
      ? `font-size: ${props.theme.fontSizeOffset + 16}px`
      : ''};
  ${(props) => {
    switch (props.theme.name) {
      case ARTICLE_THEME.v2.photo:
        return css`
          strong {
            color: ${colorGrayscale.gray300};
          }
        `
      default:
        return ''
    }
  }}
`

export default function Paragraph({
  className = '',
  data,
  forTrackingSection = false,
}) {
  const innerHtmlString = _.get(data, ['content', 0])
  return innerHtmlString ? (
    <P
      className={className}
      dangerouslySetInnerHTML={{ __html: innerHtmlString }}
      $forTrackingSection={forTrackingSection}
    />
  ) : null
}

Paragraph.propTypes = {
  className: PropTypes.string,
  data: predefinedPropTypes.elementData,
  forTrackingSection: PropTypes.bool,
}
