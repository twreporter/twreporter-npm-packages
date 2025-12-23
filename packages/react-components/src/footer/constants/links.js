import entityPaths from '@twreporter/core/lib/constants/entity-path'

const gtmId = {
  support: 'footer-support',
  newsletter: 'footer-newsletter',
}
/*
  display for links group
  | first column | second column | third column |
  | XXXX         | XXXX          | XXX          |
  | XXXXX        | XXXXXX        | XX           |
*/
export const getLinksGroups = (mainOrigin) => {
  return [
    // first column
    [
      {
        slug: 'about',
        text: '關於我們',
        to: `${mainOrigin}${entityPaths.aboutus}`,
        target: '_blank',
      },
      {
        slug: 'authors',
        text: '作者群',
        to: `${mainOrigin}/authors`,
        target: '_blank',
      },
      {
        slug: 'contact',
        text: '聯絡我們',
        to: `${mainOrigin}${entityPaths.article}contact-footer`,
        target: '_blank',
      },
      {
        slug: 'about',
        text: '加入我們',
        to: `${mainOrigin}${entityPaths.article}hiring-job-description`,
        target: '_blank',
      },
      {
        slug: 'license',
        text: '常見問題',
        to: `${mainOrigin}${entityPaths.article}about-us-questions`,
        target: '_blank',
      },
    ],
    // second column
    [
      {
        slug: 'donate',
        text: '捐款徵信',
        to: `${mainOrigin}${entityPaths.article}credit-donate`,
        target: '_blank',
      },
      {
        slug: 'media-center',
        text: '基金會消息',
        to: `${mainOrigin}${entityPaths.categories}foundation`,
        target: '_blank',
      },
      {
        slug: 'impact-and-annual-report',
        text: '影響力報告',
        to: `${mainOrigin}${entityPaths.article}impact-and-annual-report`,
        target: '_blank',
      },
      {
        slug: 'publication-and-merchandise',
        text: '出版品與周邊',
        to: 'https://twreporter.waca.ec/',
        target: '_blank',
      },
      {
        slug: 'charity-cooperation',
        text: '公益合作',
        to: 'https://www.twreporter.org/a/cooperation',
        target: '_blank',
      },
    ],
    // third column
    [
      {
        slug: 'subcribe-email',
        text: '訂閱電子報',
        to: `${mainOrigin}${entityPaths.account}/email-subscription`,
        target: '_blank',
        id: gtmId.newsletter,
      },
      {
        slug: 'subcribe-podcast',
        text: '訂閱 Podcast',
        to: 'https://solink.soundon.fm/twreporter-U7Q',
        target: '_blank',
      },
      {
        slug: 'subcribe-RSS',
        text: '訂閱 RSS',
        to: 'https://public.twreporter.org/rss/twreporter-rss.xml',
        target: '_blank',
      },
      {
        slug: 'install-web-app',
        text: '安裝Web App',
        to: 'https://www.twreporter.org/a/how-to-follow-the-reporter#方法3：安裝Web App',
        target: '_blank',
      },
      {
        slug: 'subcribe-telegram',
        text: '訂閱Telegram',
        to: 'https://t.me/tw_reporter_org',
        target: '_blank',
      },
    ],
  ]
}

export const getSocialMediaLinks = () => {
  return [
    {
      slug: 'facebook',
      icon: 'facebook',
      to: 'https://www.facebook.com/twreporter/',
      target: '_blank',
      ariaLabel: '前往《報導者》Facebook',
    },
    {
      slug: 'instagram',
      icon: 'instagram',
      to: 'https://www.instagram.com/twreporter/',
      target: '_blank',
      ariaLabel: '前往《報導者》Instagram',
    },
    {
      slug: 'youtube',
      icon: 'youtube',
      to: 'https://www.youtube.com/@TwreporterOrg',
      target: '_blank',
      ariaLabel: '前往《報導者》YouTube',
    },
    {
      slug: 'x',
      icon: 'twitter',
      to: 'https://twitter.com/tw_reporter_org',
      target: '_blank',
      ariaLabel: '前往《報導者》X',
    },
    {
      slug: 'medium',
      icon: 'medium',
      to: 'https://medium.com/twreporter',
      target: '_blank',
      ariaLabel: '前往《報導者》Medium',
    },
    {
      slug: 'threads',
      icon: 'threads',
      to: 'https://www.threads.com/@twreporter',
      target: '_blank',
      ariaLabel: '前往《報導者》Threads',
    },
  ]
}
