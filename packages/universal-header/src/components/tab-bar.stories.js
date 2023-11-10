/* eslint-disable react/prop-types */
/* eslint react/display-name:0 */
import React from 'react'
import styled from 'styled-components'
import TabBar from './tab-bar'
import HeaderContext from '../contexts/header-context'
import {
  THEME_STORYBOOK_ARG_TYPE,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '../storybook/constants'

export default {
  title: 'Tab Bar',
  component: TabBar,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

const Container = styled.div`
  width: 320px;
`
export const tabBar = {
  render: props => {
    const { theme, releaseBranch } = props
    const context = {
      theme,
      releaseBranch,
      isLinkExternal: true,
    }
    return (
      <HeaderContext.Provider value={context}>
        <Container>
          <TabBar />
        </Container>
      </HeaderContext.Provider>
    )
  },
}
