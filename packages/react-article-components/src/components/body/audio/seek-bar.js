import { TimeContext, ControlsContext, StatusContext } from './audio-contexts'
import React from 'react'
import styled, { css } from 'styled-components'
import Slider, { Indicator, Rail, Progress } from '../slider'
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

function getContainerStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.pink:
      return css`
        ${Indicator} {
          background-color: ${COLOR_PINK_ARTICLE.darkPink};
        }

        ${Progress} {
          background-color: ${COLOR_PINK_ARTICLE.pink};
        }
      `
    case ARTICLE_THEME.v2.photo:
      return css`
        ${Indicator} {
          background-color: ${colorSupportive.heavy};
        }

        ${Progress} {
          background-color: ${colorSupportive.main};
        }
      `
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        ${Indicator} {
          background-color: ${colorSupportive.heavy};
        }
        ${Progress} {
          background-color: ${colorSupportive.main};
        }
      `
  }
}

const Container = styled.div`
  ${(props) => getContainerStyles(props.theme.name)}
  width: 100%;
  height: 4px;
  border-radius: 2px;
  position: relative;
  ${Indicator} {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
  ${Rail} {
    background: ${colorGrayscale.gray300};
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
