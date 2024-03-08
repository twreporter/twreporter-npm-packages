import React from 'react'
import styled, { keyframes } from 'styled-components'
// components
import DonationLink from '../donation-link'
import Logo from './logo'
// constants
import styles from './constants/styles'
// @twreporter
import { shortDescription as siteIntro } from '@twreporter/core/lib/constants/site-meta'
import entityPaths from '@twreporter/core/lib/constants/entity-path'
import mq from '@twreporter/core/lib/utils/media-query'
import origins from '@twreporter/core/lib/constants/request-origins'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import {
  colorGrayscale,
  colorBrand,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'
// feature toggle
import { FOUNDATION_CATEGORY_SET } from '@twreporter/core/lib/constants/feature-flag'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

function getItemGroups(mainOrigin) {
  const foundationUrl = FOUNDATION_CATEGORY_SET
    ? `${mainOrigin}${entityPaths.categories}foundation`
    : `${mainOrigin}${entityPaths.topics}media-center`
  return [
    [
      {
        slug: 'about',
        text: '關於我們',
        link: `${mainOrigin}${entityPaths.aboutus}`,
        target: '_blank',
      },
      {
        slug: 'authors',
        text: '作者群',
        link: `${mainOrigin}/authors`,
        target: '_self',
      },
      {
        slug: 'contact',
        text: '聯絡我們',
        link: `${mainOrigin}${entityPaths.article}contact-footer`,
        target: '_blank',
      },
      {
        slug: 'about',
        text: '加入我們',
        link: `${mainOrigin}${entityPaths.article}hiring-job-description`,
        target: '_blank',
      },
      {
        slug: 'license',
        text: '常見問題',
        link: `${mainOrigin}${entityPaths.article}about-us-questions`,
        target: '_blank',
      },
    ],
    [
      {
        slug: 'privacy',
        text: '隱私政策',
        link: `${mainOrigin}${entityPaths.article}privacy-footer`,
        target: '_blank',
      },
      {
        slug: 'donate',
        text: '捐款徵信',
        link: `${mainOrigin}${entityPaths.article}credit-donate`,
        target: '_blank',
      },
      {
        slug: 'license',
        text: '許可協議',
        link: `${mainOrigin}${entityPaths.article}license-footer`,
        target: '_blank',
      },
      {
        slug: 'media-center',
        text: '基金會消息',
        link: foundationUrl,
        target: '_blank',
      },
      {
        slug: 'impact-and-annual-report',
        text: '影響力報告',
        link: `${mainOrigin}${entityPaths.article}impact-and-annual-report`,
        target: '_self',
      },
    ],
    [
      {
        slug: 'subcribe',
        text: '訂閱電子報',
        link: `${mainOrigin}${entityPaths.account}/email-subscription`,
        target: '_self',
      },
      {
        slug: 'podcast-list',
        text: 'Podcast節目列表',
        link: `${mainOrigin}${entityPaths.article}podcast-list`,
        target: '_blank',
      },
      {
        slug: 'twreporter-lab',
        text: '報導者開放實驗室',
        link: 'https://medium.com/twreporter',
        target: '_blank',
      },
      {
        slug: 'branding-design',
        text: '品牌設計規範',
        link: 'https://twreporter.gitbook.io/the-reporter-brand-guidelines',
        target: '_blank',
      },
      {
        slug: 'publication-and-merchandise',
        text: '出版品與周邊',
        link: 'https://twreporter.backme.tw/shops/3589?locale=zh-TW',
        target: '_blank',
      },
    ],
  ]
}

const Intro = styled.p`
  width: 100%;
  font-size: 12px;
  font-weight: ${fontWeight.normal};
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${colorGrayscale.gray500};
  ${mq.mobileOnly`
    font-size: 16px;
    line-height: 1.63;
    letter-spacing: 0.6px;
  `}
`

const ContentRow = styled.div`
  ${mq.hdOnly`
    width: ${styles.contentRow.width.hd}px;
    height: ${styles.contentRow.height.hd}px;
  `}
  ${mq.desktopOnly`
    width: ${styles.contentRow.width.desktop}px;
    height: ${styles.contentRow.height.desktop}px;
  `}
  ${mq.tabletOnly`
    width: ${styles.contentRow.width.tablet}px;
  `}
`

const Column = styled.div`
  display: inline-block;
  ${mq.mobileOnly`
    max-width: 100%;
  `}
`

const IntroColumn = styled(Column)`
  ${mq.desktopAndAbove`
    padding-right: 60px;
  `}
  ${mq.hdOnly`
    width: 510px;
  `}
  ${mq.desktopOnly`
    width: 290px;
  `}
  ${mq.tabletOnly`
    width: 260px;
  `}
`

const LinksColumn = styled(Column)`
  padding-left: 40px;
  ${mq.hdOnly`
    width: 397px;
  `}
  ${mq.desktopOnly`
    width: 392px;
  `}
  ${mq.desktopAndAbove`
    padding-left: 80px;
  `}
  ${mq.tabletAndAbove`
    float: right;
    border-left: solid 0.25px ${colorGrayscale.gray300};
    margin-bottom: 50px;
  `}
  ${mq.tabletOnly`
    width: 270px;
    padding-left: 31px;
  `}
  ${mq.mobileOnly`
    margin-top: 48px;
    padding-left: 0;
  `}
`

const ItemList = styled.div`
  width: 100%;
  ${mq.hdOnly`
    width: 397px;
  `}
  ${mq.desktopOnly`
    width: 380px;
  `}
`

const ItemGroup = styled.div`
  display: inline-block;
  width: calc(100% / 3);
  white-space: nowrap;
  ${mq.desktopAndAbove`
    float: left;
  `}
  ${mq.tabletAndBelow`
    width: calc(100% / 2);
    &:last-child{
      margin-top: 35px;
    }
  `}
`

const flickerAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .6;
  }
`

const Item = styled.a`
  text-decoration: none !important;
  display: block;
  width: 100%;
  p {
    display: inline;
    font-size: 14px;
    font-family: ${fontFamily.default};
    font-weight: ${fontWeight.normal};
    letter-spacing: 1.3px;
    color: ${colorGrayscale.gray500};
  }
  span {
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    background: ${colorBrand.heavy};
    color: ${colorGrayscale.white};
    font-size: 9px;
    font-family: ${fontFamily.default};
    margin-left: 5px;
    padding: 2px 5px;
    vertical-align: middle;
    animation: ${flickerAnimation} 0.7s infinite;
  }
  &:hover {
    p {
      color: ${colorGrayscale.gray900};
    }
  }
  ${mq.desktopAndAbove`
    height: calc(${styles.contentRow.height.hd}px / 3);
  `}
  ${mq.mobileOnly`
    p {
      font-size: 14px;
      letter-spacing: 1.6px;
      line-height: 2;
    }
  `}
`

const DonateButton = styled.div`
  a {
    text-decoration: none !important;
    width: 140px;
    height: 55px;
    background-color: ${colorGrayscale.white};
    border: solid 0.5px ${colorSupportive.heavy};
    display: table;
    &:hover{
      background-color: ${colorSupportive.heavy};
    }
    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      color: ${colorSupportive.heavy};
      font-size: 14px;
      font-weight: ${fontWeight.normal};
      letter-spacing: 1.3px;
      &:hover{
        color: ${colorGrayscale.white};
      }
    }
    ${mq.tabletAndAbove`
      position: absolute;
      right: 0;
      top: 0;
    `}
    ${mq.desktopAndAbove`
      margin-top: ${styles.footerContentPadding.desktop[0]}px;
      margin-right: ${styles.footerContentPadding.desktop[1]}px;
    `}
    ${mq.tabletOnly`
      margin-top: ${styles.footerContentPadding.tablet[0]}px;
      margin-right: ${styles.footerContentPadding.tablet[1]}px;
    `}
    ${mq.mobileOnly`
      width: 100%;
      margin: 60px auto 40px auto;
    `}
  }
`

const buildList = itemGroups =>
  _.map(itemGroups, (items, indexofGroup) => {
    return (
      <ItemGroup key={indexofGroup}>
        {_.map(items, (item, indexofItem) => {
          return (
            <Item
              key={`item-${indexofGroup}-${indexofItem}`}
              visible={item.newFlag}
              href={item.link}
              target={item.target}
            >
              <p>{item.text}</p>
              <span>New</span>
            </Item>
          )
        })}
      </ItemGroup>
    )
  })

const Content = ({ releaseBranch }) => {
  const mainOrigin = origins.forClientSideRendering[releaseBranch].main
  return (
    <ContentRow>
      <IntroColumn>
        <Logo mainOrigin={mainOrigin} releaseBranch={releaseBranch} />
        <Intro>{siteIntro}</Intro>
      </IntroColumn>
      <LinksColumn>
        <ItemList>{buildList(getItemGroups(mainOrigin))}</ItemList>
      </LinksColumn>
      <DonateButton>
        <DonationLink>
          <p>贊助我們</p>
        </DonationLink>
      </DonateButton>
    </ContentRow>
  )
}

Content.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

Content.defaultProps = {
  releaseBranch: releaseBranchConsts.release,
}

export default Content
