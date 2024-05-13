import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
// util
import { getActionLinks } from '../utils/links'
// constant
import { ACTION_LABEL, ACTION_BUTTON_TYPE } from '../constants/actions'
import {
  DIRECTION_TYPE,
  DIRECTION_PROP_TYPE,
  TEXT_TYPE,
  TEXT_PROP_TYPE,
  BUTTON_WIDTH_TYPE,
  BUTTON_WIDTH_PROP_TYPE,
  BUTTON_SIZE_TYPE,
  BUTTON_SIZE_PROP_TYPE,
} from '../constants/action-item-types'
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
  ${(props) => (props.$buttonWidth === 'stretch' ? 'width: auto;' : '')}
`

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) =>
    arrayToCssShorthand(styles.itemMargin[props.$direction])};
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
  flex-direction: ${(props) => props.$direction};
  &,
  ${ActionItem}, a {
    ${(props) => (props.$buttonWidth === 'stretch' ? 'width: 100%;' : '')}
  }
`

const ActionButtonItem = ({
  action = {},
  direction = DIRECTION_TYPE.row,
  textType = TEXT_TYPE.brief,
  buttonWidth = BUTTON_WIDTH_TYPE.fit,
  buttonSize = BUTTON_SIZE_TYPE.S,
  callback = defaultFunc,
  isForHambuger = false,
}) => {
  const { theme, isLinkExternal, releaseBranch } = useContext(HeaderContext)
  let buttonTheme
  if (isForHambuger) {
    if (theme === THEME.transparent) {
      buttonTheme = THEME.normal
    } else {
      buttonTheme = theme
    }
  } else {
    buttonTheme = theme
  }
  const actionKey = action.key
  const actionId = action.id
  const actionLabel = ACTION_LABEL[textType][actionKey]
  const actionLink = getActionLinks(isLinkExternal, releaseBranch)[actionKey]
  const buttonType = ACTION_BUTTON_TYPE[actionKey]

  return (
    <ActionItem onClick={callback} $direction={direction}>
      <Link id={actionId} {...actionLink}>
        <StyledPillButton
          text={actionLabel}
          theme={buttonTheme}
          type={buttonType}
          size={buttonSize}
          $buttonWidth={buttonWidth}
        />
      </Link>
    </ActionItem>
  )
}

ActionButtonItem.propTypes = {
  action: PropTypes.shape({
    key: PropTypes.string,
  }),
  direction: DIRECTION_PROP_TYPE,
  textType: TEXT_PROP_TYPE,
  buttonWidth: BUTTON_WIDTH_PROP_TYPE,
  buttonSize: BUTTON_SIZE_PROP_TYPE,
  callback: PropTypes.func,
  isForHambuger: PropTypes.bool,
}

const ActionButton = ({
  actions = [],
  direction = DIRECTION_TYPE.row,
  textType = TEXT_TYPE.brief,
  buttonWidth = BUTTON_WIDTH_TYPE.fit,
  buttonSize = BUTTON_SIZE_TYPE.S,
  callback = defaultFunc,
  isForHambuger = false,
  ...rest
}) => (
  <ActionsContainer $direction={direction} $buttonWidth={buttonWidth} {...rest}>
    {_.map(actions, (action) => {
      return (
        <ActionButtonItem
          action={action}
          direction={direction}
          textType={textType}
          buttonWidth={buttonWidth}
          buttonSize={buttonSize}
          key={action.key}
          isForHambuger={isForHambuger}
          callback={callback}
        />
      )
    })}
  </ActionsContainer>
)

ActionButton.propTypes = {
  actions: PropTypes.arrayOf(ActionButtonItem.propTypes.action),
  direction: ActionButtonItem.propTypes.direction,
  textType: ActionButtonItem.propTypes.textType,
  buttonWidth: ActionButtonItem.propTypes.buttonWidth,
  buttonSize: ActionButtonItem.propTypes.buttonSize,
  callback: PropTypes.func,
  isForHambuger: PropTypes.bool,
}

export default ActionButton
