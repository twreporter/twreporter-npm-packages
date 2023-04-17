import React from 'react'
import CardList from '../components/card-list'
import {
  BRANCH,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'List/Card',
  component: CardList,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
  },
}

export const card = args => <CardList {...args} />
card.args = {
  data: [
    {
      id: '12345',
      title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題',
      og_description:
        '文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述',
      category_set: [
        { category: { name: '主分類' }, subcategory: { name: '子分類' } },
      ],
      published_date: '2023-02-12T16:00:00Z',
      hero_image: {
        description: 'test',
      },
      slug: 'this-is-a-test-article',
    },
    {
      id: '12347',
      title: '文章標題',
      og_description: '文章描述',
      published_date: '2023-02-12T16:00:00Z',
      hero_image: {
        description: 'test',
      },
      slug: 'this-is-a-test-article-3',
    },
    {
      id: '12346',
      title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題',
      og_description:
        '文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述',
      category_set: [
        { category: { name: '主分類' }, subcategory: { name: '子分類' } },
      ],
      published_date: '2023-02-12T16:00:00Z',
      hero_image: {
        description: 'test',
        resized_targets: {
          mobile: {
            url:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/220px-Google_Images_2015_logo.svg.png',
          },
        },
      },
      slug: 'this-is-a-test-article-2',
    },
  ],
  releaseBranch: BRANCH.master,
}
