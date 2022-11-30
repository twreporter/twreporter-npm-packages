import React from 'react'
import styled from 'styled-components'
import EmailIcon from '../static/subscribe-icon.svg'
import color from '../constants/color'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import delay from 'lodash/delay'
const _ = {
  delay,
}

const mailChimpURL =
  '//twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32'

const mockup = {
  defaultWidth: 320,
  contentWidth: 288,
  inputWidth: 274,
}
const mobileContentWidthPct = (mockup.contentWidth / mockup.defaultWidth) * 100
const mobileInputWidthPct = (mockup.inputWidth / mockup.contentWidth) * 100

const Container = styled.div`
  background-color: ${color.lightGray};
  padding-top: 70px;
  padding-bottom: 70px;
  ${mq.mobileOnly`
    padding-top: 30px;
    padding-bottom: 60px;
  `}
`

const ContentContainer = styled.div`
  max-width: 610px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;

  ${mq.mobileOnly`
    max-width: ${mobileContentWidthPct}%;
    display: block;
  `}
`

const Icon = styled.div`
  > svg {
    width: 60px;
    height: 40px;
  }

  margin-right: 20px;

  ${mq.mobileOnly`
    width: 46px;
    height: 30px;
    margin: 0 auto;
    > svg {
      width: 46px;
      height: 30px;
    }
  `}
`

const SignupForm = styled.div`
  width: 100%;
  background-color: ${color.white};
  height: 40px;

  input {
    border: 0;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq.mobileOnly`
    margin-top: 20px;
  `}
`

const EmailInput = styled.input`
  display: block;
  flex-basis: 100%;
  width: 100%;
  padding-left: 16px;
  font-size: 16px;
  outline: none;
  box-shadow: none;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }

  ${mq.mobileOnly`
    font-size: 14px;
    display: inline;
    padding-left: 34px;
    text-align: center;
    width: ${mobileInputWidthPct}%
  `}
`

const SubscribeInput = styled.input`
  display: block;
  background-color: ${color.white};
  padding-right: 10px;
  color: ${color.red};
  font-size: 16px;
  outline: none;
  box-shadow: none;

  ${mq.mobileOnly`
    font-size: 12px;
  `}
`

const Form = styled.form`
  width: 100%;
`

class NewsLetterSection extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.state = {
      emailValue: '',
    }
  }

  _handleSubmit() {
    // Workaround here
    // In order to get the right input value for form,
    // we delay setState function for 500 milliseconds
    _.delay(this.setState.bind(this), 500, { emailValue: '' })
  }

  _handleChange(e) {
    this.setState({
      emailValue: e.target.value,
    })
  }

  render() {
    return (
      <Container>
        <ContentContainer>
          <Icon>
            <EmailIcon />
          </Icon>
          <Form
            action={mailChimpURL}
            method="post"
            name="subscribe-form"
            target="_blank"
            rel="noopener noreferrer"
            onSubmit={this.handleSubmit}
            novalidate
          >
            <SignupForm>
              <EmailInput
                value={this.state.emailValue}
                type="email"
                name="EMAIL"
                placeholder="請輸入您的電子郵件位址"
                required
                onChange={this.handleChange}
              />
              <SubscribeInput type="submit" value="訂閱" name="subscribe" />
            </SignupForm>
          </Form>
        </ContentContainer>
      </Container>
    )
  }
}

export default NewsLetterSection
