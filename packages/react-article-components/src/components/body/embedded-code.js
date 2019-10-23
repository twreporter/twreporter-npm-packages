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

function dispatchLoadEvent() {
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
    this._embbed = React.createRef()
  }

  componentDidMount() {
    // workaround for rendering venngage embedded infographics
    // In the script(https://infograph.venngage.com/js/embed/v1/embed.js) venngage provided,
    // it addEventListener on 'load' event.
    // After 'load' event emits, it renders the iframe.
    // Hence, we emit the 'load' event after the script downloaded and executed.
    const node = this._embbed.current
    const scripts = _.get(this.props, ['data', 'content', 0, 'scripts'])
    if (node && Array.isArray(scripts)) {
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
        scriptEle.onload = dispatchLoadEvent
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
          ref={this._embbed}
          dangerouslySetInnerHTML={{ __html: embeddedCodeWithoutScript }}
        />
        {caption ? <Caption>{caption}</Caption> : null}
      </div>
    )
  }
}
