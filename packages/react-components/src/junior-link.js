import PropTypes from 'prop-types'
import React from 'react'

const juniorURL = 'https://kids.twreporter.org/'

class JuniorLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props

    return (
      <a href={juniorURL} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
}

export default JuniorLink
