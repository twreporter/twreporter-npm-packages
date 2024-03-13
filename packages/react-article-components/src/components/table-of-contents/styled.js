import styled from 'styled-components'
// @twerporter
import mq from '@twreporter/core/lib/utils/media-query'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
// constants
import typography from '../../constants/typography'

const tocWidth = 190 // px

export const TOCBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`

export const TOCText = styled.div`
  font-size: 14px;
  font-weight: ${typography.font.weight.normal};
  line-height: 1.29;
  letter-spacing: 0.1px;
  color: ${props =>
    props.toHighlight
      ? props.theme.colors.toc.accent
      : props.theme.colors.toc.text};
  &:hover {
    color: ${props => props.theme.colors.toc.accent};
  }
  margin-left: 5px;
  margin-right: auto;
  max-width: 150px;
`

export const TOCIndicator = styled.div`
  width: ${props => {
    if (props.toHighlight && !props.isExpanded) {
      return '30px'
    } else if (props.toHighlight && props.isExpanded) {
      return '20px'
    }
    return '10px'
  }};
  border-top: ${props =>
    props.toHighlight
      ? `solid 2px ${props.theme.colors.toc.accent}`
      : `solid 2px ${props.theme.colors.toc.text}`};
  transition: width 0.3s ease-in-out, border-top 0.3s ease-in-out,
    transform 0.1s ease-in-out 0.1s;
  margin-top: 7px;

  flex-shrink: 0;

  ${mq.tabletAndBelow`
    transform: ${props =>
      props.isExpanded ? 'translateX(0px)' : `translateX(${tocWidth - 30}px)`};
  `}

  ${mq.desktopAndAbove`
    transform: ${props =>
      props.isExpanded ? 'translateX(0px)' : `translateX(${tocWidth - 10}px)`};
  `}
`

export const TOCRow = styled.div`
  cursor: pointer;
  display: flex;
  margin: 15px 15px 15px 0;
`

export const TOCTabWrapper = styled.div`
  ${mq.tabletAndBelow`
    width: 30px;
    position: fixed;
    z-index: ${zIndexConst.toc};
    top: 20%;
    left: 0;
    transition: transform 200ms;
    transform: ${props =>
      props.isHidden || false ? 'translateX(-100%)' : 'translateX(0%)'};
  `}

  ${mq.desktopAndAbove`
    display: none;
  `}
`

export const TOCTab = styled.div`
  transition: transform 0.1s ease-in-out 0.1s;
  transform: ${props =>
    props.isExpanded ? `translateX(${tocWidth}px)` : 'translateX(0px)'};

  > div {
    opacity: 0.6;
    color: ${props => props.theme.colors.base.lightText};
    font-size: 14px;
    width: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const TOCBackground = styled.div`
  position: fixed;
  z-index: ${zIndexConst.toc};
  top: 0;
  left: 0;
  height: 100%;
  width: ${tocWidth}px;
  background-color: ${props => props.theme.colors.toc.background};
  transition: transform 0.1s ease-in-out 0.1s;

  ${mq.tabletAndBelow`
    transform: ${props =>
      props.isExpanded ? 'translateX(0px)' : `translateX(-${tocWidth}px)`};
  `}

  ${mq.desktopAndAbove`
    transform: ${props =>
      props.isExpanded ? 'translateX(0px)' : `translateX(-${tocWidth - 10}px)`};
  `}
`
