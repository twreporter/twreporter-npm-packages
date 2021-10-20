import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import styles from './constants/styles'
import { assets as assetsPath } from './constants/paths'
import iconList from './constants/icons'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const IconLink = styled.a`
  text-decoration: none !important;
  position: relative;
  display: inline-block;
  margin-right: 11px;
  ${mq.tabletAndAbove`
    width: ${styles.icon.width.tabletAndAbove}px;
    height: ${styles.icon.height.tabletAndAbove}px;  
  `}
  ${mq.mobileOnly`
    margin-right: 0;
    width: 30px;
    height: 30px;
  `}
`

const ShowOnHover = styled.div`
  display: none;
  ${IconLink}:hover & {
    display: block;
  }
`

const HideOnHover = styled.div`
  display: block;
  ${IconLink}:hover & {
    display: none;
  }
`

const Icons = styled.div`
  margin-top: 20px;
  transform: translateX(-5px);
  opacity: 0.8;
  ${mq.mobileOnly`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `}
`

const Icon = ({ icon }) => {
  const iconHref = icon.link
  const iconTarget = icon.target
  const iconSlug = icon.slug
  const iconSrc = `${assetsPath}${icon.slug}-logo-default.svg`
  const iconHoverSrc = `${assetsPath}${icon.slug}-logo-hover.svg`
  return (
    <IconLink href={iconHref} target={iconTarget}>
      <HideOnHover>
        <img alt={iconSlug} src={iconSrc} />
      </HideOnHover>
      <ShowOnHover>
        <img alt={iconSlug} src={iconHoverSrc} />
      </ShowOnHover>
    </IconLink>
  )
}

Icon.propTypes = {
  icon: PropTypes.shape({
    link: PropTypes.string,
    slug: PropTypes.string,
    target: PropTypes.string,
  }).isRequired,
}

Icon.defaultProps = {
  icon: {},
}

const IconList = () => {
  return (
    <Icons>
      {_.map(iconList, icon => (
        <Icon key={icon.slug} icon={icon} />
      ))}
    </Icons>
  )
}

export default IconList
