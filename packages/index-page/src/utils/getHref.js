import { INTERACTIVE } from '../constants/post-style'

export const getHref = (slug, style) => {
  if (style === INTERACTIVE) {
    return `i/${slug}`
  }
  return `a/${slug}`
}
