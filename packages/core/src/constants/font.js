const merriweather = 'merriweather'
const notoSerifTC = 'Noto Serif TC'
const serif = 'serif'
const rosario = 'rosario'
const notoSansTC = 'Noto Sans TC'
const sansSerif = 'sans-serif'

const fonts = {
  merriweather,
  notoSerifTC,
  serif,
  rosario,
  notoSansTC,
  sansSerif,
}

const fontWeight = {
  extraLight: '100',
  normal: '400',
  bold: '700',
}

const fontFamily = {
  title: `${merriweather}, ${notoSerifTC}, ${serif}`,
  default: `${rosario}, ${notoSansTC}, ${sansSerif}`,
}

export default { fonts, fontWeight, fontFamily }

export { fonts, fontWeight, fontFamily }
