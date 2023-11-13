import React from 'react'
import get from 'lodash/get'
import styled, { css } from 'styled-components'
import themeConst from '../../constants/theme'
import typography from '../../constants/typography'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const _ = {
  get,
}

const heading = css`
  /* clear default margin */
  margin: 0;

  font-weight: ${typography.font.weight.bold};

  color: ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return colorGrayscale.gray300
      case themeConst.article.v2.pink:
      case themeConst.article.v2.default:
      default:
        return colorGrayscale.gray800
    }
  }};
`

const StyledH1 = styled.h1`
  ${heading}
  font-size: 34px;
`

const StyledH2 = styled.h2`
  ${heading}
  font-size: 28px;
`

const H1 = props => {
  const content = _.get(props, 'data.content.0', '')
  return (
    <StyledH1
      className={_.get(props, 'className', '')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

const H2 = props => {
  const content = _.get(props, 'data.content.0', '')
  return (
    <StyledH2
      className={_.get(props, 'className', '')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default {
  H1,
  H2,
}
