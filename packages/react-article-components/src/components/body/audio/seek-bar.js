import { TimeContext, ControlsContext, StatusContext } from './audio-contexts'
import React from 'react'
import styled from 'styled-components'
import Slider, { Indicator, Rail, Progress } from '../slider'

const Container = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  position: relative;
  ${Indicator} {
    background: ${props => props.theme.colors.primary.accent};
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
    background: ${props => props.theme.colors.primary.support};
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
