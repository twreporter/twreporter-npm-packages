import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

// constants
import predefinedPropTypes from '../../constants/prop-types/body'

// twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'

const _ = {
  forEach,
  get,
  merge,
}

const embedNamespace = {
  infogram: 'infogram',
  twreporter: '__twreporterEmbeddedData',
  storyTellingReporter: '@story-telling-reporter',
}

export const Block = styled.div`
  position: relative;
  z-index: ${(props) =>
    props.$shouldEscalateZIndex ? zIndexConst.embedUp : zIndexConst.embedDown};

  /* styles for image link */
  img.img-responsive {
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
`

export const Caption = styled.div`
  line-height: 1.43;
  letter-spacing: 0.4px;
  font-size: 14px;
  color: ${(props) => {
    switch (props.theme.name) {
      case ARTICLE_THEME.v2.photo:
        return colorGrayscale.gray300
      case ARTICLE_THEME.v2.pink:
      case ARTICLE_THEME.v2.default:
      default:
        return colorGrayscale.gray600
    }
  }};
  padding: 15px 15px 0 15px;
`

function dispatchWindowLoadEvent() {
  let loadEvent
  try {
    loadEvent = new Event('load') // eslint-disable-line no-undef
  } catch (err) {
    loadEvent = document.createEvent('Event')
    loadEvent.initEvent('load', true, true)
  }
  window.dispatchEvent(loadEvent)
}

class EmbeddedCode extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    isLoaded: false,
    shouldEscalateZIndex: false,
  }

  constructor(props) {
    super(props)
    this._embedded = React.createRef()
    const { caption, embeddedCode, embeddedCodeWithoutScript } = _.get(
      this.props,
      ['data', 'content', 0],
      {}
    )
    this._caption = caption
    this._embeddedCodeWithoutScript = embeddedCodeWithoutScript
    this._embeddedCode = embeddedCode
  }

  componentDidMount() {
    //  !! WORKAROUND !!
    //  After upgrading to react v18,
    //  `EmbeddedCode` component becomes abnormal.
    //  One case is that `EmbeddedCode` will `executeScript()` twice.
    //  Therefore, the embedded code will generate duplicate contents.
    //
    //  To avoid `executeScript()` twice,
    //  temporarily comment out the following condition.
    //
    //  Delay loading infogram in loadEmbed()
    // if (!this._embeddedCodeWithoutScript?.includes(embedNamespace.infogram)) {
    //   this.setState({ isLoaded: true }, this.executeScript)
    // }
    // Deliberately set z-index for embeded from @twreporter
    if (
      this._embeddedCode?.includes(embedNamespace.twreporter) ||
      this._embeddedCode?.includes(embedNamespace.storyTellingReporter)
    ) {
      this.setState({ shouldEscalateZIndex: true })
    }
  }

  componentWillUnmount() {
    this._embedded = null
    this._caption = null
    this._embeddedCode = null
    this._embeddedCodeWithoutScript = null
  }

  executeScript = () => {
    const node = this._embedded.current
    const scripts = _.get(this.props, ['data', 'content', 0, 'scripts'])
    if (node && Array.isArray(scripts)) {
      const scriptsCount = scripts.length
      let loadScriptsCount = 0
      const scriptsFragment = new DocumentFragment() // eslint-disable-line no-undef
      _.forEach(scripts, (script) => {
        const scriptEle = document.createElement('script')
        const attribs = script.attribs
        _.forEach(attribs, (value, name) => {
          try {
            scriptEle.setAttribute(name, value)
          } catch (err) {
            console.error(
              'Failed to set an attribute to the embbeded script.\n',
              `embedded element id: ${_.get(this.props, 'data.id', '')}\n`,
              `attribute name: ${name}\n`,
              `attribute value: ${value}\n`,
              'error:\n',
              err
            )
          }
        })
        scriptEle.text = script.text || ''
        // `dispatchWindowLoadEvent` is a workaround to trigger rendering of venngage infographics:
        // The embedded venngage code (https://infograph.venngage.com/js/embed/v1/embed.js)
        // will only initiate when `load` event on `window` is emitted.
        // Hence, we need to emit the `load` event of `window` manually after all scripts are load.
        const handleLoad = () => {
          loadScriptsCount += 1
          if (loadScriptsCount === scriptsCount) {
            /* all scripts are load */
            dispatchWindowLoadEvent()
          }
          scriptEle.removeEventListener('load', handleLoad)
        }
        scriptEle.addEventListener('load', handleLoad)
        scriptsFragment.appendChild(scriptEle)
      })
      node.appendChild(scriptsFragment)
    }
  }

  loadEmbed = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true }, this.executeScript)
    }
  }

  render() {
    const { className } = this.props
    const { shouldEscalateZIndex } = this.state
    const embed = (
      <div className={className}>
        <Block
          ref={this._embedded}
          $shouldEscalateZIndex={shouldEscalateZIndex}
          dangerouslySetInnerHTML={{ __html: this._embeddedCodeWithoutScript }}
        />
        {this._caption ? <Caption>{this._caption}</Caption> : null}
      </div>
    )

    if (this._embeddedCodeWithoutScript?.includes(embedNamespace.infogram)) {
      return this.state.isLoaded ? embed : null
    }

    return embed
  }
}

// Serious layout shifts show up when loading bunch of infograms due to lack of heights,
// so here we apply waypoint wrapper to load infogram dynamically to avoid layout shifts for anchors.
// https://twreporter-org.atlassian.net/browse/TWREPORTER-60
const WayPointWrapper = (props) => {
  const { isScrollingToAnchor } = props
  const [isInViewPort, setIsInViewPort] = useState(false)
  const embedRef = useRef(null)

  useEffect(() => {
    if (!isScrollingToAnchor && isInViewPort) {
      embedRef.current.loadEmbed()
    }
  }, [isScrollingToAnchor])

  const onEnter = () => {
    setIsInViewPort(true)
    if (!isScrollingToAnchor) {
      embedRef.current.loadEmbed()
    }
  }

  const onLeave = () => {
    setIsInViewPort(false)
  }

  return (
    // Note: When an anchor is exactly below an infogram embed, onLeave() is not fired
    // when jumping to the anchor because infogram's bottom boundary is just overlapped
    // with viewport's top boundary. Setting topOffset is to shorter infogram's boundary
    // a little bit to make sure onLeave() fires.
    <Waypoint
      onEnter={onEnter}
      onLeave={onLeave}
      fireOnRapidScroll={false}
      topOffset={5}
      bottomOffset="-100%"
    >
      <div>
        <EmbeddedCode {...props} ref={embedRef} />
      </div>
    </Waypoint>
  )
}

WayPointWrapper.defaultProps = {
  isScrollingToAnchor: false,
}

WayPointWrapper.propTypes = {
  isScrollingToAnchor: PropTypes.bool,
}

export default WayPointWrapper
