import React from 'react'
import SearchBar from '../components/search-bar'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'
const { master, staging, preview, release } = releaseBranch

export default {
  title: 'Input/Search Bar',
  component: SearchBar,
  argTypes: {
    releaseBranch: {
      defaultValue: master,
      options: [master, staging, preview, release],
      control: { type: 'radio' },
    },
  },
}

export const searchBar = props => <SearchBar {...props} />
const onSearch = keyword => window?.alert(`search keyword: ${keyword}`)
const onClose = () => window?.alert('click close !')
searchBar.args = {
  placeholder: '關鍵字搜尋',
  theme: 'normal',
  releaseBranch: master,
  onSearch,
  onClose,
}
