const merriweather = 'merriweather'
const sourceHanSerifTC = 'source-han-serif-tc'
const serif = 'serif'
const rosario = 'rosario'
const notoSansTC = 'Noto Sans TC'
const sansSerif = 'sans-serif'

const fonts = {
  merriweather,
  sourceHanSerifTC,
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
  title: `${merriweather}, ${sourceHanSerifTC}, ${serif}`,
  default: `${rosario}, ${notoSansTC}, ${sansSerif}`,
  // use defaultFallback before ${notoSansTC} is fully loaded
  defaultFallback: `${rosario}, ${sansSerif}`,
}

export default { fonts, fontWeight, fontFamily }

export { fonts, fontWeight, fontFamily }
