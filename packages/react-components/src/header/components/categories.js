import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import { categoriesMenuEffect } from '../constants/predefined-css'
import { configs as categoryConfigs } from '@twreporter/core/lib/constants/categories'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import entityPath from '@twreporter/core/lib/constants/entitiy-path'
import Link from 'react-router-dom/Link'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const Positioning = styled.div`
  width: 100%;
  position: relative;
`

const StyledCSSTransitionGroup = styled(CSSTransitionGroup)`
  position: absolute;
  z-index: 999;
  width: 100%;
  left: 0;
  top: 0;
  ${categoriesMenuEffect}
`

const styles = {
  categoriesContentMaxWidth: 320, // px
  containerPadding: {
    desktop: [10, 0], // px
  },
  itemPadding: {
    mobile: [30, 27], // px
    tablet: [30, 33], // px
    desktop: [9, 22], // px
    hd: [9, 46], // px
  },
  categoriesContainerBorder: 24, // px
}

const ViewPort = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  max-height: 400px;
`

const CategoriesContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  user-select: none;
  ${mq.tabletAndBelow`
    border: ${arrayToCssShorthand(
      styles.categoriesContainerBorder
    )} solid ${props => props.bgColor};
  `}
  ${mq.dekstopAndAbove`
    padding: ${arrayToCssShorthand(styles.containerPadding.desktop)};
  `}
`

const CategoriesContent = styled.ul`
  flex-wrap: wrap;
  ${mq.tabletAndBelow`
    max-width: ${styles.categoriesContentMaxWidth}px;
  `}
  ${mq.dekstopAndAbove`
    flex-wrap: nowrap;
  `}
  margin: 0 auto;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`

const ItemContainer = styled.li`
  padding: ${arrayToCssShorthand(styles.itemPadding.mobile)};
  ${mq.tabletOnly`
    padding: ${arrayToCssShorthand(styles.itemPadding.tablet)};
  `}
  ${mq.dekstopAndAbove`
    padding: ${arrayToCssShorthand(styles.itemPadding.desktop)};
  `}
  ${mq.hdOnly`
    padding: ${arrayToCssShorthand(styles.itemPadding.hd)};
  `}
  display: block;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  margin: 0;
`

const ItemContent = styled.span`
  color: #818283;
  font-size: 16px;
  font-weight: ${fontWeight.normal};
  cursor: pointer;
  &:hover {
    color: #262626;
  }
`

const Seperator = styled.div`
  ${mq.tabletAndBelow`
    display: ${props => (props.last > 2 ? 'block' : 'none')};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
  `}
  ${mq.dekstopAndAbove`
    top: 50%;
    transform: translateY(-40%);
    right: 0;
    width: 2px;
    height: 1em;
    display: ${props => (props.last > 1 ? 'block' : 'none')};
  `}
  position: absolute;
  box-sizing: border-box;
  background-color: #979797;
  content: '';
`

class Categories extends React.PureComponent {
  constructor(props) {
    super(props)
    this._handleClickCategory = this._handleClickCategory.bind(this)
    const categoriesCount = categoryConfigs.length
    const categoriesJSX = _.map(categoryConfigs, (category, index) => (
      <ItemContainer onClick={this._handleClickCategory} key={category.name}>
        <Link to={`${entityPath.categories}${category.path}`}>
          <ItemContent>{category.text}</ItemContent>
        </Link>
        <Seperator last={categoriesCount - index} />
      </ItemContainer>
    ))
    this.categoriesJSX = categoriesJSX
  }
  _handleClickCategory(e) {
    e.preventDefault()
    this.props.handleToggleCategoriesMenu('close')
  }
  render() {
    const { categoriesIsOpen, bgColor } = this.props
    return (
      <Positioning>
        <StyledCSSTransitionGroup
          key="transition"
          transitionName="effect"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
          {!categoriesIsOpen ? null : (
            <ViewPort>
              <CategoriesContainer bgColor={bgColor}>
                <CategoriesContent>{this.categoriesJSX}</CategoriesContent>
              </CategoriesContainer>
            </ViewPort>
          )}
        </StyledCSSTransitionGroup>
      </Positioning>
    )
  }
}

Categories.propTypes = {
  categoriesIsOpen: PropTypes.bool,
  handleToggleCategoriesMenu: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
}

Categories.defaultProps = {
  categoriesIsOpen: false,
  bgColor: '#f1f1f1',
}

export default Categories
