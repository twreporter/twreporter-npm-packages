import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import color from '../../../constants/color'

export const Rail = styled.div`
  width: 100%;
  height: 100%;
  background: ${color.gray55};
  position: relative;
  cursor: ${props => (props.isHeld ? 'grabbing' : 'pointer')};
`

export const Progress = styled.div.attrs(({ w }) => ({
  style: {
    width: w ? `${w}px` : 0,
  },
}))`
  background: white;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

export const Indicator = styled.div.attrs(({ x }) => ({
  style: {
    left: x ? `${x}px` : 0,
  },
}))`
  width: 10px;
  height: 100%;
  background: black;
  position: absolute;
  top: 0;
  cursor: ${props => (props.isHeld ? 'grabbing' : 'grab')};
`

function funcWarn(funcName, err) {
  console.warn(`Error on \`${funcName}\``, err)
}

/**
 * Get the x coordinate (in pixel) of the left edge of browser viewport relative to the left edge of document.
 *
 * @returns {number}
 */
function getViewportPositionX() {
  try {
    // `window.pageXOffset` works at most modern browsers.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/pageXOffset#Browser_compatibility
    // And different old browser has different fallback.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollX#Notes
    return window.pageXOffset !== undefined
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft
  } catch (err) {
    funcWarn('getViewportPositionX', err)
    return 0
  }
}

/**
 * Get the x coordinate (in pixel) of the mouse position relative to the left edge of document
 *
 * @param {MouseEvent} mouseEvent
 * @returns {number}
 */
function getMousePositionX(mouseEvent) {
  try {
    return mouseEvent.pageX || mouseEvent.clientX + getViewportPositionX()
  } catch (err) {
    funcWarn('getMousePositionX', err)
    return 0
  }
}

/**
 * Get the x coordinate (in pixel) of the touch position relative to the left edge of document
 *
 * @param {TouchEvent} touchEvent
 * @returns {number}
 */
function getTouchPositionX(touchEvent) {
  try {
    return touchEvent.touches[0].pageX
  } catch (err) {
    funcWarn('getTouchPositionX', err)
    return 0
  }
}

/**
 * Get the x coordinates (in pixel) of left and right edges of the element relative to document.
 *
 * @param {Element} element
 * @returns {Object}
 */
function getHorizontalEdgeOfElement(element) {
  try {
    const elementEdgeRelaToViewport = element.getBoundingClientRect()
    const viewportX = getViewportPositionX()
    return {
      left: elementEdgeRelaToViewport.left + viewportX,
      right: elementEdgeRelaToViewport.right + viewportX,
    }
  } catch (err) {
    funcWarn('getHorizontalEdgeOfElement', err)
    return {}
  }
}

/**
 * Get the element out bound width (includes border) in pixel
 *
 * @param {Element} element
 * @returns {number}
 */
function getElementOutBoundWidth(element) {
  try {
    const bound = element.getBoundingClientRect()
    return bound.right - bound.left
  } catch (err) {
    funcWarn('getElementOutBoundWidth', err)
    return 0
  }
}

/**
 * Calculate the relative position in target range with the same ratio in source range.
 *
 * @param {number} sourceValue
 * @param {number} sourceMin
 * @param {number} sourceMax
 * @param {number} targetMin
 * @param {number} targetMax
 * @returns
 */
function project(sourceValue, sourceMin, sourceMax, targetMin, targetMax) {
  if (sourceValue === sourceMin) return targetMin
  if (sourceValue === sourceMax) return targetMax
  const targetSourceRatio = (targetMax - targetMin) / (sourceMax - sourceMin)
  return sourceValue * targetSourceRatio + targetMin
}

/**
 *
 *
 * @param {Event} e
 */
function pauseEvent(e) {
  e.stopPropagation()
  e.preventDefault()
}

/**
 * Return the boolean value indicating that if there are multiple fingers on device
 *
 * @param {TouchEvent} e
 * @returns {Boolean}
 */
function isNotSimpleTouch(e) {
  return (
    e.touches.length > 1 ||
    (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)
  )
}

function ensureValueInRange(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

function noop() {}

export default class Slider extends React.Component {
  static propTypes = {
    // The `defaultValue`, `value`, `min`, and `max` share the same unit given by the consumer of this component.
    defaultValue: PropTypes.number, // The initial represented value of the indicator. Will be translate to its position.
    value: PropTypes.number, // The value that will be translate to indicator position.
    min: PropTypes.number, // The value represented by the indicator the when it be moved to the start (left).
    max: PropTypes.number, // The value represented by the indicator the when it be moved to the end (right).
    // `onSeekEnd` will be invoked when user change the position of indicator. (By drag and drop the indicator or click the slider)
    // It will be invoked with `params.value` represented by the location of indicator.
    onSeekEnd: PropTypes.func,
    // `onSeekStart` will be invoked when user start draggin the indicator
    onSeekStart: PropTypes.func,
    onSeeking: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: 0,
    min: 0,
    max: 100,
    onSeekEnd: noop,
    onSeekStart: noop,
    onSeeking: noop,
  }

  constructor(props) {
    super(props)
    this.state = {
      isIndicatorHeld: false, // Is the user dragging the indicator or not
      indicatorX: 0, // The distance between the left edge of indicator and the left edge of slider
      indicatorXMax: 10, // The distance between the left edge of indicator at start and the left edge of it at end
      indicatorOffset: 0, // The distance between where mousedown invoked and the left edge of indicator
    }
    this._rail = React.createRef()
    this._indicator = React.createRef()
    this.handleResize = this._handleResize.bind(this)
    this.handleMouseDown = this._handleMouseDown.bind(this)
    this.handleMouseMove = this._handleMouseMove.bind(this)
    this.handleMouseUp = this._handleMouseUp.bind(this)
    this.handleTouchStart = this._handleTouchStart.bind(this)
    this.handleTouchMove = this._handleTouchMove.bind(this)
    this.handleTouchEnd = this._handleTouchEnd.bind(this)
    this.preventNativeDragging = this._preventNativeDragging.bind(this)
  }

  componentDidMount() {
    this._setIndicatorXMaxToStateIfChanged()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResize)
    this._removeDocumentMouseEvent()
    this._removeDocumentTouchEvent()
  }

  _addDocumentMouseEvent() {
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  _removeDocumentMouseEvent() {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  _addDocumentTouchEvent() {
    document.addEventListener('touchend', this.handleTouchEnd)
    document.addEventListener('touchmove', this.handleTouchMove)
  }

  _removeDocumentTouchEvent() {
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('touchmove', this.handleTouchMove)
  }

  _calcIndicatorXByValue(value) {
    const _value = value || this.props.value
    const { min, max } = this.props
    const { indicatorXMax } = this.state
    return project(_value, min, max, 0, indicatorXMax)
  }

  _calcValueByIndicatorX(indicatorX) {
    const _indicatorX = indicatorX || this.state.indicatorX
    const { indicatorXMax } = this.state
    const { min, max } = this.props
    return project(_indicatorX, 0, indicatorXMax, min, max)
  }

  _calcIndicatorXByPointerX(pointerX, forcedOffset) {
    const { indicatorOffset, indicatorXMax } = this.state
    const indicatorX =
      pointerX -
      (forcedOffset || indicatorOffset) -
      getHorizontalEdgeOfElement(this._rail.current).left
    return ensureValueInRange(indicatorX, 0, indicatorXMax)
  }

  _handleResize() {
    this._setIndicatorXMaxToStateIfChanged()
  }

  _setIndicatorXMaxToStateIfChanged() {
    const railRect = this._rail.current.getBoundingClientRect()
    const nextIndicatorMax =
      railRect.right -
      railRect.left -
      getElementOutBoundWidth(this._indicator.current)
    const { value, defaultValue, min, max } = this.props
    if (nextIndicatorMax !== this.state.indicatorXMax) {
      this.setState({
        indicatorX: project(
          value || defaultValue,
          min,
          max,
          0,
          nextIndicatorMax
        ),
        indicatorXMax: nextIndicatorMax,
      })
    }
  }

  _handlePointerStart(pointerOnIndicator, pointerX) {
    const indicatorOffset = pointerOnIndicator
      ? this._calcGrabOffset(pointerX)
      : getElementOutBoundWidth(this._indicator.current) / 2
    this.setState(
      {
        isIndicatorHeld: true,
        indicatorOffset,
        indicatorX: this._calcIndicatorXByPointerX(pointerX, indicatorOffset),
      },
      () => {
        this.props.onSeekStart()
      }
    )
  }

  _handleMouseDown(e) {
    if (e.button !== 0) return // Do nothing if it's not the main button be clicked
    const isMouseOnIndicator = e.target === this._indicator.current
    const mouseX = getMousePositionX(e)
    this._handlePointerStart(isMouseOnIndicator, mouseX)
    this._addDocumentMouseEvent()
  }

  _handleTouchStart(e) {
    if (isNotSimpleTouch(e)) return
    const isTouchOnIndicator = e.target === this._indicator.current
    const touchX = getTouchPositionX(e)
    this._handlePointerStart(isTouchOnIndicator, touchX)
    this._addDocumentTouchEvent()
    pauseEvent(e) // Prevent `onmousedown` event to be triggered
  }

  _handlePointerMove(nextIndicatorX) {
    if (this.state.indicatorX !== nextIndicatorX) {
      this.setState(
        {
          indicatorX: nextIndicatorX,
        },
        () => {
          const { onSeeking } = this.props
          if (onSeeking !== noop) {
            onSeeking({ value: this._calcValueByIndicatorX() })
          }
        }
      )
    }
  }

  _handleMouseMove(e) {
    const nextIndicatorX = this._calcIndicatorXByPointerX(getMousePositionX(e))
    this._handlePointerMove(nextIndicatorX)
  }

  _handleTouchMove(e) {
    const nextIndicatorX = this._calcIndicatorXByPointerX(getTouchPositionX(e))
    this._handlePointerMove(nextIndicatorX)
  }

  _handlePointerEnd() {
    this.setState({
      isIndicatorHeld: false,
      indicatorOffset: 0,
    })
    this.props.onSeekEnd({ value: this._calcValueByIndicatorX() })
  }

  _handleMouseUp(e) {
    this._handlePointerEnd()
    this._removeDocumentMouseEvent()
  }

  _handleTouchEnd(e) {
    this._handlePointerEnd()
    this._removeDocumentTouchEvent()
  }

  _calcGrabOffset(pointerX) {
    const indicatorEdge = getHorizontalEdgeOfElement(this._indicator.current)
    if (pointerX < indicatorEdge.left || pointerX > indicatorEdge.right) {
      console.warn(
        'Error on `_calcGrabOffset`: The pointer is not located in the indicator, return grab offset as 0.'
      )
      return 0
    }
    return pointerX - indicatorEdge.left
  }

  _preventNativeDragging(e) {
    pauseEvent(e)
  }

  render() {
    const indicatorX =
      typeof this.props.value === 'undefined' || this.state.isIndicatorHeld
        ? this.state.indicatorX
        : this._calcIndicatorXByValue()
    return (
      <Rail
        ref={this._rail}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        isHeld={this.state.isIndicatorHeld}
        onDragStart={this.preventNativeDragging}
      >
        <Progress
          w={
            this._indicator.current
              ? indicatorX +
                getElementOutBoundWidth(this._indicator.current) / 2
              : 0
          }
        />
        <Indicator
          ref={this._indicator}
          x={indicatorX}
          isHeld={this.state.isIndicatorHeld}
        />
      </Rail>
    )
  }
}
