import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import predefinedPropTypes from '../../constants/prop-types/body'
import ccsConst from '../../constants/css'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const listStyle = css`
  ${ccsConst.linkChildren}
  ${ccsConst.paragraphText}
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0 0 0 3em;
  padding: 0;
  ${(props) =>
    props.$forTrackingSection
      ? `font-size: ${props.theme.fontSizeOffset + 16}px`
      : ''};
`

const Ul = styled.ul`
  ${listStyle}
  list-style-type: disc;
`

const Ol = styled.ol`
  ${listStyle}
  list-style-type: decimal;
`

const Li = styled.li`
  margin: 0 0 1em 0;
  padding: 0;
  &:last-child {
    margin-bottom: 0;
  }
`

const buildLi = (listItem, index) => (
  <Li key={`list_${index}`} dangerouslySetInnerHTML={{ __html: listItem }} />
)

// eslint-disable-next-line react/display-name
const buildList = (ordered) => {
  const L = ordered ? Ol : Ul
  const List = ({ data, forTrackingSection = false, className = '' }) => {
    const listItems = _.get(data, 'content')
    if (!Array.isArray(listItems) || listItems.length === 0) {
      return null
    }
    return (
      <div className={className}>
        <L $forTrackingSection={forTrackingSection}>
          {_.map(listItems, buildLi)}
        </L>
      </div>
    )
  }
  List.propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData,
    forTrackingSection: PropTypes.bool,
  }
  return List
}

export default {
  UnorderedList: buildList(false),
  OrderedList: buildList(true),
}
