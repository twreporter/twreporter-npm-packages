import React from 'react'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
import externalLinks from '../constants/external-links'
import themeUtils from '../utils/theme'

const LogoContainer = styled.img`
  ${props => (props.isHide ? 'display: none;' : '')}
`

const Logo = () => {
  const logoDefaultSrc = externalLinks.logo
  const logoWhiteSrc = externalLinks.logoWhite
  return (
    <HeaderContext.Consumer>
      {({ theme }) => {
        const logoType = themeUtils.selectLogoType(theme)
        return (
          <React.Fragment>
            <LogoContainer
              alt="The Reporter Logo"
              src={logoDefaultSrc}
              isHide={logoType !== 'default'}
            />
            <LogoContainer
              alt="The Reporter Logo"
              src={logoWhiteSrc}
              isHide={logoType !== 'white'}
            />
          </React.Fragment>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default Logo
