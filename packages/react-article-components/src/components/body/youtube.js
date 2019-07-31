import PropTypes from 'prop-types'
import React from 'react'
import predefinedPropTypes from '../../constants/prop-types/body'
import Multimedia from './multimedia'
import styled from 'styled-components'
import get from 'lodash/get'

const _ = {
  get,
}

const Block = Multimedia.Block

const IframeBlock = styled.div`
  padding-bottom: 56.25%;
  position: relative;

  > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Desc = Multimedia.Caption

export default class Youtube extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, data } = this.props
    const id = _.get(data, 'content.0.youtubeId')
    const desc = _.get(data, 'content.0.description')
    return (
      <Block className={className}>
        <IframeBlock>
          <iframe
            frameBorder="0"
            allowFullScreen={true}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${id}`}
          />
        </IframeBlock>
        {desc ? <Desc>{desc}</Desc> : null}
      </Block>
    )
  }
}
