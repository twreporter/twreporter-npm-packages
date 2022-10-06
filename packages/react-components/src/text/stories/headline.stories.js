import React from 'react'
import { H1, H2, H3, H4, H5, H6 } from '../headline'
import { TYPE, TYPE_STORYBOOK_ARG_TYPE } from '../constants/headline-type'

export default {
  title: 'Text/Headline',
  component: H1,
  argTypes: {
    type: TYPE_STORYBOOK_ARG_TYPE,
  },
}

const defaultText = '標題「標題」：標題，《標題》標題English標題123標題？'
const defaultType = TYPE.default

export const h1 = args => <H1 {...args} />
h1.args = { text: defaultText, type: defaultType }
h1.parameters = { controls: { exclude: ['className'] } }

export const h2 = args => <H2 {...args} />
h2.args = { text: defaultText, type: defaultType }
h2.parameters = { controls: { exclude: ['className'] } }

export const h3 = args => <H3 {...args} />
h3.args = { text: defaultText, type: defaultType }
h3.parameters = { controls: { exclude: ['className'] } }

export const h4 = args => <H4 {...args} />
h4.args = { text: defaultText, type: defaultType }
h4.parameters = { controls: { exclude: ['className'] } }

export const h5 = args => <H5 {...args} />
h5.args = { text: defaultText, type: defaultType }
h5.parameters = { controls: { exclude: ['className'] } }

export const h6 = args => <H6 {...args} />
h6.args = { text: defaultText, type: defaultType }
h6.parameters = { controls: { exclude: ['className'] } }
