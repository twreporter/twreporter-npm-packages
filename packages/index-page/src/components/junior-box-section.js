import React from 'react'
import styled from 'styled-components'
// constants
import app from '../constants/app'
// assets
import ArrowIcon from '../static/icon-podcast-arrow-white.svg'
// @twreporter
import JuniorLink from '@twreporter/react-components/lib/junior-link'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'

const mockup = {
  defaultWidth: 320,
  contentWidth: 238,
}

const mobileContentWidthPct = (mockup.contentWidth / mockup.defaultWidth) * 100

const Container = styled.div`
  background-image: ${props =>
    `url(${app.assetsPath}/${props.$releaseBranch}/KidsReporter_Desktop.jpg)`};
  background-size: contain;
  padding-top: 30px;
  padding-bottom: 30px;
  ${mq.mobileOnly`
    background-image: ${props =>
      `url(${app.assetsPath}/${props.$releaseBranch}/KidsReporter_Mobile.jpg)`};
    padding-top: 40px;
    padding-bottom: 60px;
  `}
  ${mq.tabletOnly`
    background-image: ${props =>
      `url(${app.assetsPath}/${props.$releaseBranch}/KidsReporter_Tablet.jpg)`};
  `}
  ${mq.hdOnly`
    background-image: ${props =>
      `url(${app.assetsPath}/${props.$releaseBranch}/KidsReporter_DesktopHD.jpg)`};
  `}
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 100px;
  color: ${colorGrayscale.black};
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

const CTAButton = styled.div`
  a {
    width: 116px;
    height: 40px;
    border-radius: 20px;
    background: ${colorSupportive.heavy};
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

const JuniorBoxSection = ({ releaseBranch = BRANCH.master }) => {
  return (
    <Container $releaseBranch={releaseBranch}>
      <ContentContainer>
        <TextColumn>
          <h3>看兒少新聞，與孩子對話</h3>
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

JuniorBoxSection.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export default JuniorBoxSection
