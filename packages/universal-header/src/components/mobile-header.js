import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import SlideDownMenu from './mobile-slide-down-menu'
import ActionButton from './action-button'
import Slogan from './slogan'
import colors from '../constants/colors'
import linkUtils from '../utils/links'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

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
  padding: 30px 10px 35px 24px;
`

const FlexGroup = styled.div`
  display: flex;
`

const FlexItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;
`

const Hamburger = styled.div`
  cursor: pointer;
`

export default class MobileHeader extends React.PureComponent {
  static propTypes = {
    channels: PropTypes.array,
    services: PropTypes.array,
    actions: PropTypes.array,
  }
  static defaultProps = {
    channels: [],
    services: [],
    actions: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      toSlideDown: false,
    }
    this.handleOnHamburgerClick = this._handleOnHamburgerClick.bind(this)
    this.closeMenu = this._closeMenu.bind(this)
  }

  _handleOnHamburgerClick() {
    this.setState({
      toSlideDown: !this.state.toSlideDown,
    })
  }

  _closeMenu() {
    this.setState({
      toSlideDown: false,
    })
  }

  render() {
    const { channels, services, actions } = this.props

    const { toSlideDown } = this.state

    const slideDownPanelJSX = (
      <SlideDownMenu
        toSlideDown={toSlideDown}
        data={channels}
        handleClick={this.closeMenu}
      />
    )

    return (
      <React.Fragment>
        {slideDownPanelJSX}
        <HeaderContext.Consumer>
          {({ releaseBranch, isLinkExternal, theme }) => {
            const Logo = themeUtils.selectLogoComponent(theme)
            const bgColor = themeUtils.selectBgColor(theme)
            const MenuIcon = themeUtils.selectIcons(theme).menu
            return (
              <FlexBox bgColor={bgColor}>
                <FlexGroup>
                  <FlexItem>
                    <Link
                      {...linkUtils.getLogoLink(isLinkExternal, releaseBranch)}
                      onClick={this.closeMenu}
                    >
                      <Logo />
                    </Link>
                  </FlexItem>
                  <FlexItem>
                    <ActionButton actions={actions} />
                  </FlexItem>
                  <TabletOnly>
                    <FlexItem>
                      <Slogan />
                    </FlexItem>
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
