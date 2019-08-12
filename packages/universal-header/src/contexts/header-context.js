import React from 'react'
import wellDefinedPropTypes from '../constants/prop-types'

const defaultValue = Object.assign(
  { isAuthed: false },
  wellDefinedPropTypes.context.defaultProps
)

const HeaderContext = React.createContext(defaultValue)

export default HeaderContext
