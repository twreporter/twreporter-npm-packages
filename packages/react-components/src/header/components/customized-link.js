import * as linkType from '@twreporter/core/lib/constants/link-type'
import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import React from 'react'

const CustomizedLink = ({ children, currentLinkType, path, onClick }) => {
  if (currentLinkType === linkType.external) {
    return (
      <a href={path} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={path} onClick={onClick}>
      {children}
    </Link>
  )
}

CustomizedLink.defaultProps = {
  path: '',
  onClick: () => {},
}

CustomizedLink.propTypes = {
  children: PropTypes.element.isRequired,
  currentLinkType: PropTypes.string.isRequired,
  path: PropTypes.string,
  onClick: PropTypes.func,
}

export default CustomizedLink
