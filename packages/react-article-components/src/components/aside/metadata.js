import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
// components
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import predefinedProps from '../../constants/prop-types/aside'
import typography from '../../constants/typography'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
import { COLOR_ARTICLE } from '@twreporter/core/lib/constants/color'
import {
  GET_CATEGORY_PATH_FROM_ID,
  GET_SUBCATEGORY_PATH_FROM_ID,
} from '@twreporter/core/lib/constants/category-set'
import { LinkButton } from '@twreporter/react-components/lib/button'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
const _ = {
  get,
  map,
  sortBy,
}

const createLine = (topOrBottom, themeName) => {
  let borderColor = COLOR_ARTICLE.gray50
  if (themeName === ARTICLE_THEME.v2.photo) {
    borderColor = COLOR_ARTICLE.gray10
  }

  return css`
    position: relative;
    border-${topOrBottom}: 0.5px solid ${borderColor};
    padding-${topOrBottom}: 10px;

    &::after {
      content: '';
      border-right: 0.5px solid ${borderColor};
      width: 1px;
      height: 12px;
      ${topOrBottom}: 0;
      right: 0;
      position: absolute;
    }
  `
}

const CategorySetFlexBox = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkContainer = styled.div`
  display: flex;
`

const CategorySetFlex = styled.div`
  ${props => props.isTop && createLine('top', props.theme.name)}
  ${mq.tabletAndBelow`
    padding-right: 10px;
    padding-left: 10px;
  `}
  ${props =>
    props.isCategory
      ? css`
          min-width: 100px;
          flex-basis: 100px;
          padding-left: 10px;
          padding-right: 10px;
          ${mq.desktopAndAbove`
      padding-left: 0px;
      padding-right: 5px;
    `}
          ${mq.desktopOnly`
      min-width: 80px;
      flex-basis: 80px;
    `}
        `
      : css`
          flex-basis: calc(100% - 100px);
          ${mq.desktopOnly`
      flex-basis: calc(100% - 80px);
    `}
          ${mq.desktopAndAbove`
      padding-left: 10px;
      padding-right: 0px;
    `}
        `}
`

const CategoryText = styled.div`
  display: inline-block;
  font-size: 16px;
  line-height: 1;
  padding-left: 5px;

  &:hover {
    padding-bottom: 2px;
    border-width: 0 0 1px 0;
    border-style: solid;
  }
`

const DateSection = styled.div`
  ${props => createLine('top', props.theme.name)}
  font-size: 14px;
  color: ${COLOR_ARTICLE.gray70};
  margin-left: 5px;
  margin-top: 15px;

  &::before {
    content: '刊出日期';
    margin-right: 10px;
  }
`

const AuthorSection = styled.div`
  margin-top: 15px;
  margin-bottom: 45px;
`

const AuthorRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`

const AuthorJobTitle = styled.div`
  font-size: 14px;
  color: ${COLOR_ARTICLE.gray80};
  margin-left: 5px;
  padding-top: 2px;
  line-height: 1;
  flex-shrink: 0;
`

const AuthorNames = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const AuthorName = styled.div`
  font-size: 16px;
  margin-left: 5px;
  line-height: 1;
  padding-bottom: 3px;
  word-break: keep-all;
  vertical-align: top;

  &:hover {
    padding-bottom: 2px;
    border-width: 0 0 1px 0;
    border-style: solid;
  }

  ${mq.mobileOnly`
    display: inline-block;
  `}
`

const RawAuthorText = styled.div`
  font-size: 14px;
  color: ${COLOR_ARTICLE.gray80};
  padding-left: 5px;
`

const AngledSeparationLine = styled.div`
  border-width: 0.5px;
  border-style: solid;
  width: 15px;
  transform: translateY(9px) rotate(-45deg);
  flex-shrink: 0;
`

const TagButton = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 50px;
  padding: 5px 10px 5px 10px;
  font-size: 14px;
  font-weight: ${typography.font.weight.normal};
  margin-bottom: 10px;
  margin-right: 10px;

  &:before {
    content: '#';
  }
`

const TagsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;

  ${props => createLine('bottom', props.theme.name)}
`

const TextLink = styled(LinkButton)``

const MetadataContainer = styled.div`
  ${props => getMetadataContainerStyles(props.theme.name)}
  letter-spacing: 0.4px;

  ${mq.mobileOnly`
    padding-left: 24px;
    padding-right: 24px;
    margin: 0 auto;
  `}

  ${mq.tabletOnly`
    width: 513px;
    margin: 0 auto;
  `}
`

function getMetadataContainerStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.photo:
      return css`
        ${CategoryText}, ${AuthorName} {
          color: ${COLOR_ARTICLE.milkTea};
          &:hover {
            border-color: ${COLOR_ARTICLE.milkTea};
          }
        }
        ${AngledSeparationLine} {
          border-color: ${COLOR_ARTICLE.brown};
        }
        ${TagButton} {
          border-color: ${COLOR_ARTICLE.gray80};
          color: ${COLOR_ARTICLE.gray80};
          &:hover {
            color: ${COLOR_ARTICLE.white};
            border-color: ${COLOR_ARTICLE.white};
          }
        }
        ${TextLink} {
          color: ${COLOR_ARTICLE.milkTea};
        }
      `
    case ARTICLE_THEME.v2.pink:
      return css`
        ${CategoryText}, ${AuthorName} {
          color: ${COLOR_ARTICLE.blue};
          &:hover {
            border-color: ${COLOR_ARTICLE.blue};
          }
        }
        ${AngledSeparationLine} {
          border-color: ${COLOR_ARTICLE.pink};
        }
        ${TagButton} {
          border-color: ${COLOR_ARTICLE.gray80};
          color: ${COLOR_ARTICLE.gray80};
          &:hover {
            background-color: ${COLOR_ARTICLE.white};
          }
        }
        ${TextLink} {
          color: ${COLOR_ARTICLE.blue};
        }
      `
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        ${CategoryText}, ${AuthorName} {
          color: ${COLOR_ARTICLE.brown};
          &:hover {
            border-color: ${COLOR_ARTICLE.brown};
          }
        }
        ${AngledSeparationLine} {
          border-color: ${COLOR_ARTICLE.milkTea};
        }
        ${TagButton} {
          border-color: ${COLOR_ARTICLE.gray80};
          color: ${COLOR_ARTICLE.gray80};
          &:hover {
            background-color: ${COLOR_ARTICLE.white};
          }
        }
        ${TextLink} {
          color: ${COLOR_ARTICLE.brown};
        }
      `
  }
}

const CategorySet = ({ categorySet = [] }) => {
  const categorySetJSX = _.map(categorySet, (set, index) => {
    const genLink = (path, name, isCategory = false) => {
      const link = { to: path, isExternal: false }
      const weight = isCategory
        ? LinkButton.Weight.BOLD
        : LinkButton.Weight.NORMAL
      return (
        <CategorySetFlex isCategory={isCategory} isTop={index === 0}>
          <TextLink link={link} text={name} weight={weight} />
        </CategorySetFlex>
      )
    }
    const categoryPath = GET_CATEGORY_PATH_FROM_ID(set?.category?.id)
    const subcategoryPath = GET_SUBCATEGORY_PATH_FROM_ID(set?.subcategory?.id)
    return categoryPath ? (
      <LinkContainer key={`categorySet-${index}`}>
        {genLink(`/categories/${categoryPath}`, set?.category?.name, true)}
        {subcategoryPath && set?.subcategory?.name
          ? genLink(
              `/categories/${categoryPath}/${subcategoryPath}`,
              set.subcategory.name
            )
          : genLink(`/categories/${categoryPath}`, '全部')}
      </LinkContainer>
    ) : null
  })
  return <CategorySetFlexBox>{categorySetJSX}</CategorySetFlexBox>
}

CategorySet.propTypes = {
  categorySet: PropTypes.array,
}

class Metadata extends PureComponent {
  static propTypes = predefinedProps.metadata

  static defaultProps = {
    categorySet: [],
    tags: [],
    writers: [],
    photographers: [],
    designers: [],
    engineers: [],
    rawAutherText: '',
  }

  renderTagsSection() {
    const { tags } = this.props

    return (
      <TagsSection>
        <DynamicComponentsContext.Consumer>
          {components => {
            return _.map(tags, tag => {
              return (
                <components.Link key={`tag_${tag.id}`} to={`/tags/${tag.id}`}>
                  <TagButton>{tag.name}</TagButton>
                </components.Link>
              )
            })
          }}
        </DynamicComponentsContext.Consumer>
      </TagsSection>
    )
  }

  renderAuthorsRow(label, authors) {
    if (authors.length === 0) {
      return null
    }

    return (
      <AuthorRow>
        <AuthorJobTitle>{label}</AuthorJobTitle>
        <AngledSeparationLine />
        <AuthorNames>
          <DynamicComponentsContext.Consumer>
            {components => {
              return _.map(authors, author => {
                return (
                  <components.Link
                    key={`author_${author.id}`}
                    to={`/authors/${author.id}`}
                  >
                    <AuthorName as="span">{author.name}</AuthorName>
                  </components.Link>
                )
              })
            }}
          </DynamicComponentsContext.Consumer>
        </AuthorNames>
      </AuthorRow>
    )
  }

  renderAuthorsSection() {
    const {
      designers,
      engineers,
      photographers,
      writers,
      rawAutherText,
    } = this.props

    return (
      <AuthorSection>
        {this.renderAuthorsRow('文字', writers)}
        {this.renderAuthorsRow('攝影', photographers)}
        {this.renderAuthorsRow('設計', designers)}
        {this.renderAuthorsRow('工程', engineers)}
        <RawAuthorText>{rawAutherText}</RawAuthorText>
      </AuthorSection>
    )
  }

  render() {
    const { categorySet, date } = this.props
    const dateStr = date
      ? new Date(date).toLocaleString('zh-hant', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      : ''

    return (
      <MetadataContainer>
        <CategorySet categorySet={categorySet} />
        <DateSection>{dateStr}</DateSection>
        {this.renderAuthorsSection()}
        {this.renderTagsSection()}
      </MetadataContainer>
    )
  }
}

export default Metadata
