import camelCase from 'camelcase'
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

/**
 * Pick attributes that start with data and return them with a new object.
 * Example: ({ data-width: 100, data-pic-id: 'xn3K8s', src: 'xx.png' }) => ({ dataset: { width: 100, picId: 'xn3K8s' }, notDataset: { src: 'xx.png' }  })
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 *
 * @param {Object} attributes attributes object with camelcased keys
 * @returns {Object}
 */
function _groupAttribsDataset(attributes) {
  const dataset = {}
  const notDataset = {}
  _.forEach(attributes, (value, key) => {
    const reg = /^data[^a-z]/
    const attributeName = camelCase(key)
    if (reg.test(attributeName)) {
      const newKeyInDataset = attributeName.replace(reg, matched =>
        matched.substr(-1, 1).toLowerCase()
      )
      dataset[newKeyInDataset] = value
    } else {
      notDataset[attributeName] = value
    }
  })
  return {
    dataset,
    notDataset,
  }
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
        try {
          const scriptEle = document.createElement('script')
          const attribs = script.attribs
          const newAttribs = _groupAttribsDataset(attribs)
          _.merge(scriptEle, newAttribs.notDataset, {
            dataset: newAttribs.dataset,
            text: script.text || '',
            onload: dispatchLoadEvent,
          })
          node.appendChild(scriptEle)
        } catch (err) {
          console.error(
            `Append embbeded script error. ID: ${_.get(
              this.props,
              'data.id',
              ''
            )}, Error: `,
            err
          )
        }
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
