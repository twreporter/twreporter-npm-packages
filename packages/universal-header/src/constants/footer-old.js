import { PUB_AND_MERC_BTN } from '@twreporter/core/src/constants/feature-flag'

const footerKey = {
  foundation: 'foundation',
  aboutUs: 'about-us',
  influenceReport: 'influence-report',
  openLab: 'open-lab',
}

if (PUB_AND_MERC_BTN) {
  footerKey.publicationAndMerchandise = 'publication-and-merchandise'
}

export const FOOTER_KEY = Object.freeze(footerKey)

export const FOOTER_PATH = {
  [footerKey.foundation]: '/categories/foundation',
  [footerKey.aboutUs]: '/about-us',
  [footerKey.influenceReport]: '/a/impact-and-annual-report',
}

const FOOTER_LABEL = {
  [footerKey.foundation]: '基金會消息',
  [footerKey.aboutUs]: '關於我們',
  [footerKey.influenceReport]: '影響力報告',
  [footerKey.openLab]: '報導者開放實驗室',
}

if (PUB_AND_MERC_BTN) {
  FOOTER_LABEL[footerKey.publicationAndMerchandise] = '出版品與周邊'
}

const FOOTER_ORDER = [
  footerKey.foundation,
  footerKey.aboutUs,
  footerKey.influenceReport,
  footerKey.openLab,
]

if (PUB_AND_MERC_BTN) {
  FOOTER_ORDER.push(footerKey.publicationAndMerchandise)
}

export { FOOTER_LABEL, FOOTER_ORDER }
