import { fontWeight } from '@twreporter/core/lib/constants/font'
import Bookmark from './bookmark'
import corePropTypes from '@twreporter/core/lib/constants/prop-types'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const PageContainer = styled.div`
  padding: 50px 0;
  margin: 0;

  ${mq.mobileOnly`
    padding: 25px 0;
  `}
`

const Column = styled.div`
  margin: 0 auto;
  width: 97%;
  max-width: 834px;
  ${mq.tabletOnly`
    width: 100%;
    max-width: 707px;
  `}
  ${mq.mobileOnly`
    width: 100%;
  `}
`

const StatusBar = styled.div`
  ${mq.mobileOnly`
    padding-left: 1em;
  `}
  padding-bottom: 25px;
  width: 100%;
`

const CountTitle = styled.span`
  font-size: 20px;
  ${mq.mobileOnly`
    font-size: 18px;
  `}
  margin-right: 1em;
`
const CountNumber = styled.span`
  font-size: 20px;
  ${mq.mobileOnly`
    font-size: 18px;
  `}
  font-weight: ${fontWeight.bold};
`

const BookmarksContainer = styled.ul`
  margin: 0;
  width: 100%;
  padding: 0;
`

function Bookmarks({ total, bookmarks, handleDelete }) {
  const buildBookmark = bookmark => (
    <Bookmark
      key={`bookmark_${_.get(bookmark, 'id')}`}
      bookmark={bookmark}
      handleDelete={handleDelete}
    />
  )
  return (
    <PageContainer>
      <Column>
        <StatusBar>
          <CountTitle>全部</CountTitle>
          <CountNumber>{total}</CountNumber>
        </StatusBar>
        <BookmarksContainer>
          {_.map(bookmarks, buildBookmark)}
        </BookmarksContainer>
      </Column>
    </PageContainer>
  )
}

Bookmarks.defaultProps = {
  bookmarks: [],
  total: 0,
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.arrayOf(corePropTypes).isRequired,
  handleDelete: PropTypes.func.isRequired,
  total: PropTypes.number,
}

export default Bookmarks
