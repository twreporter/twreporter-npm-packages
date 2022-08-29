import React from 'react'
import PropTypes from 'prop-types'
import Swipeable from 'react-swipeable'
import SwipeableMixin from './common-utils/swipable-mixin'
import styled from 'styled-components'
import {
  itemPlusPaddingWidthPct,
  itemPaddingRightPct,
  firstItemMarginLeftPct,
} from '../constants/mobile-mockup-specification'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

const FlexList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0;

  ${mq.mobileOnly`
    display: flex;
    flex-wrap: nowrap;
    justify-content: ${props => {
      return props.justifyContent || 'flex-start'
    }};
    align-items: ${props => {
      return props.alignItems || 'stretch'
    }};
    transition: 500ms transform linear;
    transform: ${props => {
      return props.selected !== 0
        ? `translateX(${props.selected * -itemPlusPaddingWidthPct}%)`
        : 'translateX(0)'
    }};
  `}
`

const FlexItem = styled.li`
  ${mq.mobileOnly`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${itemPlusPaddingWidthPct}%;
    padding-right: ${itemPaddingRightPct}%;
    &:first-child {
      margin: 0 0 0 ${firstItemMarginLeftPct}%;
    }
  `}
`

class SwipableFlexItems extends SwipeableMixin {
  render() {
    const { selected } = this.state
    const { alignItems, children, justifyContent } = this.props
    const onSwiping = (e, deltaX, deltaY, absX, absY) => {
      // In order to avoid slightly vibrating while swiping left and right,
      // we set a threshold to prevent scrolling.
      // 10 is the the threshold value we set after manually testing.
      if (absY < 10) {
        e.preventDefault()
      }
    }
    let items = children
    if (children && !Array.isArray(children)) {
      items = [children]
    }

    items = items.map(child => <FlexItem key={child.key}>{child}</FlexItem>)

    return (
      <Swipeable
        onSwipedRight={this.onSwipedRight}
        onSwipedLeft={this.onSwipedLeft}
        onSwiping={onSwiping}
      >
        <FlexList
          selected={selected}
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          {items}
        </FlexList>
      </Swipeable>
    )
  }
}

SwipableFlexItems.defaultProps = {
  alignItems: 'flex-end',
  justifyContent: 'flext-start',
  maxSwipableItems: 0,
}

SwipableFlexItems.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  maxSwipableItems: PropTypes.number,
}

export default {
  FlexList,
  FlexItem,
  SwipableFlexItems,
}
