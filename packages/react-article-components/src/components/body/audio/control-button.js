import { StatusContext, ControlsContext } from './audio-contexts'
import mq from '@twreporter/core/lib/utils/media-query'
import PauseIcon from '../../../assets/body/audio/pause.svg'
import PlayIcon from '../../../assets/body/audio/play.svg'
import React from 'react'
import styled from 'styled-components'
import themeConst from '../../../constants/theme'

function getButtonBorderColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return 'rgba(255, 255, 255, 0.25)'
    case themeConst.article.v2.pink:
    case themeConst.article.v2.default:
    default:
      return '#d8d8d8'
  }
}

function getButtonBgColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return '#08192d'
    case themeConst.article.v2.pink:
      return '#f4f4f4'
    case themeConst.article.v2.default:
    default:
      return '#f1f1f1'
  }
}

function getIconColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return '#d0a67d'
    case themeConst.article.v2.pink:
      return '#ef7ede'
    case themeConst.article.v2.default:
    default:
      return '#a67a44'
  }
}

const IconWrapper = styled.button`
  ${mq.tabletAndBelow`
    width: 48px;
    height: 48px;
  `}
  ${mq.tabletAndAbove`
    width: 65px;
    height: 65px;
  `}
  background-color: ${props => getButtonBgColor(props.theme.name)};
  border: 1px solid ${props => getButtonBorderColor(props.theme.name)};
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  user-select: none;
  outline: none;
  > svg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    path {
      stroke: ${props =>
        props.isPlaying ? getIconColor(props.theme.name) : 'none'};
      fill: ${props =>
        props.isPlaying ? 'none' : getIconColor(props.theme.name)};
    }
  }
`

export default function ControlButton() {
  return (
    <ControlsContext.Consumer>
      {({ play, pause }) => (
        <StatusContext.Consumer>
          {({ isPlaying }) => (
            <IconWrapper
              isPlaying={isPlaying}
              onClick={isPlaying ? pause : play}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconWrapper>
          )}
        </StatusContext.Consumer>
      )}
    </ControlsContext.Consumer>
  )
}
