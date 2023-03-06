import React from 'react'
import Badge from '.'
import { colorBrand } from '@twreporter/core/lib/constants/color'

export default {
  title: 'Badge/Badge',
  component: Badge,
}

const Template = args => <Badge {...args} />
export const badge = Template.bind({})
badge.args = {
  text: '不定期',
  style: { color: colorBrand.heavy },
}
