import React from 'react'
import externalLinks from '@twreporter/core/lib/constants/external-links'
import PropTypes from 'prop-types'

export default function DonationLinkWithUtm(props) {
  const { children = null, utmMedium = '' } = props

  const handleClick = e => {
    e.preventDefault()

    let donationURL = externalLinks.donation

    try {
      const utmSource = window.location.host
      const utmCampaign = encodeURIComponent(window.location.pathname)
      const search = `utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`
      const url = new URL(donationURL)
      url.search = search
      donationURL = url.toString()
    } catch (e) {
      console.warn('Can not get donation url with utm query params', e)
    }

    window.open(donationURL, 'DonationWindow')
  }

  return (
    <a
      href={externalLinks.donation}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

DonationLinkWithUtm.propTypes = {
  children: PropTypes.node,
  utmMedium: PropTypes.string,
}
