import Metadata from './metadata'
import React from 'react'
import Tools from './desktop-tools'
import predefinedProps from '../../constants/prop-types/aside'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import PropTypes from 'prop-types'

const _toolPosition = {
  top: 'top',
  fixed: 'fixed',
  bottom: 'bottom',
}

const AsideFlexBox = styled.aside`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ToolsFixedArea = styled.div`
  position: relative;
  flex-grow: 1;
  margin-top: 90px;
  margin-bottom: 90px;
`

const ToolsPositioningBlock = styled.div`
  display: inline-block;
  position: ${(props) =>
    props.$toolPosition === _toolPosition.fixed ? 'fixed' : 'absolute'};
  top: ${(props) => {
    switch (props.$toolPosition) {
      case _toolPosition.fixed:
        return '50%'
      case _toolPosition.top:
        return '0'
      case _toolPosition.bottom:
      default:
        return 'auto'
    }
  }};
  bottom: ${(props) => {
    switch (props.$toolPosition) {
      case _toolPosition.bottom:
        return '0'
      case _toolPosition.fixed:
      case _toolPosition.top:
      default:
        return 'auto'
    }
  }};
  transform: ${(props) =>
    props.$toolPosition === _toolPosition.fixed ? 'translateY(-50%)' : 'none'};
`

const TriggerFixBlock = styled.div`
  position: absolute;
  height: ${(props) => props.$height}px;
`

const TriggerFixTopBlock = styled(TriggerFixBlock)`
  top: 0;
`

const TriggerFixBottomBlock = styled(TriggerFixBlock)`
  bottom: 0;
`

export default class Aside extends React.PureComponent {
  static propTypes = {
    ...predefinedProps.metadata,
    ...predefinedProps.tools,
    bookmarkId: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      toolPosition: _toolPosition.top,
    }

    this.setToolsTop = this.setToolsPosition.bind(this, _toolPosition.top)
    this.setToolsFixed = this.setToolsPosition.bind(this, _toolPosition.fixed)
    this.setToolsBottom = this.setToolsPosition.bind(this, _toolPosition.bottom)
  }

  setToolsPosition(nextPosition, waypointObj) {
    console.log('nextPosition: ', nextPosition)
    const toolPosition = this.state.toolPosition
    if (
      // viewport is below `ToolsFixedArea`
      // make toolPosition stay at `bottom`
      (toolPosition === _toolPosition.bottom &&
        waypointObj.currentPosition === 'above') ||
      // viewport is above `ToolsFixedArea`
      // make toolPosition stay at top
      (toolPosition === _toolPosition.top &&
        waypointObj.currentPosition === 'below')
    ) {
      return
    }

    this.setState({
      toolPosition: nextPosition,
    })
  }

  render() {
    const toolsHeight = 258 // px

    const {
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
    } = this.props

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
        <ToolsFixedArea>
          <Waypoint
            onEnter={this.setToolsTop}
            onLeave={this.setToolsFixed}
            topOffset="50%"
          >
            <TriggerFixTopBlock $height={toolsHeight / 2} />
          </Waypoint>
          <ToolsPositioningBlock $toolPosition={this.state.toolPosition}>
            <Tools
              backToTopic={backToTopic}
              height={`${toolsHeight}px`}
              title={title}
              onFontLevelChange={onFontLevelChange}
              articleMetaForBookmark={articleMetaForBookmark}
              bookmarkId={bookmarkId}
            />
          </ToolsPositioningBlock>
          <Waypoint
            onEnter={this.setToolsBottom}
            onLeave={this.setToolsFixed}
            bottomOffset="50%"
          >
            <TriggerFixBottomBlock height={toolsHeight / 2} />
          </Waypoint>
        </ToolsFixedArea>
        {metadataJSX}
      </AsideFlexBox>
    )
  }
}
