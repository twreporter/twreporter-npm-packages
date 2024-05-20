import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import { Waypoint } from 'react-waypoint'
import { Transition } from 'react-transition-group'

const ScrollFadein = ({ children }) => {
  const [transitionIn, setTransitionIn] = useState(false)
  const [isInit, setIsInit] = useState(true)
  const nodeRef = useRef(null)

  const startAnimation = () => setTransitionIn(true)
  const onAnimationFinish = () => {
    if (!isInit && typeof this.module.srcToSrcset === 'function') {
      this.module.srcToSrcset()
      return
    }
    setIsInit(false)
  }

  const timeout = 680
  const defaultStyle = {
    transition: `padding ${timeout}ms ease-in-out`,
  }
  const transitionStyles = {
    entering: { opacity: 1, paddingTop: '0' },
    entered: { opacity: 1, paddingTop: '0' },
    exiting: { opacity: 0.5, paddingTop: '50px' },
    exited: { opacity: 0.5, paddingTop: '50px' },
  }

  return (
    <Waypoint
      onEnter={startAnimation}
      fireOnRapidScroll
      topOffset="80%"
      bottomOffset="19%"
    >
      <div>
        <Transition
          nodeRef={nodeRef}
          in={transitionIn}
          timeout={timeout}
          onExited={onAnimationFinish}
        >
          {state => (
            <div
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </div>
    </Waypoint>
  )
}

ScrollFadein.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ScrollFadein
