import styled from 'styled-components'
import mq from '@twreporter/core/lib/utils/media-query'

export const DesktopOnly = styled.div`
  display: none;
  ${mq.desktopOnly`
    display: block;
  `}
`

export const MobileOnly = styled.div`
  display: none;
  ${mq.mobileOnly`
    display: block;
  `}
`

export const DesktopAndAbove = styled.div`
  display: none;
  ${mq.desktopAndAbove`
    display: block;
  `}
`

export const TabletAndBelow = styled.div`
  display: none;
  ${mq.tabletAndBelow`
    display: block;
  `}
`

export const TabletAndAbove = styled.div`
  display: none;
  ${mq.tabletAndAbove`
    display: block;
  `}
`
