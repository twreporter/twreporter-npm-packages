import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import { H2 } from '../../text/headline'
import { P1 } from '../../text/paragraph'
import Divider from '../../divider'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  gap: 16px;
  align-self: stretch;
  margin-bottom: 16px;
`

const H2Gray800 = styled(H2)`
  color: ${colorGrayscale.gray800};
`

const P1Gray600 = styled(P1)`
  color: ${colorGrayscale.gray600};
`

const Title1 = ({ title = '', subtitle = '' }) => (
  <div>
    <BarContainer>
      <H2Gray800 text={title} />
      {subtitle ? <P1Gray600 text={subtitle} /> : null}
    </BarContainer>
    <Divider direction={Divider.Direction.HORIZONTAL} />
  </div>
)
Title1.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default Title1
