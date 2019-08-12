import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import React from 'react'
import SlideDownMenu from './mobile-slide-down-menu'
import colors from '../constants/colors'
import linkUtils from '../utils/links'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
import wellDefinedPropTypes from '../constants/prop-types'

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

const Hamburger = styled.div`
  cursor: pointer;
`

const Stroke = styled.div`
  background-color: ${colors.primary};
  border-radius: 10px;
  height: 4px;
  margin-bottom: 5px;
  width: 25px;
`

export default class MobileHeader extends React.PureComponent {
  static propTypes = Object.assign(
    {
      menu: SlideDownMenu.propTypes.data,
    },
    wellDefinedPropTypes.header.propTypes
  )
  static defaultProps = Object.assign(
    {
      menu: SlideDownMenu.defaultProps.data,
    },
    wellDefinedPropTypes.header.defaultProps
  )

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
    const { menu } = this.props

    const { toSlideDown } = this.state

    const slideDownPanelJSX = (
      <SlideDownMenu
        toSlideDown={toSlideDown}
        data={menu}
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
            return (
              <FlexBox bgColor={bgColor}>
                <Link
                  {...linkUtils.getLogoLink(isLinkExternal, releaseBranch)}
                  onClick={this.closeMenu}
                >
                  <Logo />
                </Link>
                <Hamburger onClick={this.handleOnHamburgerClick}>
                  <Stroke />
                  <Stroke />
                  <Stroke />
                </Hamburger>
              </FlexBox>
            )
          }}
        </HeaderContext.Consumer>
      </React.Fragment>
    )
  }
}
