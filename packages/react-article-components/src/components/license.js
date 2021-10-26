import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import themeConst from '../constants/theme'
import colorConst from '../constants/color'

const Text = styled.p`
  /* clear default browser styles */
  margin: 0;

  color: ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return colorConst.gray5
      case themeConst.article.v2.pink:
      case themeConst.article.v2.default:
      default:
        return colorConst.gray80
    }
  }};

  font-size: 16px;
  line-height: 1.38;
`

const Container = styled.div`
  text-align: center;
  padding: 0 24px;
`

export default class License extends React.PureComponent {
  static defaultProps = {
    license: 'Creative-Commons',
    publishedDate: '',
  }
  static propTypes = {
    license: PropTypes.string,
    publishedDate: PropTypes.string,
  }

  _extractYear(publishedDate) {
    const date = publishedDate ? new Date(publishedDate) : new Date()
    return date.getFullYear()
  }

  render() {
    const { license, publishedDate } = this.props
    const year = this._extractYear(publishedDate)
    let licenseJSX = ''

    if (
      typeof license === 'string' &&
      license.toLowerCase() === 'copyrighted'
    ) {
      licenseJSX = <Text>© {year} All rights Reserved</Text>
    } else {
      licenseJSX = (
        <Text>本文依 CC 創用姓名標示-非商業性-禁止改作3.0台灣授權條款釋出</Text>
      )
    }

    return <Container>{licenseJSX}</Container>
  }
}
