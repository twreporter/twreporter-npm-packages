import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CustomizedLink = ({ isExternal, to, ...rest }) => {
  if (isExternal) {
    return <a href={to} {...rest} />
  }
  return <Link to={to} {...rest} />
}

CustomizedLink.propTypes = {
  isExternal: PropTypes.bool,
  to: PropTypes.string,
}

CustomizedLink.defaultProps = {
  isExternal: true,
  to: '',
}

export default CustomizedLink
