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
import { THEME } from '@twreporter/core/lib/constants/theme'

const themeColor = {
  [THEME.normal]: { name: THEME.normal, value: colorGrayscale.gray100 },
  [THEME.index]: { name: THEME.normal, value: colorGrayscale.gray100 },
  [THEME.photography]: { name: THEME.photography, value: colorPhoto.dark },
  [THEME.transparent]: {
    name: THEME.transparent,
    value: colorGrayscale.gray600,
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
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

  if (
    ![THEME.normal, THEME.photography, THEME.transparent, THEME.index].includes(
      theme
    )
  ) {
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
