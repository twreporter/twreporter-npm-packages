import React from 'react'
import styled from 'styled-components'
// utils
import { finalMedia } from '../utils/style-utils'
// constants
import app from '../constants/app'
import color from '../constants/color'
// assets
import ArrowIcon from '../static/icon-podcast-arrow-white.svg'
// @twreporter
import JuniorLink from '@twreporter/react-components/lib/junior-link'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'

const mockup = {
  defaultWidth: 320,
  contentWidth: 238,
}

const mobileContentWidthPct = (mockup.contentWidth / mockup.defaultWidth) * 100

const Container = styled.div`
  background-image: url(${app.assetsPath}/PodcastBox_Desktop.jpg);
  background-size: contain;
  padding-top: 30px;
  padding-bottom: 30px;
  ${finalMedia.mobile`
    background-image: url(${app.assetsPath}/PodcastBox_Mobile.jpg);
    padding-top: 40px;
    padding-bottom: 60px;
  `}
  ${finalMedia.tablet`
    background-image: url(${app.assetsPath}/PodcastBox_Tablet.jpg);
  `}
  ${finalMedia.overDesktop`
    background-image: url(${app.assetsPath}/PodcastBox_DesktopHD.jpg);
  `}
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 100px;
  color: ${color.black};
  font-family: ${fontFamily.default};
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
  ${finalMedia.overDesktop`
    max-width: 1440px;
    padding: 0 219px;
  `}
  ${finalMedia.tablet`
    position: relative;
    padding: 0 110px;
    p{
      margin-top: 17px;
    }
  `}
  ${finalMedia.mobile`
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

const CTAButton = styled.div`
  a {
    width: 116px;
    height: 40px;
    border-radius: 20px;
    background: ${color.brown};
    border: none;
    color: ${color.white};
    font-size: 16px;
    cursor: pointer;
    display: table;
    ${finalMedia.tablet`
      position: absolute;
      right: 110px;
      top: 9px;
    `}
    ${finalMedia.mobile`
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
  ${finalMedia.desktop`
    max-width: 608px;
  `}
`

const Icon = styled.div`
  display: inline-block;
  margin-left: 8.6px;
  width: 7px;
  height: 12px;
`

class JuniorBoxSection extends React.PureComponent {
  render() {
    return (
      <Container>
        <ContentContainer>
          <TextColumn>
            <h3>看兒童新聞，與孩子對話</h3>
            <p>
              向孩子解釋重要的事件、嚴肅的議題，是民主社會很重要的事，也是《報導者》身為非營利媒體的重要責任，讓我們和你一起尋找對話的契機。
            </p>
          </TextColumn>
          <CTAButton>
            <JuniorLink>
              <span>
                前往閱讀
                <Icon>
                  <ArrowIcon />
                </Icon>
              </span>
            </JuniorLink>
          </CTAButton>
        </ContentContainer>
      </Container>
    )
  }
}

export default JuniorBoxSection
