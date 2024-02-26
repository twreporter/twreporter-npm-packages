import PropTypes from 'prop-types'
import React from 'react'
import externalLinks from '@twreporter/core/lib/constants/external-links'

const DonationLink = ({ children, ...props }) => {
  const donationURL = externalLinks.donation

  return (
    <a href={donationURL} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
DonationLink.propTypes = {
  children: PropTypes.node,
}

export default DonationLink
