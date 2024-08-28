const merriweather = 'merriweather'
const sourceHanSerifTC = 'source-han-serif-tc'
const serif = 'serif'
const robotoSlab = 'Roboto Slab'
const notoSansTC = 'Noto Sans TC'
const sansSerif = 'sans-serif'
const tauhuOo = 'Tauhu Oo'

const fonts = {
  merriweather,
  sourceHanSerifTC,
  serif,
  robotoSlab,
  notoSansTC,
  sansSerif,
  tauhuOo,
}

const fontWeight = {
  extraLight: '100',
  normal: '400',
  bold: '700',
}

const fontFamily = {
  title: `${merriweather}, ${sourceHanSerifTC}, ${serif}`,
  default: `${robotoSlab}, ${notoSansTC}, ${sansSerif}, ${tauhuOo}`,
  // use defaultFallback before ${notoSansTC} is fully loaded
  defaultFallback: `${robotoSlab}, ${sansSerif}`,
}

export default { fonts, fontWeight, fontFamily }

export { fonts, fontWeight, fontFamily }
