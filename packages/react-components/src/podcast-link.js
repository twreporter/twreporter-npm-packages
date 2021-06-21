import PropTypes from 'prop-types'
import React from 'react'

// TODO(taylrj): update to the topic landing page link
const podcastTopicLandingPageLink = 'https://www.twreporter.org/a/podcast-list'

class PodcastLandingPageLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props
    const podcastLandingPageURL = podcastTopicLandingPageLink

    return (
      <a href={podcastLandingPageURL} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
}

export default PodcastLandingPageLink
