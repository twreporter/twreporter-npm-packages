/* eslint react/display-name:0 */
import React from 'react'
import Bookmarks from '../bookmarks'

export default {
  title: 'Bookmark/Empty List',
  component: Bookmarks,
}

export const emptyList = {
  render: () => <Bookmarks />,

  args: {
    bookmarks: [],
    total: 0,
  },
}
