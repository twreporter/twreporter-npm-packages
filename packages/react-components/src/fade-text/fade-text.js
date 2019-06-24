import mq from './media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import scrollManager from './scroll-manager'
import styled, { keyframes } from 'styled-components'

const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Shrink = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 0;
    height: 0;
  }
`

const FadeOutDuration = 2

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  body: {
    overflow: hidden;
  }
  animation: ${Shrink} 100ms linear;
  animation-delay: ${props => (props.delay ? `${props.delay}s` : '10s')};
  animation-fill-mode: forwards;
`

const FadeOutContainer = styled.div`
  animation: ${FadeOut} ${FadeOutDuration}s ease-in-out;
  animation-delay: ${props => (props.delay ? `${props.delay}s` : '10s')};
  animation-fill-mode: forwards;
  width: 100%;
  height: 100%;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => (props.bgColor ? props.bgColor : 'black')};
  position: relative;
`

const FadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const TextFrame = styled.div`
  opacity: 0;
  color: ${props => (props.fontColor ? props.fontColor : 'white')};
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${FadeInOut}
    ${props => (props.duration ? `${props.duration}s` : '3s')} ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: ${props => (props.delay >= 0 ? `${props.delay}s` : '3s')};
  text-align: center;
  width: 88%;
  font-size: 50px;
  font-weight: 100;
  line-height: 1.6;
  text-align: center;
  ${mq.desktopOnly`
    width: 80%;
  `}
  ${mq.mobileOnly`
    font-size: 30px;
    line-height: 1.67;
  `}
`
const { childAnimationStoper, unlockAfterAnimation } = scrollManager

const scrollUnlocker = e => {
  if (e) {
    e.stopPropagation()
  }
  const body = document.body
  const html = document.documentElement
  body.style.overflow = 'visible'
  body.style.height = 'auto'
  body.style.touchAction = 'auto'
  body.style.position = 'static'
  html.style.overflow = 'visible'
  html.style.height = 'auto'
  html.style.touchAction = 'auto'
  html.style.position = 'static'
}

const unlockScroll = (ifUnlock, node) => {
  if (ifUnlock) {
    unlockAfterAnimation(node, scrollUnlocker)
  } else {
    childAnimationStoper(node)
  }
}

class FadeText extends PureComponent {
  constructor(props) {
    super(props)
    this.global = () => {}
  }
  componentDidMount() {
    if (this.props.ifLock) {
      const body = document.body
      const html = document.documentElement
      body.style.overflow = 'hidden'
      body.style.height = '100%'
      body.style.touchAction = 'manipulation'
      body.style.position = 'relative'
      html.style.overflow = 'hidden'
      html.style.height = '100%'
      html.style.touchAction = 'manipulation'
      html.style.position = 'relative'
    }
  }

  componentWillUnmount() {
    if (this.props.ifUnlock) {
      scrollUnlocker()
    }
  }

  render() {
    const {
      bgColor,
      duration,
      textArr,
      fontColor,
      bgOutDuration,
      ifUnlock,
    } = this.props
    const textFrames = () => {
      return textArr.map((v, i) => {
        return (
          <TextFrame
            duration={duration}
            delay={i * duration}
            key={`fade_text_${v}`}
            fontColor={fontColor}
            ref={childAnimationStoper}
          >
            {v}
          </TextFrame>
        )
      })
    }

    return (
      <Container
        delay={duration * textArr.length + bgOutDuration + FadeOutDuration}
        onTouchStart={e => {
          e.preventDefault()
        }}
        onTouchMove={e => {
          e.preventDefault()
        }}
      >
        <FadeOutContainer
          delay={duration * textArr.length + bgOutDuration}
          ref={node => {
            unlockScroll(ifUnlock, node)
          }}
        >
          <Background bgColor={bgColor}>{textFrames()}</Background>
        </FadeOutContainer>
      </Container>
    )
  }
}

FadeText.propTypes = {
  bgColor: PropTypes.string.isRequired,
  textArr: PropTypes.array.isRequired,
  fontColor: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  bgOutDuration: PropTypes.number.isRequired,
  ifLock: PropTypes.bool.isRequired,
  ifUnlock: PropTypes.bool.isRequired,
}

export default FadeText
