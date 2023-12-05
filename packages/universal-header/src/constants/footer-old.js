const footerKey = {
  aboutUs: 'about-us',
  influenceReport: 'influence-report',
  openLab: 'open-lab',
}

export const FOOTER_KEY = footerKey

export const FOOTER_PATH = {
  [footerKey.aboutUs]: '/about-us',
  [footerKey.influenceReport]: '/a/impact-and-annual-report',
}

export const FOOTER_LABEL = {
  [footerKey.aboutUs]: '關於我們',
  [footerKey.influenceReport]: '影響力報告',
  [footerKey.openLab]: '報導者開放實驗室',
}

export const FOOTER_ORDER = [
  footerKey.aboutUs,
  footerKey.influenceReport,
  footerKey.openLab,
]
