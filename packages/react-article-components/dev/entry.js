import 'regenerator-runtime/runtime'
import { Provider } from 'react-redux'
import Article from '../src/components/article-page'
import Header from '@twreporter/universal-header/dist/containers/header'
import mockPost from './mock-post.json'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'

const HeaderContainerWithTransparentTheme = styled.div`
  position: relative;
  background-color: #fabcf0;
`

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
        <Article
          post={mockPost}
          relatedPosts={mockPost.relateds}
          relatedTopic={mockPost.topics}
        />
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  )
})
