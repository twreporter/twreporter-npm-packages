import Header from './containers/header'
import PropTypes from 'prop-types'
import React from 'react'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import { CONTEXT_PROP } from './constants/prop-types'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { getAccessToken } from './actions/auth'

export default class StandaloneHeader extends React.PureComponent {
  static propTypes = {
    theme: CONTEXT_PROP.propTypes.theme,
    releaseBranch: CONTEXT_PROP.propTypes.releaseBranch,
    isAuthed: CONTEXT_PROP.propTypes.isAuthed,
    pathname: PropTypes.string,
  }

  static defaultProps = {
    theme: CONTEXT_PROP.defaultProps.theme,
    releaseBranch: CONTEXT_PROP.defaultProps.releaseBranch,
    isAuthed: CONTEXT_PROP.defaultProps.isAuthed,
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
