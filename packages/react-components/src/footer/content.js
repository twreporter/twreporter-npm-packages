import DonationLink from '../donation-link-with-utm'
import Logo from './logo'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import styles from './constants/styles'
// core
import { shortDescription as siteIntro } from '@twreporter/core/lib/constants/site-meta'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import entityPaths from '@twreporter/core/lib/constants/entity-path'
import externalLinks from '@twreporter/core/lib/constants/external-links'
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

function getItemGroups(mainOrigin) {
  return [
    [
      {
        slug: 'about',
        text: '關於我們',
        link: `${mainOrigin}${entityPaths.aboutus}`,
        target: '_blank',
      },
      {
        slug: 'contact',
        text: '聯絡我們',
        link: `${mainOrigin}${entityPaths.article}contact-footer`,
        target: '_blank',
      },
      {
        slug: 'authors',
        text: '作者群',
        link: `${mainOrigin}/authors`,
        target: '_self',
      },
      {
        slug: 'impact-and-annual-report',
        text: '影響力報告',
        link: `${mainOrigin}${entityPaths.article}impact-and-annual-report`,
        target: '_self',
        newFlag: true,
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
        slug: 'license',
        text: '許可協議',
        link: `${mainOrigin}${entityPaths.article}license-footer`,
        target: '_blank',
      },
      {
        slug: 'donate',
        text: '捐款徵信',
        link: `${mainOrigin}${entityPaths.article}credit-donate`,
        target: '_blank',
      },
      {
        slug: 'download-ijm-brochure',
        text: '調查報導手冊',
        link: externalLinks.IJMBrochureDownloadLink,
        target: '_blank',
      },
    ],
    [
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
      {
        slug: 'subcribe',
        text: '訂閱電子報',
        link: externalLinks.newsLetter,
        target: '_blank',
      },
    ],
  ]
}

const Intro = styled.p`
  width: 100%;
  font-size: 12px;
  font-weight: ${fontWeight.medium};
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: #9c9c9c;
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
  ${mq.tabletAndAbove`
    float: right;
    border-left: solid 0.25px #d8d8d8;
  `}
  ${mq.tabletOnly`
    width: 270px;
    padding-left: 31px;
  `}
  ${mq.mobileOnly`
    margin-top: 60px;
    padding-left: 0;
  `}
`

const ItemList = styled.div`
  width: 100%;
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
    font-weight: ${fontWeight.medium};
    letter-spacing: 1.3px;
    color: #9c9c9c;
  }
  span {
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    background: #c7000a;
    color: #ffffff;
    font-size: 9px;
    font-family: Roboto;
    margin-right: 5px;
    padding: 2px 5px;
    vertical-align: middle;
    animation: ${flickerAnimation} 0.7s infinite;
  }
  &:hover {
    p {
      color: #262626;
    }
  }
  ${mq.desktopAndAbove`
    height: calc(${styles.contentRow.height.hd}px / 3);
  `}
  ${mq.mobileOnly`
    p {
      font-size: 18px;
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
    background-color: #ffffff;
    border: solid 0.5px #a67a44;
    display: table;
    &:hover{
      background-color: #a67a44;
    }
    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      color: #a67a44;
      font-size: 14px;
      font-weight: ${fontWeight.medium};
      letter-spacing: 1.3px;
      &:hover{
        color: #ffffff;
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
              <span>New</span>
              <p>{item.text}</p>
            </Item>
          )
        })}
      </ItemGroup>
    )
  })

class Content extends React.PureComponent {
  render() {
    const { mainOrigin } = this.props
    return (
      <ContentRow>
        <IntroColumn>
          <Logo mainOrigin={mainOrigin} />
          <Intro>{siteIntro}</Intro>
        </IntroColumn>
        <LinksColumn>
          <ItemList>{buildList(getItemGroups(mainOrigin))}</ItemList>
        </LinksColumn>
        <DonateButton>
          <DonationLink utmMedium="footer">
            <p>贊助我們</p>
          </DonationLink>
        </DonateButton>
      </ContentRow>
    )
  }
}

Content.propTypes = {
  mainOrigin: PropTypes.string,
}

Content.defaultProps = {
  mainOrigin: '',
}

export default Content
