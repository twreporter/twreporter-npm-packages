import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReduxStoreContext from '../context/redux-store'

class Provider extends PureComponent {
  constructor(props) {
    super(props)
    const { store } = this.props
    this.state = store.getState()
    this.unsubscribe = store.subscribe(
      this.saveStoreStateToDetectStateChange.bind(this)
    )
  }
  saveStoreStateToDetectStateChange() {
    this.setState(this.store.getState())
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    // Why we do not pass the store to value directly?
    //   If the `render` is invoked, it means that state have changed.
    //   We need to invoke the rerendering of each context consumer.
    //   But the `Context.Consumer` only do shallow compare, and `this.props.store` is the reference of the store object which would always be the same.
    //   So we need to create a new object for it to tell consumer to rerender.
    return (
      <ReduxStoreContext.Provider
        value={{
          store: this.props.store,
        }}
      >
        {this.props.children}
      </ReduxStoreContext.Provider>
    )
  }
}

Provider.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }),
  children: PropTypes.any,
}

export default Provider
