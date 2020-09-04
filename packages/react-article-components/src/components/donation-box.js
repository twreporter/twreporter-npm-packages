import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedCss from '../constants/css'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../constants/typography'

const _content = {
  title: '用行動支持報導者',
  desc: [
    '2020年，世界更加不安。當全球因為疫情而陷入閉鎖與恐慌之際，港版《國安法》讓香港淪為一國一制、菲律賓政府抓記者關電視台、白俄羅斯政府操縱媒體和大選、台灣更面臨中國因素的威脅與滲透⋯⋯。當民主自由遭遇重大挑戰，我們更需要不受任何力量左右的獨立媒體，全心全意深入報導真相、努力守望台灣。',
    '5年前的9月1日，《報導者》成為台灣第一家由公益基金會成立的非營利媒體。我們期許自己扮演深度調查報導的火車頭，在讀者捐款支持下獨立自主，5年來穿越各項重要公共議題，獲得國內外諸多新聞獎項肯定，在各層面努力發揮影響力。然而，受到疫情嚴重衝擊，《報導者》的捐款也受到影響，我們需要更多的動能，才能持續在這條路上前進。',
    '請在《報導者》5週年之際成為我們的贊助者，與我們一起前進，成為迎向下個5年的重要後盾。',
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
