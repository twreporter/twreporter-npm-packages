import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// core
import mq from '@twreporter/core/lib/utils/media-query'
// constants
import color from './constants/color'
// assets
import Building from './assets/building.svg'
import Dot from './assets/dot.svg'
import Eng404 from './assets/not-found-eng.svg'
import Eng404Mobile from './assets/not-found-eng-mobile.svg'
import Eng500 from './assets/server-error.svg'
import Eng500Mobile from './assets/server-error-mobile.svg'
import Number404 from './assets/num404.svg'
import Number500 from './assets/num500.svg'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  ${mq.mobileOnly`
    margin-top: 25px;
    margin-bottom: 20px;
  `}
  ${mq.tabletOnly`
    padding: 0 55px 0 57px;
    margin-top: 67px;
    margin-bottom: 57px;
  `}
  ${mq.desktopOnly`
    padding: 0 120px 0 122px;
    margin-top: 46px;
    margin-bottom: 77px;
  `}
  ${mq.hdOnly`
    margin-top: 46px;
    margin-bottom: 77px;
  `}
`

const ErrorMessageBlock = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  ${mq.mobileOnly`
    width: 87.5%;
    padding-top: 65px;
    padding-bottom: 20px;
  `}
  ${mq.tabletOnly`
    padding-top: 135px;
    padding-bottom: 185px;
  `}
  ${mq.desktopOnly`
    padding-top: 135px;
    padding-bottom: 185px;
  `}
  ${mq.hdOnly`
    padding-top: 55px;
    padding-bottom: 108px;
    width: 62%;
    min-width: 896px;
  `}
`

const ChineseText = styled.div`
  position: absolute;
  ${mq.mobileOnly`
    top: 0;
    left: 0;
    width: 13px;
    font-size: 13px;
    line-height: 1.62;
    text-align: left;
    color: ${color.black};
    font-weight: 900;
    ::after {
      content: "";
      display: block;
      width: 14px;
      height: 1px;
      background-color: ${color.black};
      position: relative;
      top: 6px;
      left: 7px;
    }
  `}
  ${mq.tabletAndAbove`
    top: 0;
    left: 0;
    width: 18px;
    font-size: 18px;
    line-height: 1.5;
    text-align: left;
    color: ${color.black};
    font-weight: 900;
    ::after {
      content: "";
      display: block;
      width: 20px;
      height: 1px;
      background-color: ${color.black};
      position: relative;
      top: 19px;
      left: 11px;
    }
  `}
`

const BuildingStyled = styled(Building)`
  position: relative;
  width: 100%;
  ${mq.desktopOnly`
    width: 84%;
  `}
  ${mq.hdOnly`
    width: 82%;
  `}
`

const DotStyled = styled(Dot)`
  ${mq.mobileOnly`
    width: 3px;
    position: absolute;
    right: 0;
    top: 29.3%;
  `}
  ${mq.tabletOnly`
    width: 5px;
    position: absolute;
    right: 0;
    top: 158px;
  `}
  ${mq.desktopOnly`
    width: 5px;
    position: absolute;
    right: 0;
    top: 54%;
  `}
  ${mq.hdOnly`
    width: 5px;
    position: absolute;
    right: 0;
    top: 50.1%;
  `}
`

const EngishWrapper = styled.div`
  >svg {
    width: 100%;
  }
  .show-mobile {
    display: none;
  }
  .hide-mobile {
    display: inline;
  }
  ${mq.mobileOnly`
    width: 112px;
    position: absolute;
    bottom: 0;
    left: 0;
    .show-mobile {
      display: inline;
    }
    .hide-mobile {
      display: none;
    }
  `}
  ${mq.tabletOnly`
    width: 171px;
    position: absolute;
    bottom: 31px;
    right: 0;
  `}
  ${mq.desktopAndAbove`
    width: 171px;
    position: absolute;
    bottom: 30px;
    right: 0;
  `}
`

const BackToHomeBtn = styled.a`
  display: block;
  cursor: pointer;
  text-align: center;
  background-color: ${color.black};
  color: ${color.white};
  text-decoration: none;
  &:hover, &:active, &:focus, &:visited {
    color: ${color.white};
    text-decoration: none;
  }
  ${mq.mobileOnly`
    margin: 35px auto;
    width: 87.5%;
    height: 76px;
    line-height: 76px;
    position: relative;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2px;
  `}
  ${mq.tabletAndAbove`
    width: 229px;
    height: 76px;
    line-height: 76px;    
    position: absolute;
    bottom: 0;
    left: 55px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2px;
  `}
  ${mq.desktopOnly`
    left: 120px;
  `}
  ${mq.hdOnly`
    left: 19%;
  `}
`

const NumberImageWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  width: 39.64%;
  ${mq.tabletOnly`
    width: 230px;
  `}
  ${mq.desktopOnly`
    width: 313px;
  `}
  ${mq.hdOnly`
    width: 353px;
  `}
  >svg {
    width: 100%;
  }
`

class ErrorMessage extends React.PureComponent {
  _buildChineseMessageJSX(errorType) {
    switch (errorType) {
      case '404':
        return <ChineseText>找不到網頁</ChineseText>
      case '500':
      default:
        return <ChineseText>網頁錯誤</ChineseText>
    }
  }
  _buildEnglishMessageJSX(errorType) {
    switch (errorType) {
      case '404':
        return (
          <EngishWrapper>
            <Eng404Mobile className="show-mobile" />
            <Eng404 className="hide-mobile" />
          </EngishWrapper>
        )
      case '500':
      default:
        return (
          <EngishWrapper>
            <Eng500Mobile className="show-mobile" />
            <Eng500 className="hide-mobile" />
          </EngishWrapper>
        )
    }
  }
  _buildErrorNumberJSX(errorType) {
    switch (errorType) {
      case '404':
        return (
          <NumberImageWrapper>
            <Number404 />
          </NumberImageWrapper>
        )
      case '500':
      default:
        return (
          <NumberImageWrapper>
            <Number500 />
          </NumberImageWrapper>
        )
    }
  }
  render() {
    const { errorType } = this.props
    return (
      <Container>
        <ErrorMessageBlock>
          <BuildingStyled />
          <DotStyled />
          {this._buildChineseMessageJSX(errorType)}
          {this._buildEnglishMessageJSX(errorType)}
          {this._buildErrorNumberJSX(errorType)}
        </ErrorMessageBlock>
        <BackToHomeBtn href="/">返回首頁</BackToHomeBtn>
      </Container>
    )
  }
}

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOf(['404', '500']),
}

ErrorMessage.defaultProps = {
  errorType: '500',
}

export default ErrorMessage
