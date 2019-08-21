import { Provider } from 'react-redux'
import Header from './containers/header'
import PropTypes from 'prop-types'
import React from 'react'
import wellDefinedPropTypes from './constants/prop-types'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import origins from '@twreporter/core/lib/constants/request-origins'

const isDev = process && process.env && process.env.NODE_ENV === 'development'

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
    const cookie = ''
    this.store = twreporterRedux.createStore(
      {
        [twreporterRedux.reduxStateFields.origins]:
          origins.forClientSideRendering[releaseBranch],
      },
      cookie,
      isDev
    )
  }

  componentDidMount() {
    this.store.actions.getAccessToken()
  }

  render() {
    return (
      <Provider store={this.store}>
        <Header isLinkExternal={true} {...this.props} />
      </Provider>
    )
  }
}
