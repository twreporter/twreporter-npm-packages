import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import styled from 'styled-components'
// @twrepoter
import Header from '@twreporter/universal-header/lib/containers/header'
import Footer from '@twreporter/react-components/lib/footer'
import twreporterRedux from '@twreporter/redux'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

import Article from '../src/components/article-page'
import mockPost from './mock-post.json'

const HeaderContainerWithTransparentTheme = styled.div`
  position: relative;
`

const defaultNumberOfRelateds = 6

class MockTwreporterReactArticleContainer extends React.PureComponent {
  state = {
    fontLevel: 'small',
    numberOfRelatedsToShow: defaultNumberOfRelateds,
  }

  handleFontLevelChange = (nextFontLevel) => {
    this.setState({
      fontLevel: nextFontLevel,
    })
  }

  loadMoreRelateds = () => {
    this.setState({
      numberOfRelatedsToShow:
        this.state.numberOfRelatedsToShow + defaultNumberOfRelateds,
    })
  }

  render() {
    const { fontLevel, numberOfRelatedsToShow } = this.state
    return (
      <Article
        post={mockPost}
        relatedPosts={mockPost.relateds.slice(0, numberOfRelatedsToShow)}
        relatedTopic={mockPost.topics}
        hasMoreRelateds={mockPost.relateds.length > numberOfRelatedsToShow}
        loadMoreRelateds={this.loadMoreRelateds}
        fontLevel={fontLevel}
        onFontLevelChange={this.handleFontLevelChange}
      />
    )
  }
}

function selectHeaderTheme(postStyle) {
  switch (postStyle) {
    case ARTICLE_THEME.v2.photo:
      return 'photography'
    case ARTICLE_THEME.v2.default:
    case ARTICLE_THEME.v2.pink:
    case ARTICLE_THEME.v2.embedded:
      return 'transparent'
    default:
      return 'normal'
  }
}

const store = twreporterRedux.createStore({}, '', true)

try {
  const url = new URL(window.location.href)
  const theme = url.searchParams.get('theme')
  if (theme) {
    mockPost.style = theme
  }
} catch (e) {}
ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <HeaderContainerWithTransparentTheme>
        <Header
          theme={selectHeaderTheme(mockPost.style)}
          isLinkExternal={true}
          releaseBranch="master"
        />
      </HeaderContainerWithTransparentTheme>
      <MockTwreporterReactArticleContainer />
      <Footer />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
)
