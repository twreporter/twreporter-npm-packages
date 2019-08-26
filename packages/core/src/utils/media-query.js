import { css } from 'styled-components'

const defaultScreen = {
  tablet: {
    minWidth: 768,
  },
  desktop: {
    minWidth: 1024,
  },
  hd: {
    minWidth: 1440,
  },
}

export function getMediaQueryUtil(screen = defaultScreen) {
  return {
    mobileOnly: (...args) => css`
      @media (max-width: ${screen.tablet.minWidth - 1}px) {
        ${css(...args)}
      }
    `,
    tabletAndBelow: (...args) => css`
      @media (max-width: ${screen.desktop.minWidth - 1}px) {
        ${css(...args)}
      }
    `,
    tabletOnly: (...args) => css`
      @media (min-width: ${screen.tablet.minWidth}px) and (max-width: ${screen
          .desktop.minWidth - 1}px) {
        ${css(...args)}
      }
    `,
    tabletAndAbove: (...args) => css`
      @media (min-width: ${screen.tablet.minWidth}px) {
        ${css(...args)}
      }
    `,
    desktopAndBelow: (...args) => css`
      @media (max-width: ${screen.hd.minWidth - 1}px) {
        ${css(...args)}
      }
    `,
    desktopOnly: (...args) => css`
      @media (min-width: ${screen.desktop.minWidth}px) and (max-width: ${screen
          .hd.minWidth - 1}px) {
        ${css(...args)}
      }
    `,
    desktopAndAbove: (...args) => css`
      @media (min-width: ${screen.desktop.minWidth}px) {
        ${css(...args)}
      }
    `,
    hdOnly: (...args) => css`
      @media (min-width: ${screen.hd.minWidth}px) {
        ${css(...args)}
      }
    `,
  }
}

const defaultMq = getMediaQueryUtil(defaultScreen)

export default defaultMq
