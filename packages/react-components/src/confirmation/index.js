import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// assets
import WarningSign from './assets/delete-warning-sign.svg'
// @twreporter
import { fontWeight } from '@twreporter/core/lib/constants/font'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: ${colorGrayscale.gray600};
`

const Dialog = styled.div`
  width: ${(props) => props.$width};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 75px 60px 58px 60px;
  background-color: ${colorGrayscale.white};
  text-align: center;
  ${mq.mobileOnly`
    width: 100%;
    padding: 47px 17px 37px 17px;
  `}
`

const Content = styled.div`
  width: 100%;
  margin-bottom: 52px;
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  ${mq.mobileOnly`
    font-size: 16px;
  `}
`

const FuncitonArea = styled.div``

const FunctionButton = styled.button`
  cursor: pointer;
  font-weight: ${fontWeight.bold};
  font-size: 18px;
  width: 127px;
  height: 46.7px;
  border-radius: 40px;
  background-color: transparent;
  outline: 0;
  ${mq.mobileOnly`
    font-size: 16px;
  `}
  letter-spacing: 1.6px;
`

const Cancel = styled(FunctionButton)`
  border: solid 2px ${colorGrayscale.gray900};
  margin-right: 25px;
`

const Confirm = styled(FunctionButton)`
  border: solid 2px currentcolor;
  color: ${colorBrand.heavy};
`

const IconContainer = styled.div`
  display: inline-block;
  position: relative;
  top: 8px;
  margin-right: 10px;
`

const TextContainer = styled.span`
  letter-spacing: 2.6px;
`

const Confirmation = (props) => {
  const {
    width,
    content,
    cancel,
    confirm,
    onConfirm,
    onCancel,
    toShowWarningIcon,
  } = props
  const iconJSX = toShowWarningIcon ? (
    <IconContainer>
      <WarningSign />
    </IconContainer>
  ) : null
  return (
    <Container>
      <Dialog $width={width}>
        <Content>
          {iconJSX}
          <TextContainer>{content}</TextContainer>
        </Content>
        <FuncitonArea>
          <Cancel onClick={onCancel}>{cancel}</Cancel>
          <Confirm onClick={onConfirm}>{confirm}</Confirm>
        </FuncitonArea>
      </Dialog>
    </Container>
  )
}

Confirmation.defaultProps = {
  content: '',
  cancel: 'Cancel',
  confirm: 'Confirm',
  width: '490px',
  toShowWarningIcon: true,
}

Confirmation.propTypes = {
  width: PropTypes.string,
  content: PropTypes.string,
  cancel: PropTypes.string,
  confirm: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  toShowWarningIcon: PropTypes.bool,
}
export default Confirmation
