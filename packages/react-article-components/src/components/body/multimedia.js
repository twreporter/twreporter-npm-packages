import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'
import typography from '../../constants/typography'

const mockup = {
  mobile: {
    figure: {
      width: '100%',
    },
    caption: {
      width: 250, // px
    },
  },
  tablet: {
    figure: {
      width: '100%',
    },
    caption: {
      width: 512, // px
    },
  },
  desktop: {
    figure: {
      width: {
        normal: 100, // %
        small: 403, // px
      },
    },
    caption: {
      width: 180, // px
    },
  },
  hd: {
    figure: {
      width: {
        normal: 100, // %
        small: 532, // px
      },
    },
    caption: {
      width: 265, // px
    },
  },
}

const Caption = styled.figcaption`
  color: ${props => props.theme.colors.base.text};
  line-height: 1.36;
  letter-spacing: 0.5px;
  font-weight: ${typography.font.weight.normal};
  font-size: ${props => props.theme.fontSizeOffset + 14}px;
  margin-bottom: 30px;

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
    /* clear float */
    clear: both;

    position: relative;
    float: right;

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
`

const Block = styled.div`
  position: relative;

  & > figure, & > iframe {
    padding: 0;
    border: 0;
    margin: 0;
  }

  ${mq.mobileOnly`
    width: ${mockup.mobile.figure.width};
  `}

  ${mq.tabletOnly`
    width: ${mockup.tablet.figure.width};
  `}

  ${mq.desktopOnly`
    float: ${props => (props.small ? 'right' : 'none')};
    margin: ${props => (props.small ? '0 0 20px 25px' : '0')};
    width: ${props =>
      props.small
        ? `${mockup.desktop.figure.width.small}px`
        : `${mockup.desktop.figure.width.normal}%`};
  `}

  ${mq.hdOnly`
    float: ${props => (props.small ? 'right' : 'none')};
    margin: ${props => (props.small ? '0 0 20px 25px' : 0)};
    width: ${props =>
      props.small
        ? `${mockup.hd.figure.width.small}px`
        : `${mockup.hd.figure.width.normal}%`};
  `}

  ${Caption} {
    ${mq.desktopAndAbove`
      ${props =>
        props.small
          ? `
        /* overwrite Caption styles */
        float: none;
        margin-bottom:0;
        position: absolute;

        /* give new styles */
        right: 0;
        bottom: 0;
        transform: translateY(100%);
      `
          : ''}
    `}
  }
`

export default {
  Block,
  Caption,
}
