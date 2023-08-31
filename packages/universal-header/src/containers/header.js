import React from 'react'
import { connect } from 'react-redux'
import HeaderContext from '../contexts/header-context'
// constant
import { CONTEXT_PROP } from '../constants/prop-types'
// feature toggle
import HeaderNew from '../components/header'
import HeaderOld from '../components/header-old'
import { MEMBERSHIP } from '@twreporter/core/lib/constants/feature-flag'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const Header = MEMBERSHIP ? HeaderNew : HeaderOld

const HIDE_HEADER_THRESHOLD = 8
const TRANSFORM_HEADER_THRESHOLD = 40
const TRANSFORM_TIMEOUT = 800

class Container extends React.PureComponent {
  static defaultProps = {
    ...CONTEXT_PROP.defaultProps,
  }
  static propTypes = {
    ...CONTEXT_PROP.propTypes,
  }

  constructor(props) {
    super(props)
    this.state = {
      toUseNarrow: false,
      hideHeader: false,
    }
    this.lastKnownPageYOffset = 0
    this.ticking = false
    this.handleScroll = this.__handleScroll.bind(this)

    // Below parameters are used to calculate scroll transform status.
    this.currentY = 0
    this.readyY = 0
    this.isTransforming = false
    this.transformTimer = null
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    this.lastKnownPageYOffset = null
    this.ticking = null
    this.handleScroll = null
    this.currentY = null
    this.readyY = null
    this.isTransforming = null
    this.transformTimer = null
  }

  /**
   * Wrap __handleScroll() with requestAnimationFrame() to avoid triggering browser reflow due to reading window.pageYOffset.
   * ref: https://developer.mozilla.org/en-US/docs/web/api/document/scroll_event#Example
   */
  __handleScroll() {
    this.lastKnownPageYOffset = window.pageYOffset
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.__updateScrollState(this.lastKnownPageYOffset)
        this.ticking = false
      })
      this.ticking = true
    }
  }

  __updateScrollState(currentScrollTop) {
    const scrollDirection = currentScrollTop > this.currentY ? 'down' : 'up'
    this.currentY = currentScrollTop
    const updateState = this.__getScrollState(currentScrollTop, scrollDirection)
    this.setState(updateState)
  }

  __getScrollState(scrollTop, scrollDirection) {
    const isCurrentNarrow = this.state.toUseNarrow
    const nextToUseNarrow = scrollTop > TRANSFORM_HEADER_THRESHOLD
    let scrollState = {}

    if (this.isTransforming) {
      return scrollState
    }

    if (scrollDirection === 'up') {
      this.readyY = scrollTop
      scrollState.hideHeader = false
    }

    if (scrollDirection === 'down') {
      // after transforming to narrow header, header should hide when scroll down
      if (isCurrentNarrow && scrollTop - this.readyY > HIDE_HEADER_THRESHOLD) {
        scrollState.hideHeader = true
      }
    }

    if (isCurrentNarrow) {
      // after transforming to narrow header, always remain narrow when scroll down
      scrollState.toUseNarrow =
        scrollDirection === 'down' ? true : nextToUseNarrow
    } else {
      // after transfroming to wide header, always remain wide when scroll up
      scrollState.toUseNarrow =
        scrollDirection === 'up' ? false : nextToUseNarrow
    }

    // register transform timer to mark header transform status
    if (isCurrentNarrow !== scrollState.toUseNarrow) {
      if (!this.transformTimer) {
        this.isTransforming = true
        this.transformTimer = setTimeout(() => {
          this.isTransforming = false
          this.readyY = this.currentY
          this.transformTimer = null
        }, TRANSFORM_TIMEOUT)
      }
    }

    return scrollState
  }

  render() {
    const {
      releaseBranch,
      isAuthed,
      isLinkExternal,
      theme,
      pathname,
      referrerPath,
      hamburgerContext,
    } = this.props
    const { toUseNarrow, hideHeader } = this.state
    const contextValue = {
      releaseBranch,
      isAuthed,
      isLinkExternal,
      theme,
      pathname,
      referrerPath,
      toUseNarrow,
      hideHeader,
    }

    return (
      <HeaderContext.Provider value={contextValue}>
        <Header hamburgerContext={hamburgerContext} />
      </HeaderContext.Provider>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthed: _.get(state, 'auth.isAuthed', false),
  }
}

export default connect(mapStateToProps)(Container)
