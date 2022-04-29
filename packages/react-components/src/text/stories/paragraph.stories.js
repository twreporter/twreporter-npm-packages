import React from 'react'
import { P1, P2, P3, P4 } from '../paragraph'

export default {
  title: 'Text/Paragraph',
  component: P1,
}

const defaultText = '內文「內文」：內文，《內文》內文English內文123內文？'
const defaultWeight = 'normal'

export const p1 = args => <P1 {...args} />
p1.args = { text: defaultText, weight: defaultWeight }

export const p2 = args => <P2 {...args} />
p2.args = { text: defaultText, weight: defaultWeight }

export const p3 = args => <P3 {...args} />
p3.args = { text: defaultText, weight: defaultWeight }

export const p4 = args => <P4 {...args} />
p4.args = { text: defaultText, weight: defaultWeight }
