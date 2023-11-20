/* eslint react/display-name:0 */
import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { P1, P2, P3, P4 } from '../paragraph'
import { Weight } from '../enums'

export default {
  title: 'Text/Paragraph',
  component: P1,
  argTypes: {
    weight: getRadioArg(Weight, Weight.NORMAL),
  },
}

const defaultText = '內文「內文」：內文，《內文》內文English內文123內文？'
const defaultWeight = P1.Weight.NORMAL

export const p1 = {
  args: { text: defaultText, weight: defaultWeight },
  parameters: { controls: { exclude: ['className'] } },
}

export const p2 = {
  render: args => <P2 {...args} />,
  args: { text: defaultText, weight: defaultWeight },
  parameters: { controls: { exclude: ['className'] } },
}

export const p3 = {
  render: args => <P3 {...args} />,
  args: { text: defaultText, weight: defaultWeight },
  parameters: { controls: { exclude: ['className'] } },
}

export const p4 = {
  render: args => <P4 {...args} />,
  args: { text: defaultText, weight: defaultWeight },
  parameters: { controls: { exclude: ['className'] } },
}
