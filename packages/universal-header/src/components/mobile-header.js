import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled, { css } from 'styled-components'
import HeaderContext from '../contexts/header-context'
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
import animationUtils from '../utils/animations'
import Link from './customized-link'
import HamburgerMenu from './hamburger-menu'
import ActionButton from './action-button'
import Slogan from './slogan'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'

const styles = {
  headerHeight: {
    mobile: 74, // px
    tablet: 88, // px
  },
  headerPadding: {
    mobile: [24], // px
    tablet: [24, 30, 24, 50], // px
  },
  logoHeight: {
    mobile: 26, // px
    tablet: 40, // px
  },
  logoWidth: {
    mobile: 142, // px
    tablet: 190, // px
  },
  actionMarginLeft: {
    mobile: 30, // px
    tablet: 22, // px
  },
  sloganMarginLeft: {
    tablet: 14, // px
  }
}

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

const TabletOnly = styled.div`
  display: none;

  ${mq.tabletOnly`
    display: flex;
  `}
`

const FlexBox = styled.div`
  transform: translateY(${props => props.isHide ? `${-styles.headerHeight.mobile}px` : 0});
  transition: transform 0.3s linear;
  background-color: ${props => props.bgColor};
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: ${arrayToCssShorthand(styles.headerPadding.mobile)};
  ${mq.tabletOnly`
    transform: translateY(${props => props.isHide ? `${-styles.headerHeight.tablet}px` : 0});
    padding: ${arrayToCssShorthand(styles.headerPadding.tablet)};
  `}
`

const FlexGroup = styled.div`
  display: flex;
`

const LogoContainer = styled.div`
  a {
    display: flex;
  }
  svg {
    height: ${styles.logoHeight.mobile}px;
    width: ${styles.logoWidth.mobile}px;
    ${mq.tabletOnly`
      height: ${styles.logoHeight.tablet}px;
      width: ${styles.logoWidth.tablet}px;
    `}
  }
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${styles.actionMarginLeft.mobile}px;
  ${mq.tabletOnly`
    margin-left: ${styles.actionMarginLeft.tablet}px;
  `}
`

const SloganContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${styles.sloganMarginLeft.tablet}px;
  ${SloganEffect}
`

const HamburgerContainer = styled.div`
  display: block;
`

const Hamburger = styled.div`
  display: flex;
  cursor: pointer;
`

export default class MobileHeader extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.array,
    narrowActions: PropTypes.array,
    menuChannels: PropTypes.array,
    menuServices: PropTypes.array,
    menuActions: PropTypes.array,
  }
  static defaultProps = {
    actions: [],
    narrowActions: [],
    menuChannels: [],
    menuServices: [],
    menuActions: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
    }
    this.handleOnHamburgerClick = this._handleOnHamburgerClick.bind(this)
    this.closeMenu = this._closeMenu.bind(this)
  }

  _handleOnHamburgerClick() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
  }

  _closeMenu() {
    this.setState({
      isMenuOpen: false,
    })
  }

  render() {
    const { actions, narrowActions, menuChannels, menuServices, menuActions } = this.props
    const { isMenuOpen } = this.state

    const hamburgerJSX = (
      <HamburgerMenu
        channels={menuChannels}
        services={menuServices}
        actions={menuActions}
        handleClose={this.closeMenu}
      />
    )

    const hamburgerMenu = isMenuOpen ? hamburgerJSX : ''

    return (
      <React.Fragment>
        <HamburgerContainer>
          {hamburgerMenu}
        </HamburgerContainer>
        <HeaderContext.Consumer>
          {({ releaseBranch, isLinkExternal, theme, toUseNarrow, hideHeader }) => {
            const Logo = themeUtils.selectLogoComponent(theme)
            const bgColor = themeUtils.selectBgColor(theme)
            const MenuIcon = themeUtils.selectIcons(theme).menu
            return (
              <FlexBox bgColor={bgColor} isHide={hideHeader}>
                <FlexGroup>
                  <LogoContainer>
                    <Link
                      {...linkUtils.getLogoLink(isLinkExternal, releaseBranch)}
                      onClick={this.closeMenu}
                    >
                      <Logo />
                    </Link>
                  </LogoContainer>
                  <ActionContainer>
                    <ActionButton actions={toUseNarrow ? narrowActions : actions} />
                  </ActionContainer>
                  <TabletOnly>
                    <SloganContainer>
                      <CSSTransition
                        in={!toUseNarrow}
                        classNames="slogan-effect"
                        timeout={{appear: 0, enter: 700, exit: 700}}
                      >
                        <Slogan />
                      </CSSTransition>
                    </SloganContainer>
                  </TabletOnly>
                </FlexGroup>
                <Hamburger onClick={this.handleOnHamburgerClick}>
                  <MenuIcon />
                </Hamburger>
              </FlexBox>
            )
          }}
        </HeaderContext.Consumer>
      </React.Fragment>
    )
  }
}
