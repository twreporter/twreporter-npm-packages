import PropTypes from 'prop-types'
import React from 'react'
import externalLinks from '@twreporter/core/lib/constants/external-links'

export default class DonationLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const { className, children } = this.props
    const donationURL = externalLinks.donation

    return (
      <a
        className={className}
        href={donationURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
}
