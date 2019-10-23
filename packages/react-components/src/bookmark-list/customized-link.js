import entityPath from '@twreporter/core/lib/constants/entity-path'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

const CustomizedLink = ({ children, isExternal, slug, host }) => {
  if (isExternal) {
    return (
      <a href={`${host}${entityPath.interactiveArticle}${slug}`}>{children}</a>
    )
  }
  return <Link to={`${entityPath.article}${slug}`}>{children}</Link>
}

CustomizedLink.defaultProps = {
  children: null,
}

CustomizedLink.propTypes = {
  children: PropTypes.node,
  isExternal: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
}

export default CustomizedLink
