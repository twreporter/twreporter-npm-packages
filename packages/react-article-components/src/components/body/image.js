import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// components
import Img from '../img-with-placeholder'
import Multimedia from './multimedia'
// constants
import predefinedPropTypes from '../../constants/prop-types/body'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const imgProps = {
  itemProp: 'contentUrl',
}

const Container = Multimedia.Block
const Caption = Multimedia.Caption

const CaptionForTrackingSection = styled(P2)`
  color: ${colorGrayscale.gray700};
  margin-top: 8px;
`

export default class Image extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
    small: PropTypes.bool,
    forTrackingSection: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    small: false,
    forTrackingSection: false,
  }

  render() {
    const { className, data, small, forTrackingSection } = this.props
    const image = _.get(data, ['content', 0])
    const caption = _.get(image, 'description')
    const alt = _.get(image, 'keywords', caption)
    const appendedClassName = className + ' avoid-break'

    return (
      <Container className={appendedClassName} $small={small}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <Img
            alt={alt}
            imgProps={imgProps}
            imageSet={[image.mobile, image.tablet, image.desktop, image.tiny]}
            defaultImage={image.mobile}
            clickable={true}
            /* TODO: add sizes */
          />
          {caption ? (
            forTrackingSection ? (
              <CaptionForTrackingSection text={caption} />
            ) : (
              <Caption itemprop="description">{caption}</Caption>
            )
          ) : null}
        </figure>
      </Container>
    )
  }
}
