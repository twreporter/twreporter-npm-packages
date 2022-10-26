import React from 'react'
import { P1, P2, P3, P4 } from '../paragraph'
import { WEIGHT, WEIGHT_STORYBOOK_ARG_TYPE } from '../constants/font-weight'

export default {
  title: 'Text/Paragraph',
  component: P1,
  argTypes: {
    weight: WEIGHT_STORYBOOK_ARG_TYPE,
  },
}

const defaultText = '內文「內文」：內文，《內文》內文English內文123內文？'
const defaultWeight = WEIGHT.normal

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
