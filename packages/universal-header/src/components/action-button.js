import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import HeaderContext from '../contexts/header-context'
import fonts from '../constants/fonts'
import actionConst from '../constants/actions'
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
import Link from './customized-link'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { colorBrand } from '@twreporter/core/lib/constants/color'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const styles = {
  itemWidth: {
    mobile: {
      row: '48px',
      column: '100%',
    },
    tablet: {
      row: '70px',
      column: '100%',
    },
    desktop: '70px',
  },
  itemHeight: {
    mobile: {
      row: 24, // px
      column: 40, // px
    },
    tablet: {
      row: 30, // px
      column: 40, // px
    },
    desktop: 30, // px
  },
  itemMargin: {
    row: [0, 0, 0, 10], // px
    column: [7, 0, 0, 0], // px
  },
  fontSize: {
    mobile: {
      row: fonts.size.small,
      column: fonts.size.medium,
    },
    tablet: {
      row: fonts.size.base,
      column: fonts.size.medium,
    },
    desktop: fonts.size.base,
  },
}

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.direction};
  width: 100%;
`

const ActionContainer = styled.div`
  transition: opacity 0.1s;
  transition-delay: 300ms;
  opacity: ${props => (props.isActive ? 1 : 0)};
  pointer-events: ${props => (props.isActive ? 'auto' : 'none')};
  margin: ${props => arrayToCssShorthand(styles.itemMargin[props.direction])};
  width: 100%;

  &:first-child {
    margin-top: 0;
    margin-left: 0;
  }

  a,
  a:link,
  a:visited {
    color: ${props => props.color || 'white'};
    font-size: ${styles.fontSize.desktop};
    font-weight: ${fonts.weight.bold};
    ${mq.tabletOnly`
      cursor: default;
      font-size: ${props => styles.fontSize.tablet[props.direction]};
    `}
    ${mq.mobileOnly`
      cursor: default;
      font-size: ${props => styles.fontSize.mobile[props.direction]};
    `}
  }
`

const ActionItem = styled.div`
  background-color: ${props => props.bgColor || colorBrand.heavy};
  width: ${styles.itemWidth.desktop};
  max-width: 316px;
  height: ${styles.itemHeight.desktop}px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  &:hover {
    background-color: ${props => props.hoverBgColor || colorBrand.heavy};
  }

  ${mq.tabletOnly`
    height: ${props => styles.itemHeight.tablet[props.direction]}px;
    width: ${props => styles.itemWidth.tablet[props.direction]};
  `}
  ${mq.mobileOnly`
    height: ${props => styles.itemHeight.mobile[props.direction]}px;
    width: ${props => styles.itemWidth.mobile[props.direction]};
  `}
`

const ActionButtonItem = ({ action, direction, themeFunction, callback }) => {
  const actionKey = action.key
  const isActive = action.active ?? true
  const actionLabel = actionConst.actionLabels[actionKey]
  const actionLink = linkUtils.getActionLinks()[actionKey]
  return (
    <HeaderContext.Consumer>
      {({ theme }) => {
        const { color, bgColor, hoverBgColor } = themeFunction(theme)
        return (
          <ActionContainer
            color={color}
            direction={direction}
            isActive={isActive}
            onClick={callback}
          >
            <Link {...actionLink}>
              <ActionItem
                direction={direction}
                bgColor={bgColor}
                hoverBgColor={hoverBgColor}
              >
                {actionLabel}
              </ActionItem>
            </Link>
          </ActionContainer>
        )
      }}
    </HeaderContext.Consumer>
  )
}

ActionButtonItem.propTypes = {
  action: PropTypes.shape({
    key: PropTypes.string,
    active: PropTypes.boolean,
  }),
  direction: PropTypes.string,
  themeFunction: PropTypes.func,
  callback: PropTypes.func,
}

ActionButtonItem.defaultProps = {
  action: {},
  direction: 'row',
  themeFunction: themeUtils.selectActionButtonTheme,
  callback: () => {},
}

const ActionButton = ({ actions, direction, ...rest }) => {
  return (
    <ActionsContainer direction={direction}>
      {_.map(actions, action => {
        return (
          <ActionButtonItem
            action={action}
            direction={direction}
            key={action.key}
            {...rest}
          />
        )
      })}
    </ActionsContainer>
  )
}

ActionButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(ActionButtonItem.propTypes)),
  direction: PropTypes.string,
  themeFunction: PropTypes.func,
  callback: PropTypes.func,
}

ActionButton.defaultProps = {
  actions: [],
  direction: 'row',
  themeFunction: themeUtils.selectActionButtonTheme,
  callback: () => {},
}

export default ActionButton
