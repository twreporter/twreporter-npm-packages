/* eslint react/display-name:0 */
import React from 'react'
import Title2 from '../components/title2'
import TextButton from '../../button/components/textButton'
import { Arrow } from '../../icon'

export default {
  title: 'Title Bar/Title 2',
  component: Title2,
  argTypes: {
    // showButton is only for storybook check
    showButton: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
}

export const title2 = {
  render: args => {
    args.renderButton = args.showButton
      ? size => (
          <TextButton
            text="RWD 按鈕"
            rightIconComponent={<Arrow direction="right" />}
            size={size}
          />
        )
      : null
    return <Title2 {...args} />
  },

  args: {
    title: 'RWD 標題',
    subtitle: '副標',
    showButton: true,
  },

  parameters: {
    controls: { exclude: ['renderButton'] },
  },
}
