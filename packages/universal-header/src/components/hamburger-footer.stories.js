/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import Footer from './hamburger-footer'
import HeaderContext from '../contexts/header-context'
import {
  THEME,
  THEME_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/theme'
import { BRANCH_STORYBOOK_ARG_TYPE } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Hamburger/Footer',
  component: Footer,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const StyledFooter = styled(Footer)`
  width: 375px;
  background-color: ${props => props.bgColor};
  padding: 16px 0;
`
const getBgColor = theme => {
  if (theme === THEME.photography) {
    return {
      bgColor:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #052142',
    }
  }
  return {
    bgColor: 'white',
  }
}
export const footer = props => {
  const { theme, releaseBranch } = props
  const context = {
    theme,
    releaseBranch,
    isLinkExternal: true,
  }
  const { bgColor } = getBgColor(theme)
  return (
    <HeaderContext.Provider value={context}>
      <StyledFooter bgColor={bgColor} />
    </HeaderContext.Provider>
  )
}
footer.parameters = {
  backgrounds: { default: 'white' },
}
