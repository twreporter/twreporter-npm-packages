import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
// constants
import predefinedPropTypes from '../../constants/prop-types/body'
import styles from '../../constants/css'
import typography from '../../constants/typography'
// components
import SeparationCurve from '../separation-curve'
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

    line-height: 1.7;
    letter-spacing: 0.7px;
    font-weight: ${typography.font.weight.bold};
    font-size: ${(props) => props.theme.fontSizeOffset + 20}px;
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
