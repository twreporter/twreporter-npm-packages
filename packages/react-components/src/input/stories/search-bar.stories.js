import React from 'react'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'
import SearchBar from '../components/search-bar'
import {
  BRANCH_STORYBOOK_ARG_TYPE,
  THEME_STORYBOOK_ARG_TYPE,
} from '../../storybook/constants'
import { BRANCH } from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Input/Search Bar',
  component: SearchBar,
  argTypes: {
    widthType: getRadioArg(SearchBar.WidthType, SearchBar.WidthType.FIT),
    releaseBranch: BRANCH_STORYBOOK_ARG_TYPE,
    theme: THEME_STORYBOOK_ARG_TYPE,
  },
}

export const searchBar = props => <SearchBar {...props} />
const onSearch = keyword => window?.alert(`search keyword: ${keyword}`)
const onClose = () => window?.alert('click close !')
searchBar.args = {
  placeholder: '關鍵字搜尋',
  theme: SearchBar.THEME.normal,
  releaseBranch: BRANCH.master,
  onSearch,
  onClose,
  autofocus: false,
  widthType: SearchBar.WidthType.FIT,
}
