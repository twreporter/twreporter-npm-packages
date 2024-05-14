import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import Image from '../../image-with-fallback'
import { P3 } from '../../text/paragraph'
import { H6 } from '../../text/headline'
import Link from '../../customized-link'
// enum
import { Size } from '../../shared-enum'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
import entityPaths from '@twreporter/core/lib/constants/entity-path'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const imageStyle = {
  width: {
    [Size.S]: '48px',
    [Size.L]: '80px',
  },
  height: {
    [Size.S]: '48px',
    [Size.L]: '80px',
  },
  marginLeft: {
    [Size.S]: '8px',
    [Size.L]: '16px',
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
  color: ${colorGrayscale.gray600};
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => metaStyle.marginBottom[props.$size]};
  & > p {
    margin-right: 8px;
  }
  &:last-child {
    margin-right: 0;
  }
  ${(props) => (props.$hide ? `display: none;` : '')}
`

const ImageContainer = styled(FlexGroup)`
  flex: 0 0 auto;
  align-self: center;
  width: ${(props) => imageStyle.width[props.$size]};
  height: ${(props) => imageStyle.height[props.$size]};
  margin-left: ${(props) => imageStyle.marginLeft[props.$size]};
`
const LeftColumn = styled(FlexGroupColumn)`
  flex: 1;
`
const TitleText = styled(H6)`
  color: ${colorGrayscale.gray800};
`

const ShortStory = ({
  title = '',
  date = '',
  image = {},
  category = '',
  size = Size.S,
  releaseBranch = BRANCH.master,
  style = ARTICLE_THEME.v2.default,
  slug = '',
}) => {
  const hideMeta = !category && !date
  const titleJSX = title ? <TitleText text={title} type="article" /> : null
  const dateJSX = date ? <P3 text={date} /> : null
  const categoryJSX = category ? <P3 text={category} /> : null
  const isInteractiveArticle = style === ARTICLE_THEME.v2.interactive
  const link = {
    to: `${
      isInteractiveArticle
        ? entityPaths.interactiveArticle
        : entityPaths.article
    }${slug}`,
    target: isInteractiveArticle ? '_blank' : '',
  }

  const metaJSX = (
    <Meta $hide={hideMeta} $size={size}>
      {categoryJSX}
      {dateJSX}
    </Meta>
  )
  const imageJSX = (
    <ImageContainer $size={size}>
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
          <FlexGroupColumn>{titleJSX}</FlexGroupColumn>
        </LeftColumn>
        {imageJSX}
      </FlexSpaceBetween>
    </Container>
  )
}
ShortStory.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
  }),
  category: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  releaseBranch: BRANCH_PROP_TYPES,
  style: PropTypes.oneOf(Object.values(ARTICLE_THEME.v2)),
  slug: PropTypes.string,
}
ShortStory.Size = Size

export default ShortStory
