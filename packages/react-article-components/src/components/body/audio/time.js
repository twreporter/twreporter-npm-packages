import { TimeContext } from './audio-contexts'
import React from 'react'

function getMinSecStr(secs) {
  const minutes = Math.floor(secs / 60)
  const seconds = Math.floor(secs - minutes * 60)
  return `${minutes}:${
    seconds < 10 ? `0${seconds.toString()}` : seconds.toString()
  }`
}

export function Current() {
  return (
    <div>
      <TimeContext.Consumer>
        {({ current }) => getMinSecStr(current)}
      </TimeContext.Consumer>
    </div>
  )
}

export function Duration() {
  return (
    <div>
      <TimeContext.Consumer>
        {({ duration }) => getMinSecStr(duration)}
      </TimeContext.Consumer>
    </div>
  )
}
