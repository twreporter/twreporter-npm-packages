import { ControlsContext, StatusContext, TimeContext } from './audio-contexts'
import { Howl } from 'howler'
import memoizeOne from 'memoize-one'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const updateInterval = 200 // ms

export default class AudioProvider extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
    this.state = {
      // The `current`, `duration`, `isPlaying`, and `isMute` in state are just the snapshot of status in `this._sound`.
      // In the other words, setting state won't affect `this._sound`.
      current: 0,
      duration: 0,
      isPlaying: false,
      isMute: false,
    }
    this.stop = this._stop.bind(this)
    this.play = this._play.bind(this)
    this.pause = this._pause.bind(this)
    this.mute = this._mute.bind(this)
    this.setCurrent = this._setCurrent.bind(this)
    this.toggleMute = this._toggleMute.bind(this)
    /* 
      `memoize-one` here is used to prevent creating new object in every render.
      It will shallow compare the input parameters.
      If all parameters are equal to its previous cached ones, it will return the same result.
      `memoize-one` only remembers the latest arguments and result.
    */
    this._createStatusProps = memoizeOne((isMute, isPlaying) => ({
      isMute,
      isPlaying,
    }))
    this._createControlProps = memoizeOne(
      (play, pause, stop, setCurrent, setDuration, toggleMute) => ({
        play,
        pause,
        stop,
        setCurrent,
        setDuration,
        toggleMute,
      })
    )
    this._update = null
    this._sound = null
  }

  _setCurrent(to) {
    const sound = this._sound
    if (sound && typeof sound.seek === 'function') {
      if (to >= 0 && to !== Infinity) {
        // If param `to` is given and valid, set current seek to it and update state with it.
        this.setState({
          current: to, // Not using `current = sound.seek(to).seek()` because `sound.seek(sound.duration()) < sound.duration()` may be true
        })
        sound.seek(to)
      } else {
        // If `to` is undefined, just get the position of playback and update state with it.
        this.setState({
          current: sound.seek(),
        })
      }
    }
  }

  _play() {
    if (this._sound) {
      this._sound.play()
    } else {
      console.warn('Tried to play audio but no sound instance.')
    }
  }

  _stop() {
    if (this._sound) {
      this._sound.stop()
    } else {
      console.warn('Tried to stop audio but no sound instance.')
    }
  }

  _pause() {
    if (this._sound) {
      this._sound.pause()
    } else {
      console.warn('Tried to pause audio but no sound instance.')
    }
  }

  _mute(muteOrNot) {
    if (this._sound) {
      this._sound.mute(muteOrNot)
    } else {
      console.warn('Tried to mute audio but no sound instance.')
    }
  }

  _toggleMute() {
    const nextMute = !this.state.isMute
    this.setState({
      isMute: nextMute,
    })
    this._mute(nextMute)
  }

  componentDidMount() {
    this._sound = new Howl({
      src: this.props.src,
      autoplay: false,
      loop: false,
      html5: true,
      preload: 'metadata',
      onload: () => {
        this.setState({
          duration: this._sound.duration(),
        })
      },
      onstop: () => {
        this.setState({
          current: this._sound.duration(),
          isPlaying: false,
        })
        clearInterval(this._update)
      },
      onplay: () => {
        this.setState(
          {
            isPlaying: true,
          },
          () => {
            this._update = setInterval(() => {
              if (document.hasFocus()) {
                this.setCurrent()
              }
            }, updateInterval)
          }
        )
      },
      onpause: () => {
        this.setState({
          isPlaying: false,
        })
        clearInterval(this._update)
      },
      onplayerror: (soundId, errMessage) => {
        console.warn(
          'Error on playing audio in <AudioProvider>.',
          `this.props.src: ${this.props.src}`,
          `error message ${errMessage}`
        )
      },
      onloaderror: (soundId, errMessage) => {
        console.warn(
          'Error on loading audio in <AudioProvider>.',
          `this.props.src: ${this.props.src}`,
          `error message ${errMessage}`
        )
      },
    })
  }

  componentWillUnmount() {
    this._sound = null
    clearInterval(this._update)
  }

  render() {
    const { current, duration, isMute, isPlaying } = this.state
    return (
      <StatusContext.Provider
        value={this._createStatusProps(isMute, isPlaying)}
      >
        <TimeContext.Provider value={{ current, duration }}>
          <ControlsContext.Provider
            value={this._createControlProps(
              this.play,
              this.pause,
              this.stop,
              this.setCurrent,
              this.setDuration,
              this.toggleMute
            )}
          >
            {this.props.children}
          </ControlsContext.Provider>
        </TimeContext.Provider>
      </StatusContext.Provider>
    )
  }
}
