import PropTypes from 'prop-types'
import React from 'react'
import { Waypoint } from 'react-waypoint'
import VelocityComponent from 'velocity-react/velocity-component'

class ScrollFadein extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startAnimation: false,
    }
    this.startAnimation = this._startAnimation.bind(this)
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
    this.ifInitialization = true
  }

  _startAnimation() {
    this.setState({
      startAnimation: true,
    })
  }

  _onAnimationFinish() {
    if (
      !this.ifInitialization &&
      typeof this.module.srcToSrcset === 'function'
    ) {
      this.module.srcToSrcset()
      return
    }
    this.ifInitialization = false
  }

  render() {
    return (
      <Waypoint
        onEnter={this.startAnimation}
        fireOnRapidScroll
        topOffset="80%"
        bottomOffset="19%"
      >
        <div>
          <VelocityComponent
            animation={
              this.state.startAnimation
                ? { opacity: 1, paddingTop: 0 }
                : { opacity: 0.5, paddingTop: '50px' }
            }
            duration={680}
            complete={this.onAnimationFinish}
            runOnMount={false}
          >
            <div>
              {React.cloneElement(this.props.children, {
                ref: node => {
                  this.module = node
                },
              })}
            </div>
          </VelocityComponent>
        </div>
      </Waypoint>
    )
  }
}

ScrollFadein.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ScrollFadein
