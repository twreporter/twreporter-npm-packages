import React from 'react'
import styled from 'styled-components'
import ArticleCard from '../components/article-card'
import {
  BRANCH_STORYBOOK_ARG_TYPE,
  SIZE_STORYBOOK_ARG_TYPE,
} from '../../storybook/constants'
import { SIZE } from '@twreporter/core/lib/constants/size'
import { BRANCH } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Card/Article',
  component: ArticleCard,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    size: SIZE_STORYBOOK_ARG_TYPE,
  },
}

const Container = styled.div`
  width: ${props => (props.size === SIZE.S ? '343' : '878')}px;
`

export const article = args => (
  <Container size={args.size}>
    <ArticleCard {...args} />
  </Container>
)
article.args = {
  size: SIZE.L,
  title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題',
  description:
    '文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述',
  category: '主分類',
  date: '2022/01/01',
  image: {
    src:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/220px-Google_Images_2015_logo.svg.png',
    alt: 'test',
  },
  releaseBranch: BRANCH.master,
}
