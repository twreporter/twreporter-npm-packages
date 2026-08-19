import React from 'react'
import styled from 'styled-components'
// assets
import ArrowIcon from '../static/icon-podcast-arrow-white.svg'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import externalLinks from '@twreporter/core/lib/constants/external-links'

const mockup = {
  defaultWidth: 320,
  contentWidth: 238,
}

const mobileContentWidthPct = (mockup.contentWidth / mockup.defaultWidth) * 100

const Container = styled.div`
  background-color: '#9E7A4E';
  padding-top: 30px;
  padding-bottom: 30px;
  ${mq.mobileOnly`
    padding-top: 40px;
    padding-bottom: 60px;
  `}
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 100px;
  color: ${colorGrayscale.white};
  h3 {
    margin: 0;
    font-size: 32px;
    font-weight: ${fontWeight.bold};
    font-family: ${fontFamily.title};
    line-height: 1.63;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.57;
    text-align: left;
  }
  ${mq.hdOnly`
    max-width: 1440px;
    padding: 0 219px;
  `}
  ${mq.tabletOnly`
    position: relative;
    padding: 0 110px;
    p{
      margin-top: 17px;
    }
  `}
  ${mq.mobileOnly`
    max-width: ${mobileContentWidthPct}%;
    display: block;
    text-align: center;
    padding: 0;
    h3{
      font-size: 24px;
      line-height: 2.17;
    }
    p{
      margin-top: 0;
    }
  `}
`

const DonateButton = styled.div`
  a {
    width: 116px;
    height: 40px;
    border-radius: 20px;
    background: '#9E7A4E';
    border: none;
    color: ${colorGrayscale.white};
    font-size: 16px;
    cursor: pointer;
    display: table;
    ${mq.tabletOnly`
      position: absolute;
      right: 110px;
      top: 9px;
    `}
    ${mq.mobileOnly`
      margin: 40px auto 0 auto;
    `}
    span {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      font-weight: ${fontWeight.bold};
    }
  }
`

const TextColumn = styled.div`
  ${mq.desktopOnly`
    max-width: 608px;
  `}
`

const Icon = styled.div`
  display: inline-block;
  margin-left: 8.6px;
  width: 7px;
  height: 12px;
`

const DonateInfo = (
  <span>
    贊助支持
    <Icon>
      <ArrowIcon />
    </Icon>
  </span>
)

const DonationBoxSection = () => {
  return (
    <Container>
      <ContentContainer>
        <TextColumn>
          <h3>用行動支持報導者</h3>
          <p>
            深度調查報導必須投入優秀記者、足夠時間與大量資源。歡迎您加入《報導者》支持方案，一起為打造更好的社會及媒體環境努力。
          </p>
        </TextColumn>
        <DonateButton>
          <a
            href={externalLinks.tenYearAnniversary}
            target="_blank"
            rel="noopener noreferrer"
          >
            {DonateInfo}
          </a>
        </DonateButton>
      </ContentContainer>
    </Container>
  )
}

export default DonationBoxSection
