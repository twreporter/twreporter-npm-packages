import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import Image from '../../image-with-fallback'
import { P1, P2, P3 } from '../../text/paragraph'
import { H4 } from '../../text/headline'
import { Bookmark } from '../../icon'
import { TextButton } from '../../button'
import Link from '../../customized-link'
// enum
import { Size } from '../../shared-enum'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
import entityPaths from '@twreporter/core/lib/constants/entity-path'

const imageStyle = {
  width: {
    [Size.S]: '72px',
    [Size.L]: '216px',
  },
  height: {
    [Size.S]: '72px',
    [Size.L]: '144px',
  },
  marginLeft: {
    [Size.S]: '8px',
    [Size.L]: '32px',
  },
}
const bookmarkStyle = {
  marginTop: {
    [Size.S]: '16px',
    [Size.L]: '8px',
  },
}
const metaStyle = {
  marginBottom: {
    [Size.S]: '4px',
    [Size.L]: '8px',
  },
}

const Container = styled(Link)`
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
`

const FlexGroup = styled.div`
  display: flex;
`
const FlexGroupColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const FlexSpaceBetween = styled(FlexGroup)`
  justify-content: space-between;
`
const Meta = styled(FlexGroup)`
  /* gap: 8px; */
  color: ${colorGrayscale.gray600};
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => metaStyle.marginBottom[props.size]};
  & > p {
    margin-right: 8px;
  }
  &:last-child {
    margin-right: 0;
  }
  ${props => (props.hide ? `display: none;` : '')}
`
const DescContainer = styled.div`
  color: ${colorGrayscale.gray800};
  margin-top: 8px;
  div {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`
const BookmarkContainer = styled(FlexGroup)`
  align-self: flex-end;
  margin-top: ${props => bookmarkStyle.marginTop[props.size]};
`
const ImageContainer = styled(FlexGroup)`
  flex: 0 0 auto;
  align-self: center;
  width: ${props => imageStyle.width[props.size]};
  height: ${props => imageStyle.height[props.size]};
  margin-left: ${props => imageStyle.marginLeft[props.size]};
`
const LeftColumn = styled(FlexGroupColumn)`
  flex: 1;
`
const TitleText = styled(H4)`
  color: ${colorGrayscale.gray800};
`

const ArticleCard = ({
  title = '',
  description = '',
  date = '',
  image = {},
  category = '',
  size = Size.S,
  isBookmarked = false,
  toggleBookmark,
  releaseBranch = BRANCH.master,
  showIsBookmarked = false,
  style = ARTICLE_THEME.v2.default,
  slug = '',
}) => {
  const hideMeta = !category && !date
  const titleJSX = title ? <TitleText text={title} type="article" /> : null
  const dateJSX = date ? <P3 text={date} /> : null
  const categoryJSX = category ? <P3 text={category} /> : null
  const descriptionJSX = description ? (
    size === Size.S ? (
      <P2 text={description} />
    ) : (
      <P1 text={description} />
    )
  ) : null

  const isInteractiveArticle = style === ARTICLE_THEME.v2.interactive
  const link = {
    to: `${
      isInteractiveArticle
        ? entityPaths.interactiveArticle
        : entityPaths.article
    }${slug}`,
    target: isInteractiveArticle ? '_blank' : '',
  }

  const onBookmarkClick = event => {
    event.preventDefault()
    toggleBookmark()
  }

  const bookmarkIcon = (
    <Bookmark
      type={isBookmarked ? Bookmark.Type.SAVED : Bookmark.Type.ADD}
      releaseBranch={releaseBranch}
    />
  )
  const bookmarkButton = (
    <TextButton
      theme={TextButton.THEME.normal}
      style={TextButton.Style.LIGHT}
      leftIconComponent={bookmarkIcon}
      text={isBookmarked ? '已收藏' : '收藏'}
    />
  )
  const bookmarkJSX = showIsBookmarked ? (
    <BookmarkContainer onClick={onBookmarkClick} size={size}>
      {bookmarkButton}
    </BookmarkContainer>
  ) : null

  const metaJSX = (
    <Meta hide={hideMeta} size={size}>
      {categoryJSX}
      {dateJSX}
    </Meta>
  )
  const imageJSX = (
    <ImageContainer size={size}>
      <Image src={image.src} alt={image.alt} releaseBranch={releaseBranch} />
    </ImageContainer>
  )

  if (size === Size.S) {
    return (
      <Container {...link}>
        <FlexGroupColumn>
          <FlexSpaceBetween>
            <FlexGroupColumn>
              {metaJSX}
              {titleJSX}
            </FlexGroupColumn>
            <FlexGroup>{imageJSX}</FlexGroup>
          </FlexSpaceBetween>
          <FlexGroupColumn>
            <DescContainer>{descriptionJSX}</DescContainer>
            {bookmarkJSX}
          </FlexGroupColumn>
        </FlexGroupColumn>
      </Container>
    )
  }

  // L size
  return (
    <Container {...link}>
      <FlexSpaceBetween>
        <LeftColumn>
          {metaJSX}
          <FlexGroupColumn>
            {titleJSX}
            <DescContainer>{descriptionJSX}</DescContainer>
            {bookmarkJSX}
          </FlexGroupColumn>
        </LeftColumn>
        {imageJSX}
      </FlexSpaceBetween>
    </Container>
  )
}
ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
  }),
  category: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  isBookmarked: PropTypes.bool,
  toggleBookmark: PropTypes.func,
  releaseBranch: BRANCH_PROP_TYPES,
  showIsBookmarked: PropTypes.bool,
  style: PropTypes.oneOf(Object.values(ARTICLE_THEME.v2)),
  slug: PropTypes.string,
}
ArticleCard.Size = Size

export default ArticleCard
