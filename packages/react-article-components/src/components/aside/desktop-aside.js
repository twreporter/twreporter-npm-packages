import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// components
import Tools from './desktop-tools'
import Metadata from './metadata'
// constants
import predefinedProps from '../../constants/prop-types/aside'

const AsideFlexBox = styled.aside`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ToolsArea = styled.div`
  position: relative;
  flex-grow: 1;
  margin-top: 90px;
  margin-bottom: 90px;
`

const ToolsContainer = styled.div`
  position: sticky;
  top: 40%;
`

const Aside = ({
  articleMetaForBookmark,
  backToTopic,
  categories,
  categorySet,
  date,
  designers,
  engineers,
  onFontLevelChange,
  photographers,
  rawAutherText,
  tags,
  title,
  writers,
  bookmarkId,
}) => {
  const toolsHeight = 258 // px

  const metadataJSX = (
    <Metadata
      categories={categories}
      categorySet={categorySet}
      date={date}
      designers={designers}
      photographers={photographers}
      tags={tags}
      writers={writers}
      engineers={engineers}
      rawAutherText={rawAutherText}
    />
  )

  return (
    <AsideFlexBox>
      {metadataJSX}
      <ToolsArea>
        <ToolsContainer>
          <Tools
            backToTopic={backToTopic}
            height={`${toolsHeight}px`}
            title={title}
            onFontLevelChange={onFontLevelChange}
            articleMetaForBookmark={articleMetaForBookmark}
            bookmarkId={bookmarkId}
          />
        </ToolsContainer>
      </ToolsArea>
      {metadataJSX}
    </AsideFlexBox>
  )
}

Aside.propTypes = {
  ...predefinedProps.metadata,
  ...predefinedProps.tools,
  bookmarkId: PropTypes.number,
}

export default Aside
