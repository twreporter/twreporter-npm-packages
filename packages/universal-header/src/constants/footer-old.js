const footerKey = {
  foundation: 'foundation',
  aboutUs: 'about-us',
  influenceReport: 'influence-report',
  openLab: 'open-lab',
  publicationAndMerchandise: 'publication-and-merchandise',
}

export const FOOTER_KEY = Object.freeze(footerKey)

export const FOOTER_PATH = {
  [footerKey.foundation]: '/categories/foundation',
  [footerKey.aboutUs]: '/about-us',
  [footerKey.influenceReport]: '/a/impact-and-annual-report',
}

export const FOOTER_LABEL = {
  [footerKey.foundation]: '基金會消息',
  [footerKey.aboutUs]: '關於我們',
  [footerKey.influenceReport]: '影響力報告',
  [footerKey.openLab]: '報導者開放實驗室',
  [footerKey.publicationAndMerchandise]: '出版品與周邊',
}

export const FOOTER_ORDER = [
  footerKey.foundation,
  footerKey.aboutUs,
  footerKey.influenceReport,
  footerKey.openLab,
  footerKey.publicationAndMerchandise,
]
