import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import HamburgerMenu from './hamburger-menu'
import ActionButton from './action-button'
import Slogan from './slogan'
import colors from '../constants/colors'
import linkUtils from '../utils/links'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

const styles = {
  headerPadding: {
    mobile: [24],
    tablet: [24, 30, 24, 50],
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

const TabletOnly = styled.div`
  display: none;

  ${mq.tabletOnly`
    display: flex;
  `}
`

const FlexBox = styled.div`
  background-color: ${props => props.bgColor};
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: ${arrayToCssShorthand(styles.headerPadding.mobile)};
  ${mq.tabletOnly`
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
`

const HamburgerContainer = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`

const Hamburger = styled.div`
  display: flex;
  cursor: pointer;
`

export default class MobileHeader extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.array,
    menuChannels: PropTypes.array,
    menuServices: PropTypes.array,
    menuActions: PropTypes.array,
  }
  static defaultProps = {
    actions: [],
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
    const { actions, menuChannels, menuServices, menuActions } = this.props

    const { isMenuOpen } = this.state

    const hamburgerJSX = (
      <HamburgerMenu
        channels={menuChannels}
        services={menuServices}
        actions={menuActions}
        handleClose={this.closeMenu}
      />
    )

    return (
      <React.Fragment>
        <HamburgerContainer isOpen={isMenuOpen}>
          {hamburgerJSX}
        </HamburgerContainer>
        <HeaderContext.Consumer>
          {({ releaseBranch, isLinkExternal, theme }) => {
            const Logo = themeUtils.selectLogoComponent(theme)
            const bgColor = themeUtils.selectBgColor(theme)
            const MenuIcon = themeUtils.selectIcons(theme).menu
            return (
              <FlexBox bgColor={bgColor}>
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
                    <ActionButton actions={actions} />
                  </ActionContainer>
                  <TabletOnly>
                    <SloganContainer>
                      <Slogan />
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
