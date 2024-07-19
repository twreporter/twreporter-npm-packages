import React from 'react'
import get from 'lodash/get'
import styled, { css } from 'styled-components'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import {
  H2 as twreporterH2,
  H3 as twreporterH3,
} from '@twreporter/react-components/lib/text/headline'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

const _ = {
  get,
}

const heading = css`
  /* clear default margin */
  margin: 0;
  color: ${(props) => {
    switch (props.theme.name) {
      case ARTICLE_THEME.v2.photo:
        return colorGrayscale.gray300
      case ARTICLE_THEME.v2.pink:
      case ARTICLE_THEME.v2.default:
      default:
        return colorGrayscale.gray800
    }
  }};
`

const StyledH1 = styled(twreporterH2)`
  ${heading}
`

const StyledH2 = styled(twreporterH3)`
  ${heading}
`

const H1 = (props) => {
  const content = _.get(props, 'data.content.0', '')
  const text = content
    .split(/<strong>|<\/strong>/)
    .filter(Boolean)
    .join('')
  return <StyledH1 className={_.get(props, 'className', '')} text={text} />
}

const H2 = (props) => {
  const content = _.get(props, 'data.content.0', '')
  const text = content
    .split(/<strong>|<\/strong>/)
    .filter(Boolean)
    .join('')
  return <StyledH2 className={_.get(props, 'className', '')} text={text} />
}

export default {
  H1,
  H2,
}
