import React, { PureComponent } from 'react'
import styled from 'styled-components'
import DOMPurify from 'isomorphic-dompurify'
// @twreporter
import externalLinks from '@twreporter/core/lib/constants/external-links'
import mq from '@twreporter/core/lib/utils/media-query'
import { DONATION_LINK_ANCHOR } from '@twreporter/core/lib/constants/donation-link-anchor'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { TEN_YEAR_ANNIVERSARY } from '@twreporter/core/lib/constants/feature-flag'
// constants
import predefinedCss from '../constants/css'
import typography from '../constants/typography'

const content = {
  title: '用行動支持報導者',
  desc: [
    '獨立的精神，是自由思想的條件。獨立的媒體，才能守護公共領域，讓自由的討論和真相浮現。',
    '在艱困的媒體環境，《報導者》堅持以非營利組織的模式投入公共領域的調查與深度報導。我們透過讀者的贊助支持來營運，不仰賴商業廣告置入，在獨立自主的前提下，穿梭在各項重要公共議題中。',
    '你的支持能幫助《報導者》持續追蹤國內外新聞事件的真相，邀請你加入 3 種支持方案，和我們一起推動這場媒體小革命。',
  ],
  bt: '立即支持',
}

const newContent = {
  title: '深度求真 眾聲同行',
  desc: [
    '獨立的精神，是自由思想的條件。獨立的媒體，才能守護公共領域，讓自由的討論和真相浮現。',
    '在艱困的媒體環境，《報導者》堅持以非營利組織的模式投入公共領域的調查與深度報導。我們透過讀者的贊助支持來營運，不仰賴商業廣告置入，在獨立自主的前提下，穿梭在各項重要公共議題中。',
    `今年是<a href="${externalLinks.tenYearAnniversary}" target="_blank" rel="noopener noreferrer">《報導者》成立十週年</a>，請支持我們持續追蹤國內外新聞事件的真相，度過下一個十年的挑戰。`,
  ],
  bt: '贊助支持',
}

const _content = TEN_YEAR_ANNIVERSARY ? newContent : content

const Container = styled.div`
  margin: 60px auto 55px auto;
  padding: 40px 30px 30px 30px;
  width: 502px;
  min-height: 284px;
  background: ${colorGrayscale.white};
  border-left: solid 1px ${(props) => props.theme.colors.secondary.support};
  ${mq.mobileOnly`
    margin: 40px auto;
    width: 100%;
    min-height: 335px;
  `}
`

const Title = styled.p`
  display: inline-block;
  background: ${(props) => props.theme.colors.secondary.background};
  padding-right: 2px;
  box-shadow: 5px 15px 0 ${colorGrayscale.white} inset;
  font-size: 22px;
  font-weight: ${typography.font.weight.bold};
  color: ${colorGrayscale.gray900};
  margin-bottom: 15px;
  ${mq.mobileOnly`
    margin-bottom: 18px;
  `}
`

const Text = styled.p`
  font-size: 16px;
  line-height: 1.75;
  color: ${colorGrayscale.gray900};
  margin-bottom: 0.5em;
  &:last-of-type {
    margin-bottom: 0;
  }
  ${predefinedCss.linkChildren}
`

const Donate = styled.div`
  width: 100%;
  height: 55px;
  margin-top: 50px;
  ${mq.mobileOnly`
    margin-top: 40px;
  `}
  a {
    width: 140px;
    height: 55px;
    background: ${colorGrayscale.black};
    display: table;
    float: right;
    cursor: pointer;
    text-decoration: none;
    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      color: ${colorGrayscale.white};
      font-weight: ${typography.font.weight.normal};
      letter-spacing: 1.3px;
    }
    &:hover {
      background: ${(props) => props.theme.colors.secondary.accent};
    }
  }
`

export default class DonationBox extends PureComponent {
  render() {
    return (
      <Container>
        <Title>{_content.title}</Title>
        {_content.desc.map((p, index) => {
          return (
            <Text
              key={`donation-box-desc-${index + 1}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(p, { ADD_ATTR: ['target'] }),
              }}
            />
          )
        })}
        <Donate>
          <a
            href={`${externalLinks.donation}#${DONATION_LINK_ANCHOR.impact}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{_content.bt}</p>
          </a>
        </Donate>
      </Container>
    )
  }
}
