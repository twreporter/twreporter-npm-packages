/* eslint node/no-deprecated-api: "warn" */
import PropTypes from 'prop-types'
import React from 'react'
import url from 'url'
import externalLinks from '@twreporter/core/lib/constants/external-links'

export default class DonationLinkWithUtm extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    utmMedium: PropTypes.string,
  }

  state = {
    isClient: false,
  }

  componentDidMount() {
    this.setState({
      isClient: true,
    })
  }

  render() {
    const { children, utmMedium } = this.props
    const { isClient } = this.state
    let donationURL = externalLinks.donation

    if (isClient) {
      // client side rendering
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
    }

    return (
      <a href={donationURL} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
}
