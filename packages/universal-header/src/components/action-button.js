import React from 'react'
// constant
import { ACTION_ORDER } from '../constants/actions'
import {
  DIRECTION_TYPE,
  TEXT_TYPE,
  BUTTON_WIDTH_TYPE,
  BUTTON_SIZE_TYPE,
} from '../constants/action-item-types'
// feature toggle
import ActionButtonNew from './action-button-item'
import ActionButtonOld from './action-button-item-old'
import { MEMBERSHIP } from '@twreporter/core/lib/constants/feature-flag'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const ActionButton = MEMBERSHIP ? ActionButtonNew : ActionButtonOld

const getActionProps = type => _.map(ACTION_ORDER[type], key => ({ key }))

export const DesktopHeaderAction = ({ ...props }) => {
  const actionProps = getActionProps('desktop')
  return <ActionButton actions={actionProps} {...props} />
}

export const MobileHeaderAction = ({ ...props }) => {
  const actionProps = getActionProps('mobile')
  return <ActionButton actions={actionProps} {...props} />
}

export const DesktopHamburgerAction = ({ ...props }) => {
  const actionProps = getActionProps('hamburger')
  return (
    <ActionButton
      actions={actionProps}
      direction={DIRECTION_TYPE.column}
      textType={TEXT_TYPE.full}
      buttonWidth={BUTTON_WIDTH_TYPE.stretch}
      buttonSize={BUTTON_SIZE_TYPE.L}
      isForHambuger={true}
      {...props}
    />
  )
}

export const MobileHamburgerAction = ({ ...props }) => {
  const actionProps = getActionProps('hamburger')
  return (
    <ActionButton
      actions={actionProps}
      textType={TEXT_TYPE.full}
      buttonWidth={BUTTON_WIDTH_TYPE.stretch}
      buttonSize={BUTTON_SIZE_TYPE.L}
      isForHambuger={true}
      {...props}
    />
  )
}
