import { getMediaQueryUtil } from '@twreporter/core/lib/utils/media-query'

const screen = {
  tablet: {
    width: 768,
  },
  desktop: {
    width: 992,
  },
  hd: {
    width: 1200,
  },
}

export default getMediaQueryUtil(screen)
