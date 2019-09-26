import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/aside'
import sortBy from 'lodash/sortBy'
import styled, { css } from 'styled-components'
import { idToPathSegment } from '../../constants/category'

const _ = {
  get,
  map,
  sortBy,
}

const MetadataContainer = styled.div`
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

const createLine = topOrBottom => {
  return css`
    position: relative;
    border-${topOrBottom}: solid 0.5px #d8d8d8;
    padding-${topOrBottom}: 10px;

    &::after {
      content: '';
      border-right: solid 0.5px #d8d8d8;
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
  ${createLine('top')}
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
  color: ${props => props.theme.colors.primary.text};
  font-size: 16px;
  line-height: 1;
  padding-left: 5px;

  &:hover {
    padding-bottom: 2px;
    border-bottom: 1px solid ${props => props.theme.colors.primary.text};
  }
`

const DateSection = styled.div`
  ${createLine('top')}
  font-size: 14px;
  color: #9c9c9c;
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
  color: #808080;
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
  color: ${props => props.theme.colors.primary.text};
  font-size: 16px;
  margin-left: 5px;
  line-height: 1;
  padding-bottom: 3px;
  word-break: keep-all;
  vertical-align: top;

  &:hover {
    padding-bottom: 2px;
    border-bottom: 1px solid ${props => props.theme.colors.primary.text};
  }

  ${mq.mobileOnly`
    display: inline-block;
  `}
`

const RawAuthorText = styled.div`
  font-size: 14px;
  color: #808080;
  padding-left: 5px;
`

const AngledSeparationLine = styled.div`
  border-bottom: 0.5px solid ${props => props.theme.colors.primary.support};
  width: 15px;
  transform: translateY(9px) rotate(-45deg);
  flex-shrink: 0;
`

const TagButton = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.theme.colors.base.button.border.color};
  border-radius: 50px;
  padding: 5px 10px 5px 10px;
  font-size: 14px;
  font-weight: normal;
  color: ${props => props.theme.colors.base.button.text.color};
  margin-bottom: 10px;
  margin-right: 10px;

  &:before {
    content: '#';
  }

  &:hover {
    color: ${props => props.theme.colors.base.button.hover.text.color};
    border-color: ${props => props.theme.colors.base.button.hover.border.color};
    background-color: ${props =>
      props.theme.colors.base.button.hover.background.color};
  }
`

const TagsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;

  ${createLine('bottom')}
`

class Metadata extends PureComponent {
  static propTypes = predefinedProps.metadata

  static defaultProps = {
    categories: [],
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
        <DateSection>{date}</DateSection>
        {this.renderAuthorsSection()}
        {this.renderTagsSection()}
      </MetadataContainer>
    )
  }
}

export default Metadata
