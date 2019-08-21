import React from 'react'
import wellDefinedPropTypes from '../constants/prop-types'

const HeaderContext = React.createContext(
  wellDefinedPropTypes.context.defaultProps
)

export default HeaderContext
