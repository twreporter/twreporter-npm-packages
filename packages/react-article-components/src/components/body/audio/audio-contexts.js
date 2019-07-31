import React from 'react'

const createEmptyFunction = funcName => () => {
  console.warn(
    'An empty method that should be overwritten in `ControlContext.Provider` is invoked. The mehtod name is',
    funcName
  )
}

export const TimeContext = React.createContext({
  current: 0,
  duration: 10, // any number > 0 is okay
})

export const ControlsContext = React.createContext({
  play: createEmptyFunction('play'),
  stop: createEmptyFunction('stop'),
  pause: createEmptyFunction('pause'),
  toggleMute: createEmptyFunction('toggleMute'),
  setCurrent: createEmptyFunction('setCurrent'),
})

export const StatusContext = React.createContext({
  isPlaying: false,
  isMute: false,
})
