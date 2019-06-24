import VelocityComponent from '@twreporter/velocity-react/velocity-component'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'

/**
 * SectionAnimationWrapper is a High Order Component,
 * which wraps a scroll animation and change the img
 * when scroll ends.
 *
 * @param {object} WrappedComponent - a react component
 * @return a wrapped react component
 */
const SectionAnimationWrapper = WrappedComponent => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        toAnimateScroll: false,
        isScrollAnimated: false,
      }
      this.startScrollAnimation = this._startScrollAnimation.bind(this)
      this.onScrollAnimationFinish = this._onScrollAnimationFinish.bind(this)
    }

    _startScrollAnimation() {
      this.setState({
        toAnimateScroll: true,
      })
    }

    _onScrollAnimationFinish() {
      if (this.state.toAnimateScroll) {
        this.setState({
          isScrollAnimated: true,
        })
      }
    }

    render() {
      const { data, moreURI } = this.props
      return (
        <Waypoint
          onEnter={this.startScrollAnimation}
          fireOnRapidScroll
          topOffset="80%"
          bottomOffset="19%"
        >
          <div>
            <VelocityComponent
              animation={
                this.state.toAnimateScroll
                  ? { paddingTop: 0 }
                  : { paddingTop: '50px' }
              }
              duration={500}
              complete={this.onScrollAnimationFinish}
              runOnMount={false}
              easing="ease-in-out"
            >
              <div>
                <WrappedComponent
                  data={data}
                  moreURI={moreURI}
                  useTinyImg={!this.state.isScrollAnimated}
                />
              </div>
            </VelocityComponent>
          </div>
        </Waypoint>
      )
    }
  }

  Wrapper.defaultProps = {
    data: [],
    moreURI: undefined,
  }

  Wrapper.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    moreURI: PropTypes.string,
  }

  return Wrapper
}

export default SectionAnimationWrapper
