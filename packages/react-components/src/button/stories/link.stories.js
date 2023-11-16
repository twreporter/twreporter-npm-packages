/* eslint react/display-name:0 */
import React from 'react'
import styled from 'styled-components'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import Link, { InheritLinkButton } from '../components/link'
import { P1, P2 } from '../../text/paragraph'
import { H4 } from '../../text/headline'

export default {
  title: 'Button/Link',
  component: Link,
  argTypes: {
    type: getRadioArg(Link.Type, Link.Type.DEFAULT),
    weight: getRadioArg(Link.Weight, Link.Weight.NORMAL),
    // textComponent is only for storybook showcase, not real props
    textComponent: {
      defaultValue: 'P2',
      options: ['not assign', 'P2', 'H4'],
      control: { type: 'radio' },
    },
    // leftWord & rightWord is only for storybook showcase, not real props
    leftWord: {
      defaultValue: '連結左邊的文字',
      control: { type: 'text' },
    },
    rightWord: {
      defaultValue: '連結左邊的文字',
      control: { type: 'text' },
    },
  },
}

export const link = {
  args: {
    text: '文字',
    type: Link.Type.DEFAULT,
    link: { to: 'https://www.twreporter.org' },
  },
  parameters: {
    controls: { exclude: ['textComponent', 'leftWord', 'rightWord'] },
  },
}

export const changeTextComponent = {
  render: args => {
    if (args.textComponent === 'P2') {
      args.TextComponent = P2
    }
    if (args.textComponent === 'H4') {
      args.TextComponent = H4
    }

    return <Link {...args} />
  },

  args: {
    text: '文字',
    type: Link.Type.DEFAULT,
    textComponent: 'P2',
    link: { to: 'https://www.twreporter.org' },
  },

  parameters: {
    controls: { exclude: ['TextComponent', 'leftWord', 'rightWord'] },
  },
}

export const disabledLink = {
  args: {
    text: '文字',
    type: Link.Type.DEFAULT,
    link: { to: 'https://www.twreporter.org' },
    disabled: true,
  },

  parameters: {
    controls: {
      exclude: ['textComponent', 'disabled', 'leftWord', 'rightWord'],
    },
  },
}

const StyledP1 = styled(P1)`
  display: unset;
`
export const linkInParagraph = {
  render: args => (
    <StyledP1>
      {args.leftWord}
      <InheritLinkButton {...args} />
      {args.rightWord}
    </StyledP1>
  ),
  args: {
    text: '文字',
    type: Link.Type.DEFAULT,
    link: { to: 'https://www.twreporter.org' },
    leftWord: '～連結左邊～',
    rightWord: '～連結右邊～',
  },
  parameters: {
    controls: {
      exclude: ['textComponent', 'disabled', 'weight', 'TextComponent'],
    },
  },
}
