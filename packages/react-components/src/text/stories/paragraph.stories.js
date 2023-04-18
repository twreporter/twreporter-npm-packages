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

export const p1 = args => <P1 {...args} />
p1.args = { text: defaultText, weight: defaultWeight }
p1.parameters = { controls: { exclude: ['className'] } }

export const p2 = args => <P2 {...args} />
p2.args = { text: defaultText, weight: defaultWeight }
p2.parameters = { controls: { exclude: ['className'] } }

export const p3 = args => <P3 {...args} />
p3.args = { text: defaultText, weight: defaultWeight }
p3.parameters = { controls: { exclude: ['className'] } }

export const p4 = args => <P4 {...args} />
p4.args = { text: defaultText, weight: defaultWeight }
p4.parameters = { controls: { exclude: ['className'] } }
