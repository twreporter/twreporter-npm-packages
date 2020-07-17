export const getHref = (slug, isExternal) => {
  return isExternal ? `i/${slug}` : `a/${slug}`
}
