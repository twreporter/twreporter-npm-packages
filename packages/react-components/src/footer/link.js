import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporters
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import origins from '@twreporter/core/lib/constants/request-origins'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

import { SocialMedia } from '../icon'
import { IconButton } from '../button'
import { P2 } from '../text/paragraph'
import Link from '../customized-link'
// constants
import { getLinksGroups, getSocialMediaLinks } from './constants/links'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${mq.tabletAndBelow`
    flex-grow: 1;
    flex-basis: 33%;
    word-wrap: break-word;
    max-width: 33%;
    gap: 8px;
  `}
`

const LinkContainer = styled(Link)`
  text-decoration: none;
`

const LinkItem = styled(P2)`
  color: ${colorGrayscale.gray600};
  &:hover {
    color: ${colorGrayscale.gray800};
  }
`

const FooterLinkButton = ({ slug, text, to, target, id }) => {
  return (
    <LinkContainer slug={slug} to={to} target={target} id={id}>
      <LinkItem text={text} />
    </LinkContainer>
  )
}

FooterLinkButton.propTypes = {
  slug: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  id: PropTypes.string,
}

const FooterSocialMediaIcon = ({ releaseBranch, slug, icon, to, target }) => {
  const Icon = <SocialMedia mediaType={icon} releaseBranch={releaseBranch} />
  return (
    <LinkContainer slug={slug} to={to} target={target}>
      <IconButton iconComponent={Icon} />
    </LinkContainer>
  )
}

FooterSocialMediaIcon.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
  slug: PropTypes.string,
  icon: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
}

export const FooterLinkButtonGroups = ({
  releaseBranch = releaseBranchConsts.release,
}) => {
  const mainOrigin = origins.forClientSideRendering[releaseBranch].main
  const linksGroups = getLinksGroups(mainOrigin)
  return _.map(linksGroups, (links, indexofGroup) => {
    return (
      <LinkColumn key={indexofGroup}>
        {_.map(links, (link, indexofLink) => {
          return <FooterLinkButton key={indexofLink} {...link} />
        })}
      </LinkColumn>
    )
  })
}

FooterLinkButtonGroups.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const FooterSocialMediaIcons = ({
  releaseBranch = releaseBranchConsts.release,
}) => {
  const icons = getSocialMediaLinks()
  return _.map(icons, (icon, index) => {
    return (
      <FooterSocialMediaIcon
        key={index}
        releaseBranch={releaseBranch}
        {...icon}
      />
    )
  })
}

FooterSocialMediaIcons.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}
