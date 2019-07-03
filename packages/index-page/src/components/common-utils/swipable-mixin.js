import PropTypes from 'prop-types'
import React from 'react'

class SwipableMixin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
    this.onSwipedRight = this._onSwipedRight.bind(this)
    this.onSwipedLeft = this._onSwipedLeft.bind(this)
  }

  _onSwipedLeft() {
    const { selected } = this.state
    if (selected < this.props.maxSwipableItems) {
      this.setState({
        selected: selected + 1,
      })
    }
  }

  _onSwipedRight() {
    const { selected } = this.state
    if (selected > 0) {
      this.setState({
        selected: selected - 1,
      })
    }
  }
}

SwipableMixin.defaultProps = {
  maxSwipableItems: 0,
}

SwipableMixin.propTypes = {
  maxSwipableItems: PropTypes.string,
}

export default SwipableMixin
