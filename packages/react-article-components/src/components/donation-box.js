import mq from '@twreporter/core/lib/utils/media-query'
import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../constants/typography'

const _content = {
  title: '用行動支持報導者',
  desc:
    '優質深度報導必須投入優秀記者、足夠時間與大量資源⋯⋯我們需要細水長流的小額贊助，才能走更長遠的路。 竭誠歡迎認同《報導者》理念的朋友贊助支持我們！',
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
        <Text>{_content.desc}</Text>
        <Donate>
          <DonationLink utmMedium="article">
            <p>{_content.bt}</p>
          </DonationLink>
        </Donate>
      </Container>
    )
  }
}
