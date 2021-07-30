import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
import fonts from '../constants/fonts'
import colors from '../constants/colors'
import actionConst from '../constants/actions'
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
import Link from './customized-link'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const styles = {
  itemWidth: {
    desktop: 70, // px
  },
  itemHeight: {
    desktop: 30, // px
  },
  fontSize: {
    mobile: fonts.size.medium,
    desktop: fonts.size.base,
  },
}

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const ActionContainer = styled.div`
  margin: 0 10px;

  a,
  a:link,
  a:visited {
    color: ${props => props.color || colors.white};
    font-size: ${styles.fontSize.desktop};
  }
`

const ActionItem = styled.div`
  background-color: ${props => props.bgColor || colors.red};
  width: ${styles.itemWidth.desktop}px;
  height: ${styles.itemHeight.desktop}px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.hoverBgColor || colors.red};
  }
`

const ActionButtonItem = ({ action={} }) => {
  const actionKey = action.key
  const actionLabel = actionConst.actionLabels[actionKey]
  const actionLink = linkUtils.getActionLinks()[actionKey]
  return (
    <HeaderContext.Consumer>
      {({ theme }) => {
        const { color, bgColor, hoverBgColor } = themeUtils.selectActionButtonTheme(theme)
        return (
          <ActionContainer color={color}>
            <Link {...actionLink}>
              <ActionItem
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
    key: PropTypes.string
  }),
}

const ActionButton = ({ actions=[] }) => {
  return (
    <ActionsContainer>
      { _.map(actions, action => (<ActionButtonItem action={action} key={action.key} />)) }
    </ActionsContainer>
  )
}

ActionButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(ActionButtonItem.propTypes)),
}

export default ActionButton
