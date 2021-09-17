import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled, { css, keyframes } from 'styled-components'
import HeaderContext from '../contexts/header-context'
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
import animationUtils from '../utils/animations'
import colors from '../constants/colors'
import Channels from './channels'
import ActionButton from './action-button'
import Icons from './icons'
import Link from './customized-link'
import Slogan from './slogan'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import mq from '@twreporter/core/lib/utils/media-query'

const CHANNEL_HEIGHT = 37 // px

const styles = {
  headerHeight: {
    wide: 83, // px
    narrow: 46, // px
  },
  topRowPadding: {
    desktop: [0, 60], // px
  },
  topRowMaxWidth: {
    desktop: 1024,
    hd: 1440, // px
  },
  channelMaxWidth: {
    hd: 1320, // px
  },
  channelBottomBorderWidth: [1, 0, 1, 0], // px
}

const headerWide = animationUtils.changeHeight(`${styles.headerHeight.narrow}px`, `${styles.headerHeight.wide}px`)
const headerNarrow = animationUtils.changeHeight(`${styles.headerHeight.wide}px`, `${styles.headerHeight.narrow}px`)
const HeaderEffect = css`
  .header-effect-enter {
    height: ${styles.headerHeight.narrow}px;
  }
  .header-effect-enter-active {
    animation: ${headerWide} 0.3s linear;
    animation-delay: 400ms;
  }
  .header-effect-exit-active {
    animation: ${headerNarrow} 0.3s linear;
    animation-delay: 400ms;
  }
  .header-effect-exit-done {
    height: ${styles.headerHeight.narrow}px;
  }
`

const ActionEffect = css`
  .action-effect-enter {
    transform: translateX(-40px);
  }
  .action-effect-enter-active {
    animation: ${animationUtils.changeTranslateX('-40px', 0)} 0.3s;
    animation-delay: 400ms;
  }
  .action-effect-exit-active {
    animation: ${animationUtils.changeTranslateX(0, '-40px')} 0.3s;
    animation-delay: 400ms;
  }
  .action-effect-exit-done {
    transform: translateX(-40px);
  }
`

const SloganEffect = css`
  .slogan-effect-enter {
    opacity: 0;
  }
  .slogagn-effect-enter-active {
    animation: ${animationUtils.changeOpacity('0', '1')} 0.3s;
    animation-delay: 400ms;
  }
  .slogan-effect-exit-active {
    animation: ${animationUtils.changeOpacity('1', '0')} 0.3s;
    animation-delay: 400ms;
  }
  .slogan-effect-exit-done {
    opacity: 0;
  }
`

const channelSlideIn = keyframes`
  from {
    transform: translateY(${-CHANNEL_HEIGHT}px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const channelSlideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(${-CHANNEL_HEIGHT}px);
  }
`

const ChannelEffect = css`
  .channel-effect-enter {
    opacity: 0;
  }
  .channel-effect-enter-active {
    animation: ${channelSlideIn} 0.2s linear;
    animation-delay: 500ms;
  }
  .channel-effect-exit-active {
    animation: ${channelSlideOut} 0.2s linear;
    animation-delay: 100ms;
  }
`

const LogoEffect = css`
  .logo-effect-enter {
    width: 80%;
  }
  .logo-effect-enter-active {
    animation: ${animationUtils.changeWidth('80%', '100%')} 0.3s linear;
    animation-delay: 400ms;
  }
  .logo-effect-exit-active {
    animation: ${animationUtils.changeWidth('100%', '80%')} 0.3s linear;
    animation-delay: 400ms;
  }
  .logo-effect-exit-done {
    width: 80%;
  }
`

const Box = styled.div`
  transform: translateY(${props => props.isHide ? `${-styles.headerHeight.narrow}px` : 0});
  transition: transform 0.3s linear;
  background-color: ${props => props.bgColor};
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
  }
  ${HeaderEffect}
`

const TopRow = styled.div`
  height: ${styles.headerHeight.wide}px;
  padding: ${arrayToCssShorthand(styles.topRowPadding.desktop)};
  max-width: ${styles.topRowMaxWidth.hd}px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
`

const ChannelContainer = styled.div`
  width: calc(100% - 120px);
  max-width: ${styles.channelMaxWidth.hd}px;
  z-index: 1;
  ${ChannelEffect}
`

const FlexGroup = styled.div`
  display: flex;
`

const FlexItem = css`
  margin-right: 14px;
  display: flex;
  align-items: center;
`

const LogoContainer = styled.div`
  ${FlexItem}
  ${LogoEffect}
`

const SloganContainer = styled.div`
  ${FlexItem}
  ${SloganEffect}
`

const ActionContainer = styled.div`
  ${FlexItem}
  ${ActionEffect}
`

const ChannelTopContainer = styled.div`
  position: absolute;
  width: calc(100% - 530px);
  min-width: 480px;
  max-width: 910px;
  right: 180px;
  ${FlexItem}
  ${ChannelEffect}
`

const Header = ({ pathname, channels, services, actions, narrowActions }) => {
  return (
    <HeaderContext.Consumer>
      {({ releaseBranch, isLinkExternal, theme, toUseNarrow, hideHeader }) => {
        const bgColor = themeUtils.selectBgColor(theme)
        const Logo = themeUtils.selectLogoComponent(theme)
        return (
          <Box bgColor={bgColor} isHide={hideHeader}>
            <CSSTransition
              in={!toUseNarrow}
              classNames="header-effect"
              timeout={{appear: 0, enter: 700, exit: 700}}
            >
              <TopRow>
                <FlexGroup>
                  <LogoContainer>
                    <Link
                      {...linkUtils.getLogoLink(isLinkExternal, releaseBranch)}
                    >
                      <CSSTransition
                        in={!toUseNarrow}
                        classNames="logo-effect"
                        timeout={{appear: 0, enter: 700, exit: 700}}
                      >
                        <Logo />
                      </CSSTransition>
                    </Link>
                  </LogoContainer>
                  <ActionContainer>
                    <CSSTransition
                      in={!toUseNarrow}
                      classNames="action-effect"
                      timeout={{appear: 0, enter: 700, exit: 700}}
                    >
                      <ActionButton actions={toUseNarrow ? narrowActions : actions} />
                    </CSSTransition>
                  </ActionContainer>
                  <SloganContainer>
                    <CSSTransition
                      in={!toUseNarrow}
                      classNames="slogan-effect"
                      timeout={{appear: 0, enter: 700, exit: 700}}
                    >
                      <Slogan />
                    </CSSTransition>
                  </SloganContainer>
                </FlexGroup>
                <ChannelTopContainer>
                  <CSSTransition
                    in={toUseNarrow}
                    classNames="channel-effect"
                    timeout={{appear: 0, enter: 700, exit: 300}}
                    unmountOnExit
                  >
                    <Channels currentPathname={pathname} data={channels} />
                  </CSSTransition>
                </ChannelTopContainer>
                <Icons services={services} />
              </TopRow>
            </CSSTransition>
            <ChannelContainer>
              <CSSTransition
                in={!toUseNarrow}
                classNames="channel-effect"
                timeout={{appear: 0, enter: 700, exit: 300}}
                unmountOnExit
              >
                <Channels
                  currentPathname={pathname}
                  data={channels}
                  borderWidth={styles.channelBottomBorderWidth}
                />
              </CSSTransition>
            </ChannelContainer>
          </Box>
        )
      }}
    </HeaderContext.Consumer>
  )
}

Header.propTypes = {
  pathname: PropTypes.string,
  channels: Channels.propTypes.data,
  services: PropTypes.array,
  actions: PropTypes.array,
  narrowActions: PropTypes.array,
}

Header.defaultProps = {
  pathname: '',
  channels: Channels.defaultProps.data,
  services: [],
  actions: [],
  narrowActions: [],
}

export default Header
