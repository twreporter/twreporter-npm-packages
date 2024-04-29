import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import { Waypoint } from 'react-waypoint'
import { Transition } from 'react-transition-group'

/**
 * SectionAnimationWrapper is a High Order Component,
 * which wraps a scroll animation and change the img
 * when scroll ends.
 *
 * @param {object} WrappedComponent - a react component
 * @return a wrapped react component
 */
const SectionAnimationWrapper = WrappedComponent => {
  const Wrapper = ({ data = [], moreURI }) => {
    const [toAnimateScroll, setToAnimateScroll] = useState(false)
    const [isScrollAnimated, setIsScrollAnimated] = useState(false)
    const nodeRef = useRef(null)

    const startScrollAnimation = () => setToAnimateScroll(true)
    const onScrollAnimationFinish = () => {
      if (toAnimateScroll) {
        setIsScrollAnimated(true)
      }
    }

    const timeout = 500
    const defaultStyle = {
      transition: `padding ${timeout}ms ease-in-out`,
    }
    const transitionStyles = {
      entering: { paddingTop: '0' },
      entered: { paddingTop: '0' },
      exiting: { paddingTop: '50px' },
      exited: { paddingTop: '50px' },
    }

    return (
      <Waypoint
        onEnter={startScrollAnimation}
        fireOnRapidScroll={false}
        topOffset="80%"
        bottomOffset="19%"
      >
        <div>
          <Transition
            nodeRef={nodeRef}
            in={toAnimateScroll}
            timeout={timeout}
            onExited={onScrollAnimationFinish}
          >
            {state => (
              <div
                ref={nodeRef}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <WrappedComponent
                  data={data}
                  moreURI={moreURI}
                  useTinyImg={!isScrollAnimated}
                />
              </div>
            )}
          </Transition>
        </div>
      </Waypoint>
    )
  }
  Wrapper.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    moreURI: PropTypes.string,
  }

  return Wrapper
}

export default SectionAnimationWrapper
