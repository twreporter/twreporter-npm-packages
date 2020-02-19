import Header from './containers/header'
import PropTypes from 'prop-types'
import React from 'react'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import wellDefinedPropTypes from './constants/prop-types'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { getAccessToken } from './actions/auth'

export default class StandaloneHeader extends React.PureComponent {
  static propTypes = {
    theme: wellDefinedPropTypes.context.propTypes.theme,
    releaseBranch: wellDefinedPropTypes.context.propTypes.releaseBranch,
    isAuthed: wellDefinedPropTypes.context.propTypes.isAuthed,
    pathname: PropTypes.string,
  }

  static defaultProps = {
    theme: wellDefinedPropTypes.context.defaultProps.theme,
    releaseBranch: wellDefinedPropTypes.context.defaultProps.releaseBranch,
    isAuthed: wellDefinedPropTypes.context.defaultProps.isAuthed,
    pathname: '',
  }

  constructor(props) {
    super(props)
    const { releaseBranch } = this.props
    this.store = createStore(
      rootReducer,
      {
        origins: requestOrigins.forClientSideRendering[releaseBranch],
        auth: {},
      },
      applyMiddleware(thunk)
    )
  }

  componentDidMount() {
    this.store.dispatch(getAccessToken()).catch(failAction => {
      console.log(failAction)
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <Header isLinkExternal={true} {...this.props} />
      </Provider>
    )
  }
}
