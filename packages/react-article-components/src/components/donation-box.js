import DonationLink from '@twreporter/react-components/lib/donation-link'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedCss from '../constants/css'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../constants/typography'
import color from '../constants/color'

const _content = {
  title: '用行動支持報導者',
  desc: [
    '獨立的精神，是自由思想的條件。獨立的媒體，才能守護公共領域，讓自由的討論和真相浮現。',
    '在艱困的媒體環境，《報導者》堅持以非營利組織的模式投入公共領域的調查與深度報導。我們透過讀者的贊助支持來營運，不仰賴商業廣告置入，在獨立自主的前提下，穿梭在各項重要公共議題中。',
    '你的支持能幫助《報導者》持續追蹤國內外新聞事件的真相，邀請你加入 3 種支持方案，和我們一起推動這場媒體小革命。',
  ],
  bt: '立即支持',
}

const Container = styled.div`
  margin: 60px auto 55px auto;
  padding: 40px 30px 30px 30px;
  width: 502px;
  min-height: 284px;
  background: ${color.white};
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
  box-shadow: 5px 15px 0 ${color.white} inset;
  font-size: 22px;
  font-weight: ${typography.font.weight.bold};
  color: ${color.gray95};
  margin-bottom: 15px;
  ${mq.mobileOnly`
    margin-bottom: 18px;
  `}
`

const Text = styled.p`
  font-size: 16px;
  line-height: 1.75;
  color: ${color.gray95};
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
    background: ${color.black};
    display: table;
    float: right;
    cursor: pointer;
    text-decoration: none;
    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      color: ${color.white};
      font-weight: ${typography.font.weight.normal};
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
