import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled, { css, keyframes } from 'styled-components'
import HeaderContext from '../contexts/header-context'
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
import animationUtils from '../utils/animations'
import Channels from './channels'
import ActionButton from './action-button'
import Icons from './icons'
import Link from './customized-link'
import Slogan from './slogan'
import Logo from './logo'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'

const CHANNEL_HEIGHT = 36 // px

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
  channelTopBorderWidth: [0, 1, 1, 0], // px
  channelBottomBorderWidth: [1, 0, 1, 0], // px
  iconBorderWidth: {
    wide: [0, 0, 0, 0], // px
    narrow: [0, 0, 1, 0], // px
  },
  zIndex: {
    flexGroup: 3,
    channelBottom: 1,
    channelTop: {
      wide: 2,
      narrow: 4,
    },
  },
}

const headerWide = animationUtils.changeHeight(
  `${styles.headerHeight.narrow}px`,
  `${styles.headerHeight.wide}px`
)
const headerNarrow = animationUtils.changeHeight(
  `${styles.headerHeight.wide}px`,
  `${styles.headerHeight.narrow}px`
)
const HeaderEffect = css`
  .header-effect-enter {
    height: ${styles.headerHeight.narrow}px;
  }
  .header-effect-enter-active {
    animation: ${headerWide} 0.2s linear;
    animation-delay: 300ms;
  }
  .header-effect-exit-active {
    animation: ${headerNarrow} 0.2s linear;
    animation-delay: 300ms;
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
    animation: ${animationUtils.changeTranslateX('-40px', 0)} 0.2s;
    animation-delay: 300ms;
  }
  .action-effect-exit-active {
    animation: ${animationUtils.changeTranslateX(0, '-40px')} 0.2s;
    animation-delay: 300ms;
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
    animation: ${animationUtils.changeOpacity('0', '1')} 0.2s;
    animation-delay: 300ms;
  }
  .slogan-effect-exit-active {
    animation: ${animationUtils.changeOpacity('1', '0')} 0.2s;
    animation-delay: 300ms;
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
    animation-delay: 400ms;
  }
  .channel-effect-exit-active {
    animation: ${channelSlideOut} 0.1s linear;
    animation-delay: 100ms;
  }
`

const LogoEffect = css`
  .logo-effect-enter {
    width: 80%;
  }
  .logo-effect-enter-active {
    animation: ${animationUtils.changeWidth('80%', '100%')} 0.2s linear;
    animation-delay: 300ms;
  }
  .logo-effect-exit-active {
    animation: ${animationUtils.changeWidth('100%', '80%')} 0.2s linear;
    animation-delay: 300ms;
  }
  .logo-effect-exit-done {
    width: 80%;
  }
`

const Box = styled.div`
  transform: translateY(
    ${props => (props.isHide ? `${-styles.headerHeight.narrow}px` : 0)}
  );
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
`

const ChannelContainer = styled.div`
  width: calc(100% - 120px);
  max-width: ${styles.channelMaxWidth.hd}px;
  z-index: ${styles.zIndex.channelBottom};
  ${ChannelEffect}
`

const FlexGroup = styled.div`
  display: flex;
  z-index: ${styles.zIndex.flexGroup};
`

const FlexItem = css`
  margin-right: 14px;
  display: flex;
  align-items: center;
`

const LogoContainer = styled.div`
  ${FlexItem}
  ${LogoEffect}
  img {
    width: 210px;
  }
`

const SloganContainer = styled.div`
  ${FlexItem}
  ${SloganEffect}
`

const ActionContainer = styled.div`
  ${FlexItem}
  ${ActionEffect}
`

const IconContainer = styled.div`
  ${FlexItem}
  height: ${styles.headerHeight.narrow}px;
  margin: 0;
  padding-left: 14px; // for border-bottom connect with channel top component
  border-color: ${props => props.borderColor};
  border-style: solid;
  border-width: ${props =>
    arrayToCssShorthand(styles.iconBorderWidth[props.headerType])};
  transition: border-width 0.1s linear 0.2s;
`

const ChannelTopContainer = styled.div`
  position: absolute;
  width: calc(100% - 530px);
  min-width: 480px;
  max-width: 910px;
  height: ${styles.headerHeight.narrow}px;
  right: 186px;
  z-index: ${props => styles.zIndex.channelTop[props.headerType]};
  ${FlexItem}
  ${ChannelEffect}
  ${mq.hdOnly`
    right: calc(50% - 540px);
  `}
`

const Header = ({ pathname, channels, services, actions, narrowActions }) => {
  return (
    <HeaderContext.Consumer>
      {({ releaseBranch, isLinkExternal, theme, toUseNarrow, hideHeader }) => {
        const { bgColor, borderColor } = themeUtils.selectHeaderTheme(theme)
        return (
          <Box bgColor={bgColor} isHide={hideHeader}>
            <CSSTransition
              in={!toUseNarrow}
              classNames="header-effect"
              timeout={{ appear: 0, enter: 500, exit: 500 }}
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
                        timeout={{ appear: 0, enter: 500, exit: 500 }}
                      >
                        <Logo />
                      </CSSTransition>
                    </Link>
                  </LogoContainer>
                  <ActionContainer>
                    <CSSTransition
                      in={!toUseNarrow}
                      classNames="action-effect"
                      timeout={{ appear: 0, enter: 500, exit: 500 }}
                    >
                      <ActionButton
                        actions={toUseNarrow ? narrowActions : actions}
                      />
                    </CSSTransition>
                  </ActionContainer>
                  <SloganContainer>
                    <CSSTransition
                      in={!toUseNarrow}
                      classNames="slogan-effect"
                      timeout={{ appear: 0, enter: 500, exit: 500 }}
                    >
                      <Slogan />
                    </CSSTransition>
                  </SloganContainer>
                </FlexGroup>
                <ChannelTopContainer
                  headerType={toUseNarrow ? 'narrow' : 'wide'}
                >
                  <CSSTransition
                    in={toUseNarrow}
                    classNames="channel-effect"
                    timeout={{ appear: 0, enter: 600, exit: 200 }}
                    unmountOnExit
                  >
                    <Channels
                      currentPathname={pathname}
                      data={channels}
                      borderWidth={styles.channelTopBorderWidth}
                    />
                  </CSSTransition>
                </ChannelTopContainer>
                <IconContainer
                  headerType={toUseNarrow ? 'narrow' : 'wide'}
                  borderColor={borderColor}
                >
                  <Icons services={services} />
                </IconContainer>
              </TopRow>
            </CSSTransition>
            <ChannelContainer>
              <CSSTransition
                in={!toUseNarrow}
                classNames="channel-effect"
                timeout={{ appear: 0, enter: 600, exit: 200 }}
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
