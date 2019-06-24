import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import hoistStatics from 'hoist-non-react-statics'
import smoothScroll from 'smoothscroll'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

/**
 * Get react component display name
 *
 * @param {object} DecoratedComponent
 * @returns {string} display name of react component
 */
function getDisplayName(DecoratedComponent) {
  return (
    DecoratedComponent.displayName || DecoratedComponent.name || 'Component'
  )
}

/**
 * `decorateSideBar`
 * returns a High Order Component adding the side bar functionalities onto `DecoratedComponent`.
 * It passes props such as `currentAnchorId`, `handleClickAnchor` to the `DecoratedComponent`.
 * `DecoratedSideBar` will map the anchor ids to the sections which are passed as React children,
 * `currentAnchorId` indicates which section is in the viewport right now.
 * `handleClickAnchor` is a function which can be used to scroll to the certain section.
 *
 * For example,
 * ```
 * const anchors = [{
 *  id: 'section-1',
 *  label: 'Section One'
 * }, {
 *  id: 'section-2',
 *  label: 'Section Two'
 * }, {
 *  id: 'section-3',
 *  label: 'Section Three'
 * }]
 *
 * // react component to render side bar
 * const SideBar = ({anchors, currentAnchorId, handleClickAnchor}) => {
 *  const anchorsJSX = []
 *  anchors.ForEach((anchor) => {
 *     anchorsJSX.push(
 *      <div
 *        key={anchor.id}
 *        onClick={(e) => handleClickAnchor(anchor.id, e)}
 *        style={{color: currentAnchorId === anchor.id ? 'black' : 'white'}}
 *      >
 *        {anchor.label}
 *      </div>
 *    )
 *  })
 *  return (
 *    <div>
 *      {anchorsJSX}
 *    </div>
 *  )
 * }
 *
 * const DecoratedSideBar = decoratedSideBar(SideBar)
 *
 * const SideBarWithContent = () => {
 *  return (
 *    <DecoratedSideBar
 *      anchors={anchors}
 *    >
 *      <SectionOne />
 *      <SectionTwo />
 *      <SectionThree />
 *    </DecoratedSideBar>
 *  )
 * }
 *
 * The above codes will render three sections and side bar on the same page.
 * When the section, like `SectionTwo`, scrolls into the viewport,
 * the anchor of that section(`Section Two`) will be black, and others will be white.
 *
 * And when user click the anchor, say if `Secetion Two`, the browser will auto scroll to `SectionTwo`,
 * and anchor `Section Two` will be black.
 * ```
 *
 * @param {Object} DecoratedComponent A React component wants to have side bar functionality
 * @returns {Object} A React component with side bar functionalities
 */
export default function decorateSideBar(DecoratedComponent) {
  const firstSection = 'first'
  const lastSection = 'last'
  const secondLastSection = 'second-last'
  class DecoratedSideBar extends React.PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        currentSection: '',
        previousSection: '',
      }

      this.handleClickAnchor = this._handleClickAnchor.bind(this)
      this.handleOnEnter = this._handleOnEnter.bind(this)
      this.handleOnLeave = this._handleOnLeave.bind(this)
      // moduleID to Module
      this.moduleMap = {}
    }

    componentWillUnmount() {
      this.moduleMap = {}
    }

    _handleClickAnchor(moduleID, e) {
      if (e) {
        e.preventDefault()
      }
      const node = this.moduleMap[moduleID]
      if (node) {
        // scroll to the section
        return smoothScroll(node.offsetTop)
      }
      return null
    }

    _handleOnEnter(nextSection) {
      this.setState({
        previousSection: this.state.currentSection,
        currentSection: nextSection,
      })
    }

    /**
     * Function will be invoked when the section is out of viewport.
     * Currently only handle the first section and last section.
     * For the middle sections, except for the first and last one, could be handled by `onEnter` function.
     *
     * @param {string} onLeaveSection - Section id
     * @param {Object} props - Passed from Waypoint onLeave callback
     * @param {string} props.currentPosition - One of `Waypoint.below`, `Waypoint.above`, `Waypoint.inside`, `Waypoint.invisible`
     * @param {string} order - Section order, could be 'first' or 'last'
     */
    _handleOnLeave(onLeaveSection, props, order) {
      if (order && onLeaveSection === this.state.currentSection) {
        // the following conditions are for edge cases.
        // avoid Waypoint not invoking `onEnter` function.
        if (
          (order === firstSection && props.currentPosition === 'above') ||
          (order === lastSection && props.currentPosition === 'below') ||
          (order === secondLastSection && props.currentPosition === 'above')
        ) {
          return this.setState({
            currentSection: this.state.previousSection,
            previousSection: onLeaveSection,
          })
        }

        // leave the sections controlled by side bar
        this.setState({
          currentSection: '',
          previousSection: onLeaveSection,
        })
      }
    }

    render() {
      const { anchors, children, ...passThroughProps } = this.props

      let modules
      if (!children) {
        modules = []
      } else if (Array.isArray(children)) {
        modules = children
      } else {
        modules = [children]
      }

      const webSiteContent = modules.map((module, index) => {
        const moduleID = _.get(
          anchors,
          [index, 'id'],
          `side_bar_module_${index}`
        )
        let order
        if (index === 0) {
          order = firstSection
        } else if (index === modules.length - 1) {
          order = lastSection
        } else if (index === modules.length - 2) {
          order = secondLastSection
        }

        return (
          <Waypoint
            key={moduleID}
            onLeave={props => {
              this.handleOnLeave(moduleID, props, order)
            }}
            onEnter={props => {
              this.handleOnEnter(moduleID, props)
            }}
            fireOnRapidScroll
            topOffset="4%"
            bottomOffset={order === lastSection ? '50%' : '95%'}
            scrollableAncestor="window"
          >
            <div
              id={moduleID}
              ref={node => {
                this.moduleMap[moduleID] = node
              }}
            >
              {module}
            </div>
          </Waypoint>
        )
      })

      return (
        <DecoratedComponent
          anchors={anchors}
          handleClickAnchor={this.handleClickAnchor}
          currentAnchorId={this.state.currentSection}
          {...passThroughProps}
        >
          {webSiteContent}
        </DecoratedComponent>
      )
    }
  }

  DecoratedSideBar.displayName = `SideBarHOC(${getDisplayName(
    DecoratedComponent
  )})`
  DecoratedSideBar.defaultProps = {
    anchors: [],
    children: [],
  }
  DecoratedSideBar.propTypes = {
    anchors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    children: PropTypes.arrayOf(PropTypes.element),
  }

  return hoistStatics(DecoratedSideBar, DecoratedComponent)
}
