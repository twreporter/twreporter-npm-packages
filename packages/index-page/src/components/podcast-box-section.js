import { finalMedia } from '../utils/style-utils'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import ArrowIcon from '../static/icon-podcast-arrow-white.svg'
import PodcastLandingPageLinkWithUtm from '@twreporter/react-components/lib/podcast-link-with-utm'
import React from 'react'
import app from '../constants/app'
import styled from 'styled-components'

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
  color: #000;
  /* ff-tisa-web-prop is for english text */
  font-family: ff-tisa-web-pro, source-han-sans-traditional, sans-serif;
  h3{
    margin: 0;
    font-size: 32px;
    font-weight: ${fontWeight.bold};
    line-height: 1.63;
  }
  p{
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

const ListenButton = styled.div`
  a {
    width: 116px;
    height: 40px;
    border-radius: 20px;
    background: #a67a44;
    border: none;
    color: #ffffff;
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

const listenNow = (
  <span>
    立即收聽
    <Icon>
      <ArrowIcon />
    </Icon>
  </span>
)

class PodcastBoxSection extends React.PureComponent {
  render() {
    return (
      <Container>
        <ContentContainer>
          <TextColumn>
            <h3>聽Podcast，感受真實</h3>
            <p>
              報導者Podcast節目，透過記者、事件當事人的第一手告白，和來自現場的收音紀錄，帶你走進新聞幕後、故事現場，感受更完整的真實。
            </p>
          </TextColumn>
          <ListenButton>
            <PodcastLandingPageLinkWithUtm utmMedium="index">
              {listenNow}
            </PodcastLandingPageLinkWithUtm>
          </ListenButton>
        </ContentContainer>
      </Container>
    )
  }
}

export default PodcastBoxSection
