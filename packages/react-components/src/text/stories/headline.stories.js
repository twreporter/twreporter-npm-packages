/* eslint react/display-name:0 */
import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { H1, H2, H3, H4, H5, H6 } from '../headline'
import { Type } from '../enums'

export default {
  title: 'Text/Headline',
  component: H1,
  argTypes: {
    type: getRadioArg(Type, Type.DEFAULT),
  },
}

const defaultText = '標題「標題」：標題，《標題》標題English標題123標題？'
const defaultType = H1.Type.DEFAULT

export const h1 = {
  args: { text: defaultText, type: defaultType },
  parameters: { controls: { exclude: ['className'] } },
}

export const h2 = {
  render: args => <H2 {...args} />,
  args: { text: defaultText, type: defaultType },
  parameters: { controls: { exclude: ['className'] } },
}

export const h3 = {
  render: args => <H3 {...args} />,
  args: { text: defaultText, type: defaultType },
  parameters: { controls: { exclude: ['className'] } },
}

export const h4 = {
  render: args => <H4 {...args} />,
  args: { text: defaultText, type: defaultType },
  parameters: { controls: { exclude: ['className'] } },
}

export const h5 = {
  render: args => <H5 {...args} />,
  args: { text: defaultText, type: defaultType },
  parameters: { controls: { exclude: ['className'] } },
}

export const h6 = {
  render: args => <H6 {...args} />,
  args: { text: defaultText, type: defaultType },
  parameters: { controls: { exclude: ['className'] } },
}
