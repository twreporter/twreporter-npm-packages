import 'regenerator-runtime/runtime'
import { Provider } from 'react-redux'
import Article from '../src/components/article-page'
import Header from '@twreporter/universal-header/lib/containers/header'
import mockPost from './mock-post.json'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'

const HeaderContainerWithTransparentTheme = styled.div`
  position: relative;
  background-color: #fabcf0;
`

class MockTwreporterReactArticleContainer extends React.PureComponent {
  static propTypes = {
    post: PropTypes.object,
    relatedPosts: PropTypes.array,
    relatedTopic: PropTypes.object,
  }

  state = {
    fontLevel: 'small',
  }

  handleFontLevelChange = nextFontLevel => {
    this.setState({
      fontLevel: nextFontLevel,
    })
  }

  render() {
    const { post, relatedPosts, relatedTopic } = this.props
    const { fontLevel } = this.state
    return (
      <Article
        post={post}
        relatedPosts={relatedPosts}
        relatedTopic={relatedTopic}
        fontLevel={fontLevel}
        onFontLevelChange={this.handleFontLevelChange}
      />
    )
  }
}

twreporterRedux.createStore({}, '', true).then(store => {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <HeaderContainerWithTransparentTheme>
          <Header
            theme="transparent"
            isLinkExternal={true}
            releaseBranch="master"
          />
        </HeaderContainerWithTransparentTheme>
        <MockTwreporterReactArticleContainer
          post={mockPost}
          relatedPosts={mockPost.relateds}
          relatedTopic={mockPost.topics}
        />
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  )
})
