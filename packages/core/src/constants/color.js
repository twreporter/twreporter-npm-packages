// brand: red
export const colorBrand = Object.freeze({
  faded: '#f4c6c6',
  pastel: '#f76977',
  main: '#f80b28',
  heavy: '#c40d23',
  dark: '#9b051e',
})

// photography: blue
export const colorPhoto = Object.freeze({
  faded: '#abdef4',
  pastel: '#6d9be0',
  main: '#2f58cc',
  heavy: '#143071',
  dark: '#052142',
})

// podcast: green
export const colorPodcast = Object.freeze({
  faded: '#c4f2dc',
  pastel: '#99ecc9',
  main: '#6ee5b5',
  heavy: '#3c927a',
  dark: '#0e3532',
})

// supportive: brown
export const colorSupportive = Object.freeze({
  faded: '#f0d5be',
  pastel: '#e3be98',
  main: '#c09662',
  heavy: '#9f7544',
  dark: '#7a522c',
})

// neutral: grayscale
export const colorGrayscale = Object.freeze({
  white: '#ffffff',
  gray100: '#f1f1f1',
  gray200: '#e2e2e2',
  gray300: '#cdcdcd',
  gray400: '#bbbbbb',
  gray500: '#9c9c9c',
  gray600: '#808080',
  gray700: '#666666',
  gray800: '#404040',
  gray900: '#262626',
  black: '#000000',
})

export const colorOpacity = Object.freeze({
  'white_0.2': 'rgba(255, 255, 255, 0.2)',
  'white_0.5': 'rgba(255, 255, 255, 0.5)',
  'white_0.8': 'rgba(255, 255, 255, 0.8)',
  'white_0.9': 'rgba(255, 255, 255, 0.9)',
  'gray100_0.8': 'rgba(241, 241, 241, 0.8)',
  'black_0.1': 'rgba(0, 0, 0, 0.1)',
  'black_0.2': 'rgba(0, 0, 0, 0.2)',
  'black_0.5': 'rgba(0, 0, 0, 0.5)',
  'black_0.8': 'rgba(0, 0, 0, 0.8)',
  'black_0.05': 'rgba(0, 0, 0, 0.05)',
})

export const COLOR_SEMANTIC = Object.freeze({
  danger: '#c7000a',
  success: '#4db41d',
  info: '#1a7aeb',
  warning: '#fcaa0c',
})

// color set used in articles with pink layout
export const COLOR_PINK_ARTICLE = Object.freeze({
  lightBlue: '#2440fb',
  blue: '#355ed3',
  darkBlue: '#08192d',
  lightPink: '#fadaf5',
  pink: '#fbafef',
  darkPink: '#ef7ede',
})

export default {
  colorBrand,
  colorPhoto,
  colorPodcast,
  colorSupportive,
  colorGrayscale,
  colorOpacity,
  COLOR_SEMANTIC,
  COLOR_PINK_ARTICLE,
}
