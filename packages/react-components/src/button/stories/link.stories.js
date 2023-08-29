import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import Link from '../components/link'
import { P2 } from '../../text/paragraph'
import { H4 } from '../../text/headline'

export default {
  title: 'Button/Link',
  component: Link,
  argTypes: {
    type: getRadioArg(Link.Type, Link.Type.DEFAULT),
    // textComponent is only for storybook showcase, not real props
    textComponent: {
      defaultValue: 'P2',
      options: ['not assign', 'P2', 'H4'],
      control: { type: 'radio' },
    },
  },
}

const Template = args => <Link {...args} />

export const link = Template.bind({})
link.args = {
  text: '文字',
  type: Link.Type.DEFAULT,
  link: { to: 'https://www.twreporter.org' },
}
link.parameters = { controls: { exclude: ['textComponent'] } }

export const changeTextComponent = args => {
  if (args.textComponent === 'P2') {
    args.TextComponent = P2
  }
  if (args.textComponent === 'H4') {
    args.TextComponent = H4
  }

  return <Link {...args} />
}
changeTextComponent.args = {
  text: '文字',
  type: Link.Type.DEFAULT,
  textComponent: 'P2',
  link: { to: 'https://www.twreporter.org' },
}
changeTextComponent.parameters = {
  controls: { exclude: ['TextComponent'] },
}

export const disabledLink = Template.bind({ disabled: true })
disabledLink.args = {
  text: '文字',
  type: Link.Type.DEFAULT,
  link: { to: 'https://www.twreporter.org' },
}
disabledLink.parameters = { controls: { exclude: ['textComponent'] } }
