import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const Text = styled.p`
  /* clear default browser styles */
  margin: 0;
  color: ${colorGrayscale.gray600};
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
    id: '',
  }
  static propTypes = {
    license: PropTypes.string,
    publishedDate: PropTypes.string,
    id: PropTypes.string,
  }

  _extractYear(publishedDate) {
    const date = publishedDate ? new Date(publishedDate) : new Date()
    return date.getFullYear()
  }

  render() {
    const { license, publishedDate, id } = this.props
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

    return <Container id={id}>{licenseJSX}</Container>
  }
}
