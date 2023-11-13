import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import SeparationCurve from '../separation-curve'
import styled from 'styled-components'
import styles from '../../constants/css'
import themeConst from '../../constants/theme'
import typography from '../../constants/typography'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const Content = styled.div`
  font-family: ${typography.font.family.title};
  p {
    color: ${props => {
      switch (props.theme.name) {
        case themeConst.article.v2.photo:
          return colorGrayscale.gray300
        case themeConst.article.v2.pink:
        case themeConst.article.v2.default:
        default:
          return colorGrayscale.gray600
      }
    }};

    line-height: 1.7;
    letter-spacing: 0.7px;
    font-weight: ${typography.font.weight.bold};
    font-size: ${props => props.theme.fontSizeOffset + 20}px;
    margin: 0 0 1em 0;
    &:last-child {
      margin: 0;
    }
  }
  ${styles.linkChildren}
`

export default class Brief extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(predefinedPropTypes.elementData),
  }

  static defaultProps = {
    className: '',
    data: [],
  }

  _buildContentElement = (data, index) => {
    switch (data.type) {
      case 'unstyled':
        const htmlString = _.get(data, ['content', 0])
        if (!htmlString) return null
        return (
          <p
            key={_.get(data, 'id', `p-${index}`)}
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { className, data } = this.props
    const elements = _.map(data, this._buildContentElement).filter(Boolean)
    return elements.length > 0 ? (
      <div className={className}>
        <Content>{elements}</Content>
        <SeparationCurve />
      </div>
    ) : null
  }
}
