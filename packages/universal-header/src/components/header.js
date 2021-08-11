import HeaderContext from '../contexts/header-context'
import Channels from './channels'
import ActionButton from './action-button'
import Icons from './icons'
import Link from './customized-link'
import Slogan from './slogan'
import PropTypes from 'prop-types'
import React from 'react'
import linkUtils from '../utils/links'
import themeUtils from '../utils/theme'
import styled from 'styled-components'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import mq from '@twreporter/core/lib/utils/media-query'

const styles = {
  headerHeight: 109, // px
  topRowPadding: {
    desktop: [22, 60], // px
  },
  topRowMaxWidth: {
    desktop: 1024,
    hd: 1440, // px
  },
}

const Box = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
  }
`

const TopRow = styled.div`
  background-color: ${props => props.bgColor};
  height: ${styles.headerHeight}px;
  padding: ${arrayToCssShorthand(styles.topRowPadding.desktop)};
  max-width: ${styles.topRowMaxWidth.hd}px;
  box-sizing: border-box;
  height: ${styles.headerHeight}px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`

const FlexGroup = styled.div`
  display: flex;
`

const FlexItem = styled.div`
  margin-right: 14px;
  display: flex;
  align-items: center;
`

class Header extends React.PureComponent {
  static propTypes = {
    pathname: PropTypes.string,
    channels: Channels.propTypes.data,
    services: PropTypes.array,
    actions: PropTypes.array,
  }
  static defaultProps = {
    pathname: '',
    channels: Channels.defaultProps.data,
    services: [],
    actions: [],
  }

  render() {
    const { pathname, channels, services, actions } = this.props

    const channelJSX = <Channels currentPathname={pathname} data={channels} />
    return (
      <Box>
        <HeaderContext.Consumer>
          {({ releaseBranch, isLinkExternal, theme }) => {
            const bgColor = themeUtils.selectBgColor(theme)
            const Logo = themeUtils.selectLogoComponent(theme)
            return (
              <TopRow bgColor={bgColor}>
                <FlexGroup>
                  <FlexItem>
                    <Link
                      {...linkUtils.getLogoLink(isLinkExternal, releaseBranch)}
                    >
                      <Logo />
                    </Link>
                  </FlexItem>
                  <FlexItem>
                    <ActionButton actions={actions} />
                  </FlexItem>
                  <FlexItem>
                    <Slogan />
                  </FlexItem>
                </FlexGroup>
                <Icons services={services} />
              </TopRow>
            )
          }}
        </HeaderContext.Consumer>
        {channelJSX}
      </Box>
    )
  }
}

export default Header
