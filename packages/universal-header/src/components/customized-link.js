import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'

class CustomizedLink extends React.PureComponent {
  static propTypes = {
    isExternal: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
  }

  render() {
    const { isExternal, to, ...rest } = this.props

    if (isExternal) {
      return <a href={to} {...rest} />
    }
    return <Link to={to} {...rest} />
  }
}

export default CustomizedLink
