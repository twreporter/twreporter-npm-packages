import React, { useContext } from 'react'
// constant
import { ACTION_ORDER } from '../constants/actions'
import {
  DIRECTION_TYPE,
  TEXT_TYPE,
  BUTTON_WIDTH_TYPE,
  BUTTON_SIZE_TYPE,
} from '../constants/action-item-types'
// context
import { HamburgerContext } from '../contexts/header-context'
// components
import ActionButton from './action-button-item'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

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
  const { closeHamburgerMenu } = useContext(HamburgerContext)
  const actionProps = getActionProps('hamburger')
  return (
    <ActionButton
      actions={actionProps}
      direction={DIRECTION_TYPE.column}
      textType={TEXT_TYPE.full}
      buttonWidth={BUTTON_WIDTH_TYPE.stretch}
      buttonSize={BUTTON_SIZE_TYPE.L}
      isForHambuger={true}
      callback={closeHamburgerMenu}
      {...props}
    />
  )
}

export const MobileHamburgerAction = ({ ...props }) => {
  const { closeHamburgerMenu } = useContext(HamburgerContext)
  const actionProps = getActionProps('hamburger')
  return (
    <ActionButton
      actions={actionProps}
      textType={TEXT_TYPE.full}
      buttonWidth={BUTTON_WIDTH_TYPE.stretch}
      buttonSize={BUTTON_SIZE_TYPE.L}
      isForHambuger={true}
      callback={closeHamburgerMenu}
      {...props}
    />
  )
}
