import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import Modal from '@twreporter/react-components/lib/mobile-pop-up-modal'
import HeaderContext from '../contexts/header-context'
import themeUtils from '../utils/theme-old'
import ActionButton from './action-button-old'
import Slogan from './slogan-old'
import HamburgerService from './hamburger-icons'
import Channel from './channels-old'
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  min-height: 100%;
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

const HamburgerMenu = ({ channels, services, actions, handleClose }) => {
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
          <Modal>
            <MenuContainer bgColor={bgColor}>
              {closeJSX}
              <FlexBox>
                <SloganContainer>
                  <Slogan themeFunction={themeUtils.selectSloganHBTheme} />
                </SloganContainer>
                <ActionContainer>
                  <ActionButton
                    actions={actions}
                    direction="column"
                    themeFunction={themeUtils.selectActionButtonHBTheme}
                    callback={handleClose}
                  />
                </ActionContainer>
                <ChannelContainer>
                  <Channel
                    data={channels}
                    direction="column"
                    currentPathname=""
                    themeFunction={themeUtils.selectChannelHBTheme}
                    callback={handleClose}
                  />
                </ChannelContainer>
              </FlexBox>
              <ServiceContainer>
                <HamburgerService services={services} callback={handleClose} />
              </ServiceContainer>
            </MenuContainer>
          </Modal>
        )
      }}
    </HeaderContext.Consumer>
  )
}

HamburgerMenu.propTypes = {
  channels: PropTypes.array,
  services: PropTypes.array,
  actions: PropTypes.array,
  handleClose: PropTypes.func,
}

HamburgerMenu.defaultProps = {
  channels: [],
  services: [],
  actions: [],
  handleClose: () => {},
}

export default HamburgerMenu
