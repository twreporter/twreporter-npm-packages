import { createContext } from 'react'
import { CONTEXT_PROP, HAMBURGER_CONTEXT_PROP } from '../constants/prop-types'

const HeaderContext = createContext(CONTEXT_PROP)
export const HamburgerContext = createContext(HAMBURGER_CONTEXT_PROP)

export default HeaderContext
