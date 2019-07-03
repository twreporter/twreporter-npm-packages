import { css } from 'styled-components'

const defaultScreen = {
  tablet: {
    width: 768,
  },
  desktop: {
    width: 1023,
  },
  hd: {
    width: 1440,
  },
}

export function getMediaQueryUtil(screen = defaultScreen) {
  return {
    mobileOnly: (...args) => css`
      @media (max-width: ${screen.tablet.width - 1}px) {
        ${css(...args)}
      }
    `,
    tabletAndBelow: (...args) => css`
      @media (max-width: ${screen.desktop.width - 1}px) {
        ${css(...args)}
      }
    `,
    tabletOnly: (...args) => css`
      @media (min-width: ${screen.tablet.width}px) and (max-width: ${screen
          .desktop.width - 1}px) {
        ${css(...args)}
      }
    `,
    tabletAndAbove: (...args) => css`
      @media (min-width: ${screen.tablet.width}px) {
        ${css(...args)}
      }
    `,
    desktopAndBelow: (...args) => css`
      @media (max-width: ${screen.hd.width - 1}px) {
        ${css(...args)}
      }
    `,
    desktopOnly: (...args) => css`
      @media (min-width: ${screen.desktop.width}px) and (max-width: ${screen.hd
          .width - 1}px) {
        ${css(...args)}
      }
    `,
    desktopAndAbove: (...args) => css`
      @media (min-width: ${screen.desktop.width}px) {
        ${css(...args)}
      }
    `,
    hdOnly: (...args) => css`
      @media (min-width: ${screen.hd.width}px) {
        ${css(...args)}
      }
    `,
  }
}

const defaultMq = getMediaQueryUtil(defaultScreen)

export default defaultMq
