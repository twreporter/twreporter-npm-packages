import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedCss from '../constants/css'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../constants/typography'

const _content = {
  title: '用行動支持報導者',
  desc: [
    '每個人都應有獲得專業、正確新聞訊息的權利，因此，免費公開每篇報導給閱聽大眾，是《報導者》身為非營利媒體回應公共性不變的追求。面對全球陷入COVID-19疫情風暴的此時，《報導者》第一時間推出疫情即時脈動網頁，提供讀者掌握疫情變化，進行第一線醫療從業者與疫苗和防疫機構的深度採訪，一探台灣本地抗疫行動；我們也同步深入報導中國、歐洲、美國等國際疫情現場並提供分析視角。這場長期的戰役，《報導者》會持續提供華文讀者第一手深入的報導，但這些報導需要投入大量人力，包括各地的前線記者與攝影、後勤的工程、設計與編輯團隊，倘若沒有讀者的捐款贊助，我們不可能完成。',
    '您的每一筆捐款都將成為我們繼續採訪與調查的動力，《報導者》邀請您以捐款支持我們，繼續為開放、獨立的新聞而努力。',
  ],
  bt: '贊助我們',
}

const Container = styled.div`
  margin: 60px auto 55px auto;
  padding: 40px 30px 30px 30px;
  width: 502px;
  min-height: 284px;
  background: #fff;
  border-left: solid 1px ${props => props.theme.colors.secondary.support};
  ${mq.mobileOnly`
    margin: 40px auto;
    width: 100%;
    min-height: 335px;
  `}
`

const Title = styled.p`
  display: inline-block;
  background: ${props => props.theme.colors.secondary.background};
  padding-right: 2px;
  box-shadow: 5px 15px 0 #fff inset;
  font-size: 22px;
  font-weight: ${typography.font.weight.bold};
  color: #262626;
  margin-bottom: 15px;
  ${mq.mobileOnly`
    margin-bottom: 18px;
  `}
`

const Text = styled.p`
  font-size: 16px;
  line-height: 1.75;
  color: #262626;
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
    background: #000;
    display: table;
    float: right;
    cursor: pointer;
    text-decoration: none;
    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      letter-spacing: 1.3px;
    }
    &:hover {
      background: ${props => props.theme.colors.secondary.accent};
    }
  }
`

export default class DonationBox extends PureComponent {
  render() {
    return (
      <Container>
        <Title>{_content.title}</Title>
        {_content.desc.map((p, index) => {
          return <Text key={`donation-box-desc-${index + 1}`}>{p}</Text>
        })}
        <Donate>
          <DonationLink utmMedium="article">
            <p>{_content.bt}</p>
          </DonationLink>
        </Donate>
      </Container>
    )
  }
}
