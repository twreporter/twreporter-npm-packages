import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  position: fixed;
  z-index: 999;
  overflow-y: scroll;
  max-height: -webkit-fill-available;
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
    this.startY = 0
    this.panel = null
    this.handleTouchstartWhenPanning = this._handleTouchstartWhenPanning.bind(this)
    this.handleTouchendWhenPanning = this._handleTouchendWhenPanning.bind(this)
    this.handleTouchmoveWhenPanning = this._handleTouchmoveWhenPanning.bind(this)
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
    this.panel = null
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
    this.panel.scrollTop += (this.startY - endY)
  }

  _handleTouchstartWhenPanning(event) {
    this._updateStartY(event.touches[0].screenY)
  }

  _handleTouchendWhenPanning(event) {
    this._updateScrollY(event.changedTouches[0].screenY)
  }

  _handleTouchmoveWhenPanning = event => {
    event.preventDefault()
    this._updateScrollY(event.changedTouches[0].screenY)
    this._updateStartY(event.changedTouches[0].screenY)
  }

  render() {
    const { modalHeight, modalWidth, ...rest } = this.props

    return (
      <Modal
        height={modalHeight}
        width={modalWidth}
        ref={node => {
          this.panel = node
        }}
        {...rest}
      />
    )
  }
}

export default MobileModal
