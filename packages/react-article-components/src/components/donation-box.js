import DonationLink from '@twreporter/react-components/lib/donation-link'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedCss from '../constants/css'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../constants/typography'

const _content = {
  title: '用行動支持報導者',
  desc: [
    '獨立的精神，是自由思想的條件。獨立的媒體，才能守護公共領域，讓自由的討論和真相浮現。',
    '在艱困的媒體環境，《報導者》秉持深度、開放、非營利的精神，致力於公共領域的調查與深度報導。我們透過讀者的贊助支持來營運，不仰賴商業廣告置入，在獨立自主的前提下，穿梭在各項重要公共議題中。',
    '您的支持將有助於《報導者》持續追蹤國內外新聞事件的真相，促進多元進步的社會對話。請與我們一起前進，共同推動這場媒體小革命。',
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
          <DonationLink>
            <p>{_content.bt}</p>
          </DonationLink>
        </Donate>
      </Container>
    )
  }
}
