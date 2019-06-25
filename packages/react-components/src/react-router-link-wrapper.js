import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import React from 'react'

/*
 * Since the `to` property is required in react-router v4,
 * the anchor tag with no specified `href` will be transformed
 * to `a` tag in this wrapper function.
 */
export default function LinkWrapper(props) {
  const Component = props.to ? Link : 'a'
  return <Component {...props}>{props.children}</Component>
}

LinkWrapper.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
}
