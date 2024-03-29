import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import { H5 } from '../../text/headline'
import { P2 } from '../../text/paragraph'
import Divider from '../../divider'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  align-self: stretch;
  margin-bottom: 16px;
  justify-content: space-between;
  ${mq.tabletAndBelow`
    margin-bottom: 8px;
  `}
`

const Text = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`

const H5Gray800 = styled(H5)`
  color: ${colorGrayscale.gray800};
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const DividerGray800 = styled(Divider)`
  border-color: ${colorGrayscale.gray800};
`

const Title2 = ({ title = '', subtitle = '', renderButton }) => {
  return (
    <>
      <BarContainer>
        <Text>
          <H5Gray800 text={title} />
          {subtitle ? <P2Gray600 text={subtitle} /> : null}
        </Text>
        {renderButton || null}
      </BarContainer>
      <DividerGray800 direction={Divider.Direction.HORIZONTAL} />
    </>
  )
}

Title2.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  renderButton: PropTypes.element,
}

export default Title2
