import BackToTopicIcon from '../../assets/aside/back-to-topic-mobile.svg'
import BackToTopIcon from '../../assets/aside/back-to-top-mobile.svg'
import BookmarkWidget from '@twreporter/react-components/lib/bookmark-widget'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import PropTypes from 'prop-types'
import React from 'react'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'

const Container = styled.div`
  ${mq.tabletAndBelow`
    display: inline-block;
    position: fixed;
    right: 5%;
    bottom: 3%;
    z-index: 999;
    visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
    opacity: ${props => (props.toShow ? 1 : 0)};
    transition: opacity 0.5s linear;
  `}

  ${mq.desktopAndAbove`
    display: none;
  `}
`

const IconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: block;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  cursor: pointer;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const SubsequentIconContainer = styled(IconContainer)`
  margin-bottom: 20px;
`

const WidgetWrapper = styled.div`
  margin-bottom: 20px;
`

const BackToTopBtn = () => (
  <IconContainer onClick={() => smoothScroll(0)}>
    <BackToTopIcon />
  </IconContainer>
)

const BackToTopicBtn = props => (
  <DynamicComponentsContext.Consumer>
    {components => {
      return (
        <components.Link to={props.href} target="_self">
          <SubsequentIconContainer>
            <BackToTopicIcon />
          </SubsequentIconContainer>
        </components.Link>
      )
    }}
  </DynamicComponentsContext.Consumer>
)

BackToTopicBtn.propTypes = {
  href: PropTypes.string.isRequired,
}

class MobileAside extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      toShow: false,
    }
  }

  set toShow(toShow) {
    this.setState({
      toShow,
    })
  }

  render() {
    const { backToTopic, articleMetaForBookmark } = this.props

    const { toShow } = this.state
    return (
      <Container toShow={toShow}>
        {backToTopic ? <BackToTopicBtn href={backToTopic} /> : null}
        <WidgetWrapper>
          <BookmarkWidget articleMeta={articleMetaForBookmark} isMobile />
        </WidgetWrapper>
        <BackToTopBtn key="back_to_top" />
      </Container>
    )
  }
}

MobileAside.propTypes = {
  backToTopic: PropTypes.string,
  articleMetaForBookmark: predefinedPropTypes.articleMetaForBookmark,
}

MobileAside.defaultProps = {
  backToTopic: '',
  articleMetaForBookmark: {},
}

export default MobileAside
