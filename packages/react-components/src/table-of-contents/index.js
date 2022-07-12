import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import indexOf from 'lodash/indexOf'
import memoize from 'memoize-one'
import some from 'lodash/some'
import sortBy from 'lodash/sortBy'
import debounce from 'lodash/debounce'
import { Waypoint } from 'react-waypoint'

const _ = {
  debounce,
  get,
  indexOf,
  some,
  sortBy,
}

/**
 *  TOCManager is a bridge between `Anchor` and `TableOfContents`.
 *  It provides APIs to make them communicate with each others.
 *  For instances, `TOCManager` provides `Anchor`s for `TableOfContents`,
 *  hence, `TableOfContents` could know how to render correspoding labels and
 *  know how to handle those labels clicked(scroll to that `Anchor`).
 */
class TOCManager {
  static position = {
    above: Waypoint.above,
    below: Waypoint.below,
    inside: Waypoint.inside,
    invisible: Waypoint.invisible,
  }

  /**
   *  @constructs
   *  @param {Object} props
   *  @param {Anchor[]} [props.anchors=[]] - anchors of table of contents
   *  @param {Anchor} [props.highlightAnchor=null] - it indicates which anchor is entering the viewport and should be highlighted
   *  @param {TableOfContents} [props.toc=null] - table of contents
   *  @param {boolean} [props.toStopAutoUpdateHighlightAnchor=false] - it stops automatically updating highlight anchor
   */
  constructor({
    anchors = [],
    highlightAnchor = null,
    toc = null,
    toStopAutoUpdateHighlightAnchor = false,
  } = {}) {
    this._anchors = anchors
    this._highlightAnchor = highlightAnchor
    this._toc = toc
    this._toStopAutoUpdateHighlightAnchor = toStopAutoUpdateHighlightAnchor
  }

  /**
   *  use `Array.concat` to add `Anchor` into array
   *
   *  @method
   *  @param {Anchor} anchor - an instance of `Anchor`
   *  @returns
   */
  addAnchor(anchor) {
    if (anchor instanceof Anchor) {
      // we don't use `this._anchors.push(anchor)` here.
      // Instead, we use `concat` function to create a new array.
      // The reason why we create a new array is because
      // we want to make `TableOfContents(PureComponent)` re-render
      this._anchors = this._anchors.concat(anchor)
    }
  }

  /**
   *  Re-render `TableOfContents` if needed.
   *  Use debounce for optimizing rendering performance.
   *  @returns
   */
  renderTOC = _.debounce(() => {
    if (this._toc instanceof TableOfContents) {
      this._toc.forceUpdate()
    }
  }, 100)

  /**
   *  Update highlight anchor.
   *  Use debounce for optimizing rendering performance.
   *  @returns
   */
  updateHighlightAnchor = _.debounce(() => {
    // sort the anchors by the distance to viewport top in ascending order.
    // the reason to sort anchors is because CSS styles(like flex order) might
    // change the anchors' position.
    const anchors = this.memoizeSortAnchorsByViewportTop(this._anchors)

    if (anchors.length === 0) {
      return
    }

    // viewport is above first anchor
    const firstAnchor = anchors[0]
    if (firstAnchor.currentPosition === TOCManager.position.below) {
      this.highlightAnchor = null
      return
    }

    // viewport is below last anchor
    const lastAnchor = anchors[anchors.length - 1]
    if (lastAnchor.currentPosition === TOCManager.position.above) {
      this.highlightAnchor = lastAnchor
      return
    }

    _.some(anchors, (anchor, index) => {
      const curAnchor = anchor
      const nextAnchor = anchors[index + 1]

      if (
        // anchor[i] is inside the viewport
        curAnchor.currentPosition === TOCManager.position.inside ||
        // viewport is between anchor[i] and anchor[i+1]
        (curAnchor.currentPosition === TOCManager.position.above &&
          (nextAnchor instanceof Anchor &&
            nextAnchor.currentPosition === TOCManager.position.below))
      ) {
        this.highlightAnchor = curAnchor
        return true
      }
      return false
    })
  }, 100)

  /**
   *  Sort anchors by the distance to viewport top in ascending order.
   *  @param {Anchor[]} anchors
   *  @returns {Anchor[]}
   */
  sortAnchorsByViewportTop(anchors) {
    return _.sortBy(anchors, anchor => {
      return anchor.getViewportTop()
    })
  }

  /**
   *  Use memoize to improve performance
   */
  memoizeSortAnchorsByViewportTop = memoize(this.sortAnchorsByViewportTop)

  /**
   *  This is a setter function.
   *  It indicates which anchor is entering the viewport
   *  and should be highlighted in the table of contents.
   *  @method
   *  @param {Anchor} anchor - an instance of `Anchor`
   *  @returns
   */
  set highlightAnchor(anchor) {
    if (anchor instanceof Anchor) {
      this._highlightAnchor = anchor
    }

    if (this._toc instanceof TableOfContents) {
      this._toc.setHighlightAnchor(anchor)
    }
  }

  /**
   *  This a getter function.
   *  @method
   *  @return {Anchor} - the anchor is highlighted
   */
  get highlightAnchor() {
    return this._highlightAnchor
  }

  /**
   *  This is a setter function.
   *  @method
   *  @return {undefined}
   */
  set anchors(anchors) {
    this._anchors = anchors
  }

  /**
   *  This is a getter function.
   *  @method
   *  @returns {Anchor[]}
   */
  get anchors() {
    return this._anchors
  }

  /**
   *  This is a setter function.
   *  @method
   *  @returns
   */
  set toc(toc) {
    this._toc = toc
  }

  /**
   *  This is a getter function.
   *  @method
   *  @returns {TableOfContents}
   */
  get toc() {
    return this._toc
  }

  /**
   *  This is a setter function.
   *  @method
   *  @returns
   */
  set toStopAutoUpdateHighlightAnchor(toStopAutoUpdateHighlightAnchor) {
    this._toStopAutoUpdateHighlightAnchor = toStopAutoUpdateHighlightAnchor
  }

  /**
   *  This is a getter function.
   *  @method
   *  @returns {boolean}
   */
  get toStopAutoUpdateHighlightAnchor() {
    return this._toStopAutoUpdateHighlightAnchor
  }
}

class Anchor extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    manager: PropTypes.instanceOf(TOCManager).isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    topOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    className: '',
    bottomOffset: '69%',
    topOffset: '30%',
  }

  constructor(props) {
    super(props)

    this._ref = React.createRef()

    this.getViewportTop = this._getViewportTop.bind(this)
    this.handleOnPositionChange = this._handleOnPositionChange.bind(this)

    this.currentPosition = TOCManager.position.invisible

    const { manager } = props
    manager.addAnchor(this)
    manager.renderTOC()
  }

  /**
   *  @returns {number} - the distance between the top edge of anchor and the top of window
   */
  _getViewportTop() {
    try {
      if (typeof window !== 'undefined' && this._ref.current) {
        const scrollY = window.scrollY
        const { top = 0 } = this._ref.current.getBoundingClientRect()
        return scrollY + top
      }
    } catch (e) {
      console.warn(
        `Anchor(id: ${this.props.id}).getViewportTop occurs error`,
        e
      )
      console.warn('Return default value: 0')
    }

    return 0
  }

  /**
   *  @param {Object} [posObj={}]
   *  @param {string} [posObj.currentPosition=''] - it could be one of
   *  Waypoint.below, Waypoint.above, Waypoint.inside and Waypoint.invisible
   *
   *  @returns
   */
  _handleOnPositionChange(posObj = {}) {
    const { manager } = this.props

    this.currentPosition = posObj.currentPosition

    if (manager.toStopAutoUpdateHighlightAnchor) {
      return
    }

    manager.updateHighlightAnchor()
  }

  /**
   *  This is a getter function.
   *  @method
   *  @returns {string} - id of anchor
   */
  get anchorID() {
    return this.props.id
  }

  /**
   *  This is a getter function.
   *  @method
   *  @returns {string} - label of anchor
   */
  get anchorLable() {
    return this.props.label
  }

  render() {
    const { bottomOffset, className, children, id, topOffset } = this.props
    return (
      // set fireOnRapidScroll=false since we are not using `onEnter` and  `onLeave`
      <Waypoint
        bottomOffset={bottomOffset}
        topOffset={topOffset}
        onPositionChange={this.handleOnPositionChange}
        fireOnRapidScroll={false}
      >
        <div id={id} className={className} ref={this._ref}>
          {children}
        </div>
      </Waypoint>
    )
  }
}

class TableOfContents extends React.PureComponent {
  static propTypes = {
    manager: PropTypes.instanceOf(TOCManager).isRequired,

    /**
     *  @callback
     *  @param {Anchor[]} anchors
     *  @param {?Anchor} highlightAnchor
     *  @param {Function} handleAnchorClick - callback function for handling clicking anchor
     */
    render: PropTypes.func,
  }

  constructor(props) {
    super(props)

    const { manager } = props

    this.state = {
      highlightAnchor: manager.highlightAnchor,
    }

    this.setHighlightAnchor = this._setHighlightAnchor.bind(this)
    this.handleAnchorClick = this._handleAnchorClick.bind(this)

    manager.toc = this
  }

  /**
   *  @param {Anchor} anchor - anchor to highlight
   *  @returns
   */
  _setHighlightAnchor(anchor) {
    this.setState({
      highlightAnchor: anchor,
    })
  }

  /**
   *  @param {string} anchorID - id of clicked anchor
   *  @returns
   */
  _handleAnchorClick(anchorID) {
    const { manager } = this.props
    const anchors = manager.anchors
    _.some(anchors, anchor => {
      if (anchorID === anchor.anchorID) {
        this.setState(
          {
            highlightAnchor: anchor,
          },
          () => {
            manager.toStopAutoUpdateHighlightAnchor = true
            window.scroll({
              top: anchor.getViewportTop(),
              behavior: 'auto',
            })
            manager.toStopAutoUpdateHighlightAnchor = false
          }
        )
        return true
      }
      return false
    })
  }

  render() {
    const { manager, render } = this.props
    let { highlightAnchor } = this.state

    const anchors = manager.anchors
    const orderedAnchors = manager.memoizeSortAnchorsByViewportTop(anchors)

    if (typeof render === 'function') {
      return render(orderedAnchors, highlightAnchor, this.handleAnchorClick)
    }

    return null
  }
}

/**
 *  @module TOC
 */

export default {
  Manager: TOCManager,
  React: {
    Anchor,
    TableOfContents,
  },
}
