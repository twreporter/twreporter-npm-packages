import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import themeConst from '../../constants/theme'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  forEach,
  get,
  merge,
}

export const Block = styled.div`
  position: relative;

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
  color: ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return 'rgba(255, 255, 255, 0.7)'
      case themeConst.article.v2.pink:
      case themeConst.article.v2.default:
      default:
        return '#808080'
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

export default class EmbeddedCode extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props)
    this._embedded = React.createRef()
  }

  componentDidMount() {
    const node = this._embedded.current
    const scripts = _.get(this.props, ['data', 'content', 0, 'scripts'])
    // Workaround to trigger rendering of venngage infographics:
    // The embedded venngage code (https://infograph.venngage.com/js/embed/v1/embed.js)
    // will initiate when `'load'` event on `window` is emitted.
    // Hence, we need to emit the `'load'` event of `window` manually after all scripts are load.
    if (node && Array.isArray(scripts)) {
      const scriptsCount = scripts.length
      let loadScriptsCount = 0
      _.forEach(scripts, script => {
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
        const handleLoad = () => {
          loadScriptsCount += 1
          if (loadScriptsCount === scriptsCount) {
            /* all scripts are load */
            dispatchWindowLoadEvent()
          }
          scriptEle.removeEventListener('load', handleLoad)
        }
        scriptEle.addEventListener('load', handleLoad)
        node.appendChild(scriptEle)
      })
    }
  }

  render() {
    const { className } = this.props
    const { caption, embeddedCodeWithoutScript } = _.get(
      this.props,
      ['data', 'content', 0],
      {}
    )
    return (
      <div className={className}>
        <Block
          ref={this._embedded}
          dangerouslySetInnerHTML={{ __html: embeddedCodeWithoutScript }}
        />
        {caption ? <Caption>{caption}</Caption> : null}
      </div>
    )
  }
}
