import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
// util
import { getActionLinks } from '../utils/links'
// constant
import { ACTION_LABEL, ACTION_BUTTON_TYPE } from '../constants/actions'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import { PillButton } from '@twreporter/react-components/lib/button'
import { THEME } from '@twreporter/core/lib/constants/theme'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

// global var
const defaultFunc = () => {}

const styles = {
  itemMargin: {
    row: [0, 0, 0, 16], // px
    column: [16, 0, 0, 0], // px
  },
}

const StyledPillButton = styled(PillButton)`
  justify-content: center;
  ${props => (props.direction === 'column' ? 'width: auto;' : '')}
`

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => arrayToCssShorthand(styles.itemMargin[props.direction])};
  &:first-child {
    margin-top: 0;
    margin-left: 0;
  }
  a {
    text-decoration: none;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.direction};
  &,
  ${ActionItem}, a {
    ${props => (props.direction === 'column' ? 'width: 100%;' : '')}
  }
`

const ActionButtonItem = ({
  action = {},
  direction = 'row',
  callback = defaultFunc,
}) => {
  const { theme } = useContext(HeaderContext)
  const buttonTheme =
    direction === 'row' || theme === THEME.photography ? theme : THEME.noraml
  const actionKey = action.key
  const actionLabel = ACTION_LABEL[direction][actionKey]
  const actionLink = getActionLinks()[actionKey]
  const buttonType = ACTION_BUTTON_TYPE[actionKey]
  const buttonSize = direction === 'column' ? 'L' : 'S'

  return (
    <ActionItem onClick={callback} direction={direction}>
      <Link {...actionLink}>
        <StyledPillButton
          text={actionLabel}
          theme={buttonTheme}
          type={buttonType}
          size={buttonSize}
          direction={direction}
        />
      </Link>
    </ActionItem>
  )
}

ActionButtonItem.propTypes = {
  action: PropTypes.shape({
    key: PropTypes.string,
  }),
  direction: PropTypes.oneOf(['row', 'column']),
  callback: PropTypes.func,
}

const ActionButton = ({
  actions = [],
  direction = 'row',
  callback = defaultFunc,
  ...rest
}) => (
  <ActionsContainer direction={direction} {...rest}>
    {_.map(actions, action => {
      return (
        <ActionButtonItem
          action={action}
          direction={direction}
          key={action.key}
        />
      )
    })}
  </ActionsContainer>
)

ActionButton.propTypes = {
  actions: PropTypes.arrayOf(ActionButtonItem.propTypes.action),
  direction: ActionButtonItem.propTypes.direction,
  callback: PropTypes.func,
}

export default ActionButton
