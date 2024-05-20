import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TYPE_FONT_FAMILY } from './constants/headline-type'
import { Type } from './enums'
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight } from '@twreporter/core/lib/constants/font'

const DefaultContainer = styled.div`
  font-weight: ${fontWeight.bold};
`

const H1Container = styled(DefaultContainer)`
  line-height: 125%;
  font-size: 36px;
  font-family: ${(props) => props.$fontFamily};
  ${mq.tabletAndBelow`
    font-size: 28px;
  `}
`

const H2Container = styled(DefaultContainer)`
  line-height: 125%;
  font-size: 32px;
  font-family: ${(props) => props.$fontFamily};
  ${mq.tabletAndBelow`
    font-size: 24px;
  `}
`

const H3Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 28px;
  font-family: ${(props) => props.$fontFamily};
  ${mq.tabletAndBelow`
    font-size: 22px;
  `}
`

const H4Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 22px;
  font-family: ${(props) => props.$fontFamily};
  ${mq.tabletAndBelow`
    font-size: 18px;
  `}
`

const H5Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 18px;
  font-family: ${(props) => props.$fontFamily};
  ${mq.tabletAndBelow`
    font-size: 17px;
  `}
`

const H6Container = styled(DefaultContainer)`
  line-height: 150%;
  font-size: 16px;
  font-family: ${(props) => props.$fontFamily};
  ${mq.tabletAndBelow`
    font-size: 16px;
  `}
`

const withContainer = (HeadlineContainer) => {
  const headline = ({
    text = '',
    type = Type.DEFAULT,
    className = '',
    ...props
  }) => {
    const fontFamily = TYPE_FONT_FAMILY[type]
    return (
      <HeadlineContainer
        $fontFamily={fontFamily}
        className={className}
        {...props}
      >
        {text}
      </HeadlineContainer>
    )
  }

  headline.displayName = 'headline'
  headline.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(Object.values(Type)),
    className: PropTypes.string,
  }
  headline.Type = Type

  return headline
}

export const H1 = withContainer(H1Container)
export const H2 = withContainer(H2Container)
export const H3 = withContainer(H3Container)
export const H4 = withContainer(H4Container)
export const H5 = withContainer(H5Container)
export const H6 = withContainer(H6Container)

export default {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}
