import React from 'react'
import styled from 'styled-components'
// constants
import color from '../constants/color'
// assets
import ArrowIcon from '../static/icon-donate-arrow-gold.svg'
// @twreporter
import DonationLink from '@twreporter/react-components/lib/donation-link'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'

const mockup = {
  defaultWidth: 320,
  contentWidth: 238,
}

const mobileContentWidthPct = (mockup.contentWidth / mockup.defaultWidth) * 100

const Container = styled.div`
  background-color: ${color.brown};
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
  color: ${color.white};
  h3{
    margin: 0;
    font-size: 32px;
    font-weight: ${fontWeight.bold};
    font-family: ${fontFamily.title};
    line-height: 1.63;
  }
  p{
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
    background: ${color.white};
    border: none;
    color: ${color.brown};
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
    贊助我們
    <Icon>
      <ArrowIcon />
    </Icon>
  </span>
)

class DonationBoxSection extends React.PureComponent {
  render() {
    return (
      <Container>
        <ContentContainer>
          <TextColumn>
            <h3>用行動支持報導者</h3>
            <p>
              深度調查報導必須投入優秀記者、足夠時間與大量資源。歡迎您成為「《報導者》贊助夥伴」，一起為打造更好的社會及媒體環境努力。
            </p>
          </TextColumn>
          <DonateButton>
            <DonationLink>{DonateInfo}</DonationLink>
          </DonateButton>
        </ContentContainer>
      </Container>
    )
  }
}

export default DonationBoxSection
