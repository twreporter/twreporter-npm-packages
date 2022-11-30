import React from 'react'
import Bookmarks from '../bookmarks'

export default {
  title: 'Bookmark/Empty List',
  component: Bookmarks,
}

export const emptyList = () => <Bookmarks />
emptyList.args = {
  bookmarks: [],
  total: 0,
}
