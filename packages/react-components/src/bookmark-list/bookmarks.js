import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// components
import Bookmark from './bookmark'
import EmptyState from '../empty-state'
import { H1 } from '../text/headline'
import { P1 } from '../text/paragraph'
import Divider from '../divider'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import corePropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const PageContainer = styled.div`
  padding: 64px 0 120px 0;
  margin: 0;

  ${mq.tabletOnly`
    padding: 32px 0 120px 0;
  `}

  ${mq.mobileOnly`
    padding: 24px 0 120px 0;
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
    padding-right: 1em;
  `}
  padding-bottom: 64px;
  width: stretch;
`

const TitleContainer = styled.div`
  margin-bottom: 16px;
  color: ${colorGrayscale.gray800};
`

const CountContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const CountTitle = styled.div`
  margin-right: 8px;
`
const BookmarksContainer = styled.ul`
  margin: 0;
  width: 100%;
  padding: 0;
`

function Bookmarks({ total, bookmarks, handleDelete, releaseBranch }) {
  const buildBookmark = bookmark => (
    <Bookmark
      key={`bookmark_${_.get(bookmark, 'id')}`}
      bookmark={bookmark}
      handleDelete={handleDelete}
    />
  )
  const counterJSX =
    total === 0 ? (
      ''
    ) : (
      <CountContainer>
        <CountTitle>
          <P1 text="全部" weight="bold" />
        </CountTitle>
        <P1 text={total} weight="bold" />
      </CountContainer>
    )
  const contentJSX =
    total === 0 ? (
      <EmptyState releaseBranch={releaseBranch} />
    ) : (
      <BookmarksContainer>{_.map(bookmarks, buildBookmark)}</BookmarksContainer>
    )
  return (
    <PageContainer>
      <Column>
        <StatusBar>
          <TitleContainer>
            <H1 text="我的書籤" />
          </TitleContainer>
          {counterJSX}
          <Divider />
        </StatusBar>
        {contentJSX}
      </Column>
    </PageContainer>
  )
}

Bookmarks.defaultProps = {
  bookmarks: [],
  total: 0,
  releaseBranch: releaseBranchConsts.master,
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.arrayOf(corePropTypes.bookmark).isRequired,
  handleDelete: PropTypes.func.isRequired,
  total: PropTypes.number,
  releaseBranch: corePropTypes.releaseBranch,
}

export default Bookmarks
