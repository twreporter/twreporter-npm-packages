import React from 'react'
import SearchBar from '../components/search-bar'
import {
  BRANCH,
  BRANCH_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/release-branch'
import {
  THEME,
  THEME_STORYBOOK_ARG_TYPE,
} from '@twreporter/core/lib/constants/theme'

export default {
  title: 'Input/Search Bar',
  component: SearchBar,
  argTypes: {
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    theme: THEME_STORYBOOK_ARG_TYPE,
  },
}

export const searchBar = props => <SearchBar {...props} />
const onSearch = keyword => window?.alert(`search keyword: ${keyword}`)
const onClose = () => window?.alert('click close !')
searchBar.args = {
  placeholder: '關鍵字搜尋',
  theme: THEME.normal,
  releaseBranch: BRANCH.master,
  onSearch,
  onClose,
  autofocus: false,
  widthType: 'fit',
}
