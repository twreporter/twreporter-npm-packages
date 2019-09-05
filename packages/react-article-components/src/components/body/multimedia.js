import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'
import typography from '../../constants/typography'

const mockup = {
  mobile: {
    width: {
      normal: '100%',
      small: 'calc(250/375*100%)', // %
    },
    caption: {
      width: 250, // px
    },
  },
  tablet: {
    width: {
      normal: '100%',
      small: 'calc(512/768*100%)', // %
    },
    caption: {
      width: 512, // px
    },
  },
  desktop: {
    width: {
      normal: 100, // %
      small: 403, // px
    },
    caption: {
      width: 180, // px
    },
  },
  hd: {
    width: {
      normal: 100, // %
      small: 532, // px
    },
    caption: {
      width: 265, // px
    },
  },
}

export default {
  Block: styled.div`
    position: relative;

    & > figure, & > iframe {
      padding: 0;
      border: 0;
      margin: 0;
    }

    ${mq.tabletAndBelow`
      margin-left: ${props => (props.small ? 'auto' : '0px')};
      margin-right: ${props => (props.small ? '0px' : 'auto')};
      float: none;
    `}

    ${mq.mobileOnly`
      width: ${props =>
        props.small
          ? `${mockup.mobile.width.small}`
          : `${mockup.mobile.width.normal}`};
    `}

    ${mq.tabletOnly`
      width: ${props =>
        props.small
          ? `${mockup.tablet.width.small}`
          : `${mockup.tablet.width.normal}`};
    `}

    ${mq.desktopOnly`
      float: ${props => (props.small ? 'right' : 'none')};
      margin: ${props => (props.small ? '0 0 20px 25px' : '60px auto')};
      width: ${props =>
        props.small
          ? `${mockup.desktop.width.small}px`
          : `${mockup.desktop.width.normal}%`};
    `}

    ${mq.hdOnly`
      float: ${props => (props.small ? 'right' : 'none')};
      margin: ${props => (props.small ? '0 0 20px 25px' : '60px auto')};
      width: ${props =>
        props.small
          ? `${mockup.hd.width.small}px`
          : `${mockup.hd.width.normal}%`};
    `}
  `,
  Caption: styled.figcaption`
    color: ${props => props.theme.colors.base.text};
    line-height: 1.36;
    letter-spacing: 0.5px;
    font-weight: ${typography.font.weight.normal};
    font-size: ${props => props.theme.fontSizeOffset + 14}px;

    /* border-bottom of caption */
    &:after {
      content: '';
      height: 1px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid ${props => props.theme.colors.primary.support};
    }

    ${mq.tabletAndBelow`
      position: relative;
      margin-left: auto;
      background-color: ${props => props.theme.colors.base.background};
      padding: 15px 15px 15px 0;
      &:after {
        width: calc(100% - 15px);
      }
    `}

    ${mq.mobileOnly`
      max-width: ${mockup.mobile.caption.width}px;
    `}

    ${mq.tabletOnly`
      max-width: ${mockup.tablet.caption.width}px;
    `}

    ${mq.desktopAndAbove`
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateY(100%);

      &:after {
        width: 100%;
      }
    `}

    ${mq.desktopOnly`
      width: ${mockup.desktop.caption.width}px;
      padding: 15px 0 15px 0;
    `}
    ${mq.hdOnly`
      width: ${mockup.hd.caption.width}px;
      padding: 25px 0 20px 0;
    `}
  `,
}
