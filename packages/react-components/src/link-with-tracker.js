/* global gtag ga */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
// get
import get from 'lodash/get'

const _ = {
  get,
}

const eventAction = 'Click'
const hitType = 'event'
const keysToBeTracked = ['Enter', 'NumpadEnter', 'Space']

export default class TrackedLink extends PureComponent {
  constructor(props) {
    super(props)
    this.sendClickTrackingEvent = this.sendClickTrackingEvent.bind(this)
  }

  isKeyToBeTracked(keyCode) {
    return keysToBeTracked.some(keyToBeTracked => keyCode === keyToBeTracked)
  }

  sendClickTrackingEvent(e) {
    if (e.code && !this.isKeyToBeTracked(e.code)) return
    const clickActionName =
      this.props.clickActionName || 'undefined-click-action'
    const url = _.get(window, 'location.href', 'null')
    const eventLabel = `[${clickActionName}]: ${url}`
    if (typeof gtag === 'function') {
      try {
        gtag(hitType, eventAction, {
          event_label: eventLabel,
        })
      } catch (err) {
        console.log('gtag error', err) // eslint-disable-line no-console
      }
    } else if (typeof ga === 'function') {
      try {
        ga('send', {
          hitType,
          eventAction,
          eventLabel,
        })
      } catch (err) {
        console.log('ga error', err) // eslint-disable-line no-console
      }
    } else {
      console.log(
        'No `gtag` or `ga` instance exists to send the link clicked event.'
      ) // eslint-disable-line no-console
    }
  }

  render() {
    const { clickActionName, href, to, ...elseProps } = this.props
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={href || to}
        onMouseDown={this.sendClickTrackingEvent}
        onKeyDown={this.sendClickTrackingEvent}
        {...elseProps}
      />
    )
  }
}

TrackedLink.propTypes = {
  clickActionName: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
}

TrackedLink.defaultProps = {
  clickActionName: '',
  href: '',
  to: '',
}
