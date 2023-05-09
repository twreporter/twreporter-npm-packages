import { fontFamily } from '@twreporter/core/lib/constants/font'
import { Type } from '../enums'

export const TYPE_FONT_FAMILY = Object.freeze({
  [Type.DEFAULT]: fontFamily.default,
  [Type.ARTICLE]: fontFamily.title,
})
