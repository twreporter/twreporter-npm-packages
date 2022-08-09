import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/aside'
import sortBy from 'lodash/sortBy'
import styled, { css } from 'styled-components'
import themeConst from '../../constants/theme'
import colorConst from '../../constants/color'
import typography from '../../constants/typography'
import { idToPathSegment } from '../../constants/category'
import enableCategorySet from '../../constants/feature-flag'

const _ = {
  get,
  map,
  sortBy,
}

const createLine = (topOrBottom, themeName) => {
  let borderColor = colorConst.gray50
  if (themeName === themeConst.article.v2.photo) {
    borderColor = colorConst.gray10
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

const CategoryFlexBox = styled.div`
  display: flex;
`

const CategoryFlex = styled.div`
  ${props => createLine('top', props.theme.name)}
  flex-grow: ${props => props.flexGrow};

  ${mq.tabletAndBelow`
    padding-right: 15px;
    padding-left: 15px;
  `}

  ${mq.desktopAndAbove`
    padding-right: 5px;
    padding-left: 5px;
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
  color: ${colorConst.gray70};
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
  color: ${colorConst.gray80};
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
  color: ${colorConst.gray80};
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

const MetadataContainer = styled.div`
  ${props => getMetadataContainerStyles(props.theme.name)}
  letter-spacing: 0.4px;

  ${mq.mobileOnly`
    width: calc(300/355*100%);
    margin: 0 auto;
  `}

  ${mq.tabletOnly`
    width: 513px;
    margin: 0 auto;
  `}
`

function getMetadataContainerStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return css`
        ${CategoryText}, ${AuthorName} {
          color: ${colorConst.milkTea};
          &:hover {
            border-color: ${colorConst.milkTea};
          }
        }
        ${AngledSeparationLine} {
          border-color: ${colorConst.brown};
        }
        ${TagButton} {
          border-color: ${colorConst.gray80};
          color: ${colorConst.gray80};
          &:hover {
            color: ${colorConst.white};
            border-color: ${colorConst.white};
          }
        }
      `
    case themeConst.article.v2.pink:
      return css`
        ${CategoryText}, ${AuthorName} {
          color: ${colorConst.blue};
          &:hover {
            border-color: ${colorConst.blue};
          }
        }
        ${AngledSeparationLine} {
          border-color: ${colorConst.pink};
        }
        ${TagButton} {
          border-color: ${colorConst.gray80};
          color: ${colorConst.gray80};
          &:hover {
            background-color: ${colorConst.white};
          }
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        ${CategoryText}, ${AuthorName} {
          color: ${colorConst.brown};
          &:hover {
            border-color: ${colorConst.brown};
          }
        }
        ${AngledSeparationLine} {
          border-color: ${colorConst.milkTea};
        }
        ${TagButton} {
          border-color: ${colorConst.gray80};
          color: ${colorConst.gray80};
          &:hover {
            background-color: ${colorConst.white};
          }
        }
      `
  }
}

class Metadata extends PureComponent {
  static propTypes = predefinedProps.metadata

  static defaultProps = {
    categories: [],
    categorySet: [],
    tags: [],
    writers: [],
    photographers: [],
    designers: [],
    engineers: [],
    rawAutherText: '',
  }

  renderCategorySection() {
    const { categories } = this.props

    _.sortBy(categories, ['sort_order'])

    return (
      <CategoryFlexBox>
        <DynamicComponentsContext.Consumer>
          {components => {
            const numOfCats = _.get(categories, 'length', 0)
            const categoriesJSX = _.map(categories, (cat, index) => {
              // if only one category,
              // then `flexGrow = 1`,
              // which makes flex item fill the flex box.
              const flexGrow = numOfCats === 1 ? 1 : index
              return (
                <CategoryFlex key={`category_${cat.id}`} flexGrow={flexGrow}>
                  <components.Link
                    to={`/categories/${idToPathSegment[cat.id]}`}
                  >
                    <CategoryText
                      style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
                    >
                      {cat.name}
                    </CategoryText>
                  </components.Link>
                </CategoryFlex>
              )
            })
            return categoriesJSX
          }}
        </DynamicComponentsContext.Consumer>
      </CategoryFlexBox>
    )
  }

  renderCategorySetSection() {
    // TODO: render categorySet
    // const { categorySet } = this.props
    return <div>Hello</div>
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
    const date = this.props.date
      ? new Date(this.props.date).toLocaleString('zh-hant', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      : ''

    return (
      <MetadataContainer>
        {this.renderCategorySection()}
        {enableCategorySet && this.renderCategorySetSection()}
        <DateSection>{date}</DateSection>
        {this.renderAuthorsSection()}
        {this.renderTagsSection()}
      </MetadataContainer>
    )
  }
}

export default Metadata
