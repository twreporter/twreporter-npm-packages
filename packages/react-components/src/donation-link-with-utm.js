/* eslint node/no-deprecated-api: "warn" */
import PropTypes from 'prop-types'
import React from 'react'
import url from 'url'
import externalLinks from '@twreporter/core/lib/constants/external-links'

export default function DonationLinkWithUtm(props) {
  const { children = null, utmMedium = '' } = props

  const handleClick = e => {
    e.preventDefault()

    let donationURL = externalLinks.donation

    try {
      const utmSource = window.location.host
      const utmCampaign = window.location.pathname
      const parseQueryString = true
      const urlObj = url.parse(donationURL, parseQueryString)

      urlObj.query.utm_source = utmSource
      urlObj.query.utm_medium = utmMedium
      urlObj.query.utm_campaign = utmCampaign

      donationURL = url.format(urlObj)
    } catch (e) {
      console.warn('Can not get donation url with utm param', e)
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
