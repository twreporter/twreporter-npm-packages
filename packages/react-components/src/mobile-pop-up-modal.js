import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// twreporter
import zIndexConst from '@twreporter/core/lib/constants/z-index'

const Modal = styled.div`
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  position: fixed;
  top: 0;
  z-index: ${zIndexConst.popup};
  overflow-y: scroll;
`

class MobileModal extends React.PureComponent {
  static propTypes = {
    modalHeight: PropTypes.string,
    modalWidth: PropTypes.string,
  }

  static defaultProps = {
    modalHeight: '100vh',
    modalWidth: '100vw',
  }

  constructor(props) {
    super(props)
    // fix ios device not update vh value when toolbar show/hide
    // ref: https://developers.google.com/web/updates/2016/12/url-bar-resizing
    // ref: https://nicolas-hoizey.com/articles/2015/02/18/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers/
    this.state = {
      modalHeight:
        props.modalHeight === '100vh'
          ? `${window.innerHeight}px`
          : props.modalHeight,
    }
    this.startY = 0
    this.panel = React.createRef()
    this.handleTouchstartWhenPanning =
      this._handleTouchstartWhenPanning.bind(this)
    this.handleTouchendWhenPanning = this._handleTouchendWhenPanning.bind(this)
    this.handleTouchmoveWhenPanning =
      this._handleTouchmoveWhenPanning.bind(this)
  }

  componentDidMount() {
    window.document.body.addEventListener(
      'touchstart',
      this.handleTouchstartWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.addEventListener(
      'touchend',
      this.handleTouchendWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.addEventListener(
      'touchmove',
      this.handleTouchmoveWhenPanning,
      {
        passive: false,
      }
    )
  }

  componentWillUnmount() {
    window.document.body.removeEventListener(
      'touchstart',
      this.handleTouchstartWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.removeEventListener(
      'touchend',
      this.handleTouchendWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.removeEventListener(
      'touchmove',
      this.handleTouchmoveWhenPanning,
      {
        passive: false,
      }
    )
  }

  _updateStartY(startY) {
    this.startY = startY
  }

  _updateScrollY(endY) {
    this.panel.current.scrollTop += this.startY - endY
  }

  _handleTouchstartWhenPanning(event) {
    this._updateStartY(event.touches[0].screenY)
  }

  _handleTouchendWhenPanning(event) {
    this._updateScrollY(event.changedTouches[0].screenY)
  }

  _handleTouchmoveWhenPanning(event) {
    event.preventDefault()
    this._updateScrollY(event.changedTouches[0].screenY)
    this._updateStartY(event.changedTouches[0].screenY)
  }

  render() {
    const { modalWidth, ...rest } = this.props
    const { modalHeight } = this.state

    return (
      <Modal
        $height={modalHeight}
        $width={modalWidth}
        ref={this.panel}
        {...rest}
      />
    )
  }
}

export default MobileModal
