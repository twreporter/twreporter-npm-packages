import { TimeContext, ControlsContext, StatusContext } from './audio-contexts'
import React from 'react'
import styled from 'styled-components'
import Slider, { Indicator, Rail, Progress } from '../slider'
import themeConst from '../../../constants/theme'

function getIndicatorColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.pink:
      return '#ef7ede'
    case themeConst.article.v2.photo:
    case themeConst.article.v2.default:
    default:
      return '#a67a44'
  }
}

function getProgressColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.pink:
      return '#fbafef'
    case themeConst.article.v2.photo:
    case themeConst.article.v2.default:
    default:
      return '#d0a67d'
  }
}

const Container = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  position: relative;
  ${Indicator} {
    background: ${props => getIndicatorColor(props.theme.name)};
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
  ${Rail} {
    background: #d8d8d8;
  }
  ${Progress} {
    background: ${props => getProgressColor(props.theme.name)};
  }
`
let resumePlayingAfterSeek = false
export default function SeekBar() {
  return (
    <Container>
      <ControlsContext.Consumer>
        {({ play, pause, setCurrent }) => (
          <StatusContext.Consumer>
            {({ isPlaying }) => (
              <TimeContext.Consumer>
                {({ duration, current }) => (
                  <Slider
                    defaultValue={0}
                    value={current}
                    min={0}
                    max={duration}
                    onSeekEnd={({ value }) => {
                      setCurrent(value)
                      if (resumePlayingAfterSeek) {
                        resumePlayingAfterSeek = false
                        play()
                      }
                    }}
                    onSeekStart={() => {
                      if (isPlaying) {
                        resumePlayingAfterSeek = true
                        pause()
                      }
                    }}
                    onSeeking={({ value }) => {
                      setCurrent(value)
                    }}
                  />
                )}
              </TimeContext.Consumer>
            )}
          </StatusContext.Consumer>
        )}
      </ControlsContext.Consumer>
    </Container>
  )
}
