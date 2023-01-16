import React, { useContext } from 'react'
import styled from 'styled-components'
// context
import HeaderContext, { HamburgerContext } from '../contexts/header-context'
// utils
import { getFooterLinks, getSocialMediaLinks } from '../utils/links'
import { selectHamburgerFooterTheme } from '../utils/theme'
// constants
import { FOOTER_ORDER, FOOTER_LABEL } from '../constants/footer'
import { SOCIAL_MEDIA_ORDER } from '../constants/social-media'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import Link from '@twreporter/react-components/lib/customized-link'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { IconButton } from '@twreporter/react-components/lib/button'
import { SocialMedia } from '@twreporter/react-components/lib/icon'
import { THEME } from '@twreporter/core/lib/constants/theme'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const LinkItem = styled.div`
  padding: 8px 32px;
  color: ${props => props.color};
  ${mq.desktopAndAbove`
    &:hover {
      color: ${props => props.hoverColor};
      background-color: ${props => props.hoverBgColor};
    }
  `}
  &:active {
    color: ${props => props.activeColor};
    background-color: ${props => props.activeBgColor};
  }
`
const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
  }
`
const IconItem = styled.div`
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
  ${mq.mobileOnly`
    svg {
      height: 32px;
      width: 32px;
    }
  `}
`
const SocialMediaSection = styled.div`
  display: flex;
  justify-content: center;
`
const DividerContainer = styled.div`
  margin: 16px 32px;
`

const Footer = ({ ...props }) => {
  const { theme, releaseBranch, isLinkExternal } = useContext(HeaderContext)
  const { closeHamburgerMenu } = useContext(HamburgerContext)
  const footerTheme = theme === THEME.transparent ? THEME.normal : theme
  const {
    color,
    hoverColor,
    hoverBgColor,
    activeColor,
    activeBgColor,
  } = selectHamburgerFooterTheme(footerTheme)

  const footerLinks = getFooterLinks(isLinkExternal, releaseBranch)
  const linkJSX = footerLinks ? (
    <LinkSection>
      {_.map(FOOTER_ORDER, key => {
        const link = footerLinks[key]
        const label = FOOTER_LABEL[key]
        if (!link || !label) {
          return
        }
        return (
          <Link {...link} key={key} onClick={closeHamburgerMenu}>
            <LinkItem
              color={color}
              hoverColor={hoverColor}
              hoverBgColor={hoverBgColor}
              activeColor={activeColor}
              activeBgColor={activeBgColor}
            >
              <P2 text={label} />
            </LinkItem>
          </Link>
        )
      })}
    </LinkSection>
  ) : null

  const socialMediaLinks = getSocialMediaLinks()
  const socialMediaJSX = socialMediaLinks ? (
    <SocialMediaSection>
      {_.map(SOCIAL_MEDIA_ORDER, key => {
        const link = socialMediaLinks[key]
        if (!link) {
          return
        }
        const Icon = (
          <SocialMedia mediaType={key} releaseBranch={releaseBranch} />
        )
        return (
          <IconItem key={key}>
            <Link {...link}>
              <IconButton iconComponent={Icon} theme={footerTheme} />
            </Link>
          </IconItem>
        )
      })}
    </SocialMediaSection>
  ) : null

  return (
    <FooterContainer {...props}>
      {linkJSX}
      <DividerContainer>
        <Divider />
      </DividerContainer>
      {socialMediaJSX}
    </FooterContainer>
  )
}

export default Footer
