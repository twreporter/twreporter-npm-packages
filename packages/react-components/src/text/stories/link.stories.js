import React from 'react'
import TextLink from '../link'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Text/Link',
  component: TextLink,
  argTypes: {
    theme: {
      defaultValue: ARTICLE_THEME.v2.default,
      options: [
        ARTICLE_THEME.v2.default,
        ARTICLE_THEME.v2.pink,
        ARTICLE_THEME.v2.photo,
      ],
      control: { type: 'radio' },
    },
  },
}

const Template = args => <TextLink {...args} />
export const textLink = Template.bind({})
textLink.args = {
  name: '分類',
  path: '/categories/human_rights_and_society',
  theme: ARTICLE_THEME.v2.default,
  isBold: true,
}
