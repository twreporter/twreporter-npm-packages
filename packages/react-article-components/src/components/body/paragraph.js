import PropTypes from 'prop-types'
import predefinedPropTypes from '../../constants/prop-types/body'
import React from 'react'
import styled from 'styled-components'
import styles from '../../constants/css'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const P = styled.p`
  ${styles.paragraphText}
  ${styles.linkChildren}
`

export default function Paragraph({ className, data }) {
  // still create space for empty block
  let innerHtmlString = _.get(data, ['content', 0])
  innerHtmlString = innerHtmlString || '&nbsp;'

  return (
    <P
      className={className}
      dangerouslySetInnerHTML={{ __html: innerHtmlString }}
    />
  )
}

Paragraph.propTypes = {
  className: PropTypes.string,
  data: predefinedPropTypes.elementData,
}

Paragraph.defaultProps = {
  className: '',
}
