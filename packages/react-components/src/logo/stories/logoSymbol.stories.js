import React from 'react'
import LogoSymbol from '../components/logo-symbol'
import { BRANCH_STORYBOOK_ARG_TYPE } from '../../storybook/constants'

export default {
  title: 'Logo/Symbol',
  component: LogoSymbol,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const symbol = args => <LogoSymbol {...args} />
symbol.args = { type: LogoSymbol.type.DEFAULT }
