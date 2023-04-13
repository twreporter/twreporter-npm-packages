import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// assets
import PageDownIcon from './assets/page-down.svg'
import PageUpIcon from './assets/page-up.svg'
// constants
import color from './constants/color'
// @twreporter
import { absoluteCentering } from '@twreporter/core/lib/constants/predefined-css'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
// lodash
import concat from 'lodash/concat'
import get from 'lodash/get'

const _ = {
  concat,
  get,
}

const styles = {
  btnBoxSize: {
    mobile: 36,
    desktop: 28,
  },
  prevNextBtnPadding: [0, 20, 2, 20],
  ellipsisBoxPadding: [10, 6, 10, 6],
  containerMargin: {
    default: [64, 'auto', 120, 'auto'],
    mobile: [32, 'auto', 64, 'auto'],
  },
}

const PaginationContainer = styled.div`
  margin: ${arrayToCssShorthand(styles.containerMargin.default)};
  text-align: center;
  height: ${styles.btnBoxSize.mobile}px;
  ${mq.tabletAndAbove`
    height: ${styles.btnBoxSize.desktop}px;
  `}
  ${mq.mobileOnly`
    margin: ${arrayToCssShorthand(styles.containerMargin.mobile)};
  `}
`

const Boxes = styled.div`
  display: inline-block;
  user-select: none;
`

const Box = styled.div`
  margin: 0 5px 0 5px;
  width: ${styles.btnBoxSize.desktop}px;
  height: ${styles.btnBoxSize.desktop}px;
  box-sizing: border-box;
  user-select: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  color: ${color.brown};
  position: relative;
  > :first-child {
    ${absoluteCentering}
  }
`

const PageNumberBox = styled(Box)`
  border: solid 1px ${color.brown};
  border-radius: 50%;
  line-height: ${styles.btnBoxSize.desktop}px;
  background-color: ${props => (props.isCurrent ? color.brown : 'transparent')};
  > span {
    color: ${props => (props.isCurrent ? color.white : color.brown)};
  }
  ${mq.mobileOnly`
    display: ${props => (props.isCurrent ? '' : 'none')};
  `}
`

const EllipsisBox = styled(Box)`
  cursor: default;
  padding: ${arrayToCssShorthand(styles.ellipsisBoxPadding)};
  ${mq.mobileOnly`
    display: none;
  `}
`

const PrevNextBtn = styled(Box)`
  padding: ${arrayToCssShorthand(styles.prevNextBtnPadding)};
  cursor: pointer;
  path {
    stroke: ${color.brown};
  }
`

/*
Pages Array:

           left-range
          |-----------|
                 right-range
                |-----------|
        < 1  2  3 4[5]6  7  8  >
        < 1  2  3 4[5]6 ... 9  >
        < 1 ... 4[5]6 7  8  9  >
        < 1 ... 24[25]26 27 ... 30 >
        < 1 ... 25[26]27 28 29  30 >
        < 1 ... 4[5]6 7 ... 30 >
         |-|               |-|
     left-margin          right-margin
                |-----|
                 center
            |-|         |-|
      left-ellipsis  right-ellipsis

  let margin = x, center = y
  pages array length = 2x + y + 2
*/

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props)
    this._buildPagesArray = this._buildPagesArray.bind(this)
    this._buildPageBox = this._buildPageBox.bind(this)
    this._buildCenterJSX = this._buildCenterJSX.bind(this)
  }

  _buildPageBox(index, currentPage) {
    return (
      <PageNumberBox
        key={`page-num-box-${index}`}
        isCurrent={index === currentPage}
        onClick={this.props.handleClickPage}
      >
        <span>{index}</span>
      </PageNumberBox>
    )
  }

  _buildCenterJSX(startAt, length, currentPage) {
    const centerJSX = []
    const endAt = startAt + length - 1
    for (let i = startAt; i <= endAt; i += 1) {
      centerJSX.push(this._buildPageBox(i, currentPage))
    }
    return centerJSX
  }

  _buildPagesArray(currentPage, totalPages) {
    const { nOfMarginPages, nOfCenterPages, ellipsis } = this.props
    const pagesArrayMaxLength = nOfCenterPages + (nOfMarginPages + 1) * 2
    /* Case 1: display all pages (no ellipsis) */
    if (totalPages <= pagesArrayMaxLength) {
      const pagesArray = []
      for (let page = 1; page <= totalPages; page += 1) {
        pagesArray.push(this._buildPageBox(page, currentPage))
      }
      return pagesArray
    }
    /* Case 2: display ellipsis */
    const isCurrentPageInLeftRange =
      currentPage <= nOfMarginPages + nOfCenterPages
    const isCurrentPageInRightRange =
      currentPage > totalPages - nOfMarginPages - nOfCenterPages
    const leftEllipsisJSX = (
      <EllipsisBox key="left-ellipsis">{ellipsis}</EllipsisBox>
    )
    const rightEllipsisJSX = (
      <EllipsisBox key="right-ellipsis">{ellipsis}</EllipsisBox>
    )
    /* build margin page boxes */
    const leftMarginJSX = []
    for (let page = 1; page <= nOfMarginPages; page += 1) {
      leftMarginJSX.push(this._buildPageBox(page, currentPage))
    }
    const rightMarginJSX = []
    for (let i = 1; i <= nOfMarginPages; i += 1) {
      const page = totalPages - nOfMarginPages + i
      rightMarginJSX.push(this._buildPageBox(page, currentPage))
    }

    if (isCurrentPageInLeftRange) {
      /* Case 2-1: only show right ellipsis */
      const startAt = nOfMarginPages + 1
      const length = nOfCenterPages + 1
      return _.concat(
        leftMarginJSX,
        this._buildCenterJSX(startAt, length, currentPage),
        rightEllipsisJSX,
        rightMarginJSX
      )
    } else if (isCurrentPageInRightRange) {
      /* Case 2-2: only show left ellipsis */
      const startAt = totalPages - nOfMarginPages - nOfCenterPages
      const length = nOfCenterPages + 1
      return _.concat(
        leftMarginJSX,
        leftEllipsisJSX,
        this._buildCenterJSX(startAt, length, currentPage),
        rightMarginJSX
      )
    }
    /* Case 2-3: show both ellipses */
    const startAt = currentPage - Math.floor(nOfCenterPages / 2) + 1
    const length = nOfCenterPages
    return _.concat(
      leftMarginJSX,
      leftEllipsisJSX,
      this._buildCenterJSX(startAt, length, currentPage),
      rightEllipsisJSX,
      rightMarginJSX
    )
  }

  render() {
    const {
      currentPage,
      totalPages,
      handleClickPrev,
      handleClickNext,
    } = this.props
    if (!totalPages || !currentPage)
      return (
        <PaginationContainer>
          <Boxes />
        </PaginationContainer>
      )
    const pagesArrayJSX = this._buildPagesArray(currentPage, totalPages)
    const belowFirstPage = currentPage <= 1
    const aboveFinalPage = currentPage >= totalPages
    return (
      <PaginationContainer>
        <Boxes>
          {belowFirstPage ? null : (
            <PrevNextBtn key="prev-btn" onClick={handleClickPrev}>
              <PageUpIcon />
            </PrevNextBtn>
          )}
          {pagesArrayJSX}
          {aboveFinalPage ? null : (
            <PrevNextBtn key="next-btn" onClick={handleClickNext}>
              <PageDownIcon />
            </PrevNextBtn>
          )}
        </Boxes>
      </PaginationContainer>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  ellipsis: PropTypes.string.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  handleClickPage: PropTypes.func.isRequired,
  handleClickPrev: PropTypes.func.isRequired,
  nOfCenterPages: PropTypes.number.isRequired,
  nOfMarginPages: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}

Pagination.defaultProps = {
  currentPage: 1,
  totalPages: 1,
  ellipsis: '…',
  nOfCenterPages: 4,
  nOfMarginPages: 1,
}

export default Pagination
