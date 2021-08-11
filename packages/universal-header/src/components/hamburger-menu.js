import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import HeaderContext from '../contexts/header-context'
import themeUtils from '../utils/theme'
import colors from '../constants/colors'
import ActionButton from './action-button'
import Slogan from './slogan'
import Link from './customized-link'
import HamburgerService from './hamburger-icons'
import Channel from './channels.js'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

const styles = {
  closeButtonHeight: {
    mobile: 42, // px
    tablet: 60, // px
  },
  sloganMargin: {
    mobile: [28, 0],
    tablet: [38, 0],
  },
  channelMargin: {
    mobile: [20, 0, 0, 0],
    tablet: [40, 0, 0, 0],
  },
  serviceMargin: {
    mobile: [16, 0, 22, 0],
    tablet: [24, 0, 42, 0],
  },
}

const MenuContainer = styled.div`
  background-color: ${props => props.bgColor};
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 101;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CloseContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  height: ${styles.closeButtonHeight.mobile}px;
  width: ${styles.closeButtonHeight.mobile}px;

  ${mq.tabletOnly`
    height: ${styles.closeButtonHeight.tablet}px;
    width: ${styles.closeButtonHeight.tablet}px;
  `}
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SloganContainer = styled.div`
  margin: ${arrayToCssShorthand(styles.sloganMargin.mobile)};
  ${mq.tabletOnly`
    margin: ${arrayToCssShorthand(styles.sloganMargin.tablet)};
  `}
`

const ActionContainer = styled.div`
  width: 100%;
  padding: 0 30px;
`

const ChannelContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  margin: ${arrayToCssShorthand(styles.channelMargin.mobile)};
  ${mq.tabletOnly`
    margin: ${arrayToCssShorthand(styles.channelMargin.tablet)};
  `}
`

const ServiceContainer = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: ${arrayToCssShorthand(styles.serviceMargin.mobile)};
  ${mq.tabletOnly`
    margin: ${arrayToCssShorthand(styles.serviceMargin.tablet)};
  `}
`

class HamburgerMenu extends React.PureComponent {
  static propTypes = {
    channels: PropTypes.array,
    services: PropTypes.array,
    actions: PropTypes.array,
    handleClose: PropTypes.func,
  }

  static defaultProps = {
    channels: [],
    services: [],
    actions: [],
    handleClose: () => {},
  }

  render() {
    const { channels, services, actions, handleClose } = this.props

    return (
      <HeaderContext.Consumer>
        {({ theme }) => {
          const { bgColor } = themeUtils.selectHamburgerMenuTheme(theme)
          const CloseIcon = themeUtils.selectIcons(theme).close
          const closeJSX = (
            <CloseContainer onClick={handleClose}>
              <CloseIcon />
            </CloseContainer>
          )
          return (
            <MenuContainer
              bgColor={bgColor}
            >
              {closeJSX}
              <FlexBox>
                <SloganContainer>
                  <Slogan />
                </SloganContainer>
                <ActionContainer>
                  <ActionButton actions={actions} direction='column' callback={handleClose} />
                </ActionContainer>
                <ChannelContainer>
                  <Channel data={channels} direction='column' currentPathname='' callback={handleClose}/>
                </ChannelContainer>
              </FlexBox>
              <ServiceContainer>
                <HamburgerService services={services} callback={handleClose} />
              </ServiceContainer>
            </MenuContainer>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default HamburgerMenu
