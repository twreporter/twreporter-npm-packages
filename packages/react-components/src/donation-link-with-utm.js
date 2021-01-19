import PropTypes from 'prop-types'
import React from 'react'
import externalLinks from '@twreporter/core/lib/constants/external-links'
import linkWithParams from './utils/link-with-params'

export default class DonationLinkWithUtm extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    utmMedium: PropTypes.string,
    utmSource: PropTypes.string,
    utmCampaign: PropTypes.string,
    className: PropTypes.string,
  }

  state = {
    isClient: false,
  }

  componentDidMount() {
    this.setState({
      isClient: true,
    })
  }

  getLinkWithSearchParams(originalUrl) {
    const { utmSource, utmMedium, utmCampaign } = this.props
    try {
      const params = {
        utm_source: utmSource || window.location.host,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign || window.location.pathname,
      }
      return linkWithParams(originalUrl, params)
    } catch (e) {
      console.warn('Can not get donation url with utm param', e)
    }
  }

  render() {
    const { className, children } = this.props
    const { isClient } = this.state
    let donationURL = externalLinks.donation

    if (isClient) {
      // client side rendering
      donationURL = this.getLinkWithSearchParams(donationURL)
    }

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
