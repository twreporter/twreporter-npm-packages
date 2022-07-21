import PropTypes from 'prop-types'
import React from 'react'

const juniorURL = 'https://www.twreporter.org/tags/6239377ee538880600e2effe'

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
