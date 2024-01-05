/* eslint react/display-name:0 */
import React from 'react'
import styled from 'styled-components'
// components
import ShortStory from '../components/short-story'
// storybooks
import {
  BRANCH_STORYBOOK_ARG_TYPE,
  SIZE_STORYBOOK_ARG_TYPE,
} from '../../storybook/constants'
// @twreporters
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import { BRANCH } from '@twreporter/core/lib/constants/release-branch'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Card/ShortStory',
  component: ShortStory,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    size: SIZE_STORYBOOK_ARG_TYPE,
    style: getRadioArg(ARTICLE_THEME.v2, ARTICLE_THEME.v2.default),
  },
}

const Container = styled.div`
  width: ${props => (props.size === ShortStory.Size.S ? '343' : '516')}px;
`

export const shortStory = {
  render: args => (
    <Container size={args.size}>
      <ShortStory {...args} />
    </Container>
  ),

  args: {
    size: ShortStory.Size.L,
    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題',
    category: '主分類',
    date: '2022/01/01',
    image: {
      src:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/220px-Google_Images_2015_logo.svg.png',
      alt: 'test',
    },
    releaseBranch: BRANCH.master,
    style: ARTICLE_THEME.v2.default,
    slug: 'a-test-slug',
  },
}
