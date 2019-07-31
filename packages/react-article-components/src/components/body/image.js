import Img from '../img-with-placeholder'
import Multimedia from './multimedia'
import PropTypes from 'prop-types'
import predefinedPropTypes from '../../constants/prop-types/body'
import React, { PureComponent } from 'react'
import get from 'lodash/get'

const _ = {
  get,
}

const imgProps = {
  itemProp: 'contentUrl',
}

const Container = Multimedia.Block
const Caption = Multimedia.Caption

export default class Image extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
    small: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    small: false,
  }

  render() {
    const { className, data, small } = this.props
    const image = _.get(data, ['content', 0])
    const caption = _.get(image, 'description')
    const alt = _.get(image, 'keywords', caption)
    return (
      <Container className={className} small={small}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <Img
            alt={alt}
            imgProps={imgProps}
            imageSet={[image.mobile, image.tablet, image.desktop, image.tiny]}
            defaultImage={image.mobile}
            /* TODO: add sizes */
          />
          {caption ? <Caption itemprop="description">{caption}</Caption> : null}
        </figure>
      </Container>
    )
  }
}
