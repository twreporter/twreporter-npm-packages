import * as Time from './time'
import AudioProvider from './audio-provider'
import ControlButton from './control-button'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedCss from '../../../constants/css'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import SeekBar from './seek-bar'
import styled from 'styled-components'
import themeConst from '../../../constants/theme'
import typography from '../../../constants/typography'

function getContainerBorderColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return 'rgba(255, 255, 255, 0.2)'
    case themeConst.article.v2.default:
    case themeConst.article.v2.pink:
    default:
      return '#d8d8d8'
  }
}

const Container = styled.div`
  border-color: ${props => getContainerBorderColor(props.theme.name)};
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-radius: 0 0 4px 4px;
  ${mq.tabletAndBelow`
    padding-bottom: 30px;
  `}
  ${mq.desktopAndAbove`
    padding-bottom: 40px;
  `}
`

function getTimeRowColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return 'rgba(255, 255, 255, 0.8)'
    case themeConst.article.v2.default:
    case themeConst.article.v2.pink:
    default:
      return '#808080'
  }
}

const TimeRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 15px 13px 15px;
  font-weight: ${typography.font.weight.bold};
  color: ${props => getTimeRowColor(props.theme.name)};
  letter-spacing: 0.47px;
  font-size: 14px;
  user-select: none;
`

const FlexPositioning = styled.div`
  display: flex;
  width: 100%;
  ${mq.mobileOnly`
    flex-wrap: wrap;
  `}
`

const ButtonWrapper = styled.div`
  ${mq.mobileOnly`
    width: 100%;
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    >* {
      transform: translateY(-20px);
    }
  `}
  ${mq.tabletOnly`
    margin-left: 36px;
    margin-right: 11px;
  `}
  ${mq.desktopOnly`
    margin-left: 40px;
    margin-right: 15px;
  `}
  ${mq.hdOnly`
    margin-left: 65px;
    margin-right: 30px;
  `}
`

const Info = styled.div`
  ${mq.mobileOnly`
    width: 100%;
    flex: 0 0 100%;
    padding: 0 20px;
  `}
  ${mq.tabletOnly`
    margin-right: 45px;
  `}
  ${mq.desktopOnly`
    margin-right: 50px;
  `}
  ${mq.hdOnly`
    margin-right: 65px;
  `}
`

function getTitleColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return '#fff'
    case themeConst.article.v2.pink:
      return '#494949'
    case themeConst.article.v2.default:
    default:
      return '#404040'
  }
}

function getDescColor(themeName) {
  switch (themeName) {
    case themeConst.article.v2.photo:
      return 'rgba(255, 255, 255, 0.8)'
    case themeConst.article.v2.pink:
      return '#494949'
    case themeConst.article.v2.default:
    default:
      return '#404040'
  }
}

const Title = styled.div`
  font-size: 16px;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${props => getTitleColor(props.theme.name)};
  ${mq.desktopAndAbove`
    margin-top: 11px;
  `}
`

const Desc = styled.div`
  font-size: 14px;
  font-weight: ${typography.font.weight.normal};
  line-height: 1.36;
  letter-spacing: 0.5px;
  color: ${props => getDescColor(props.theme.name)};
  ${predefinedCss.linkChildren};
`

export default class AudioPlayer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.shape({
      coverPhoto: PropTypes.object,
      description: PropTypes.string,
      filetype: PropTypes.string,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }

  render() {
    const { content, className } = this.props
    return (
      <Container className={className}>
        <AudioProvider src={content.url}>
          <SeekBar />
          <TimeRow>
            <Time.Current />
            <Time.Duration />
          </TimeRow>
          <FlexPositioning>
            <ButtonWrapper>
              <ControlButton />
            </ButtonWrapper>
            <Info>
              <Title>{content.title || ''}</Title>
              <Desc
                dangerouslySetInnerHTML={{ __html: content.description || '' }}
              />
            </Info>
          </FlexPositioning>
        </AudioProvider>
      </Container>
    )
  }
}
