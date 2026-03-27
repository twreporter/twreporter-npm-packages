import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
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

const License = ({
  license = 'Creative-Commons',
  publishedDate = '',
  createdAt,
  id = '',
}) => {
  const getYear = useCallback(() => {
    if (!publishedDate && !createdAt) return ''

    const date = publishedDate ? new Date(publishedDate) : new Date(createdAt)
    return date.getFullYear()
  }, [publishedDate, createdAt])

  const year = getYear()
  let licenseJSX

  if (typeof license === 'string' && license.toLowerCase() === 'copyrighted') {
    licenseJSX = <Text>© {year} All rights reserved.</Text>
  } else {
    licenseJSX = (
      <Text>
        本文僅文字內容依 CC 創用姓名標示－非商業性－禁止改作 3.0
        台灣授權條款釋出，
        <br />
        文中照片不在此授權範圍內。
      </Text>
    )
  }

  return <Container id={id}>{licenseJSX}</Container>
}

License.propTypes = {
  license: PropTypes.string,
  publishedDate: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
}

export default License
