import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addons } from '@storybook/addons'
import {
  UPDATE_GLOBALS,
  STORY_ARGS_UPDATED,
  STORY_CHANGED,
} from '@storybook/core-events'
import {
  colorGrayscale,
  colorPhoto,
} from '@twreporter/core/lib/constants/color'

const themeColor = {
  normal: { name: 'normal', value: colorGrayscale.gray100 },
  index: { name: 'normal', value: colorGrayscale.gray100 },
  photography: { name: 'photography', value: colorPhoto.dark },
  transparent: { name: 'transparent', value: colorGrayscale.gray600 },
}
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  backgrounds: {
    default: 'normal',
    values: [
      themeColor.normal,
      themeColor.photography,
      themeColor.transparent,
      { name: 'white', value: colorGrayscale.white },
    ],
  },
}

let channel = addons.getChannel()
const storyListener = args => {
  const { theme } = args.args
  if (!theme) {
    return
  }

  if (!['normal', 'photography', 'transparent', 'index'].includes(theme)) {
    return
  }
  const backgrounds = themeColor[theme]
  channel.emit(UPDATE_GLOBALS, {
    globals: {
      backgrounds,
    },
  })
}

const removeBackgrounds = args => {
  channel.emit(UPDATE_GLOBALS, {
    globals: {
      backgrounds: {},
    },
  })
}

function setupBackgroundListener() {
  channel.removeAllListeners()
  channel.addListener(STORY_ARGS_UPDATED, storyListener)
  channel.addListener(STORY_CHANGED, removeBackgrounds)
}

setupBackgroundListener()
