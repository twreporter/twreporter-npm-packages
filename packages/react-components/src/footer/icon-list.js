import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import styles from './constants/styles'
// core
import { assets as assetsPath } from './constants/paths'
import externalLinks from '@twreporter/core/lib/constants/external-links'
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const iconList = [
  {
    slug: 'facebook',
    text: 'Facebook',
    link: externalLinks.facebook,
    target: '_blank',
  },
  {
    slug: 'instagram',
    text: 'Instagram',
    link: externalLinks.instagram,
    target: '_blank',
  },
  {
    slug: 'line',
    text: 'Line',
    link: externalLinks.line,
    target: '_blank',
  },
  {
    slug: 'medium',
    text: 'Medium',
    link: externalLinks.medium,
    target: '_blank',
    logoInPureBlackWhite: true,
  },
  {
    slug: 'github',
    text: 'Github',
    link: externalLinks.github,
    target: '_blank',
    logoInPureBlackWhite: true,
  },
  {
    slug: 'rss',
    text: 'RSS',
    link: externalLinks.rss,
    target: '_blank',
  },
]

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

class Icon extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMouseEnter: false,
    }
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter(e) {
    e.preventDefault()
    this.setState({
      isMouseEnter: true,
    })
  }

  handleMouseLeave(e) {
    e.preventDefault()
    this.setState({
      isMouseEnter: false,
    })
  }

  render() {
    const { isMouseEnter } = this.state
    const { icon } = this.props
    const iconSrc = `${assetsPath}${icon.slug}-logo-default.svg`
    const iconHoverSrc = `${assetsPath}${icon.slug}-logo-hover.svg`
    return (
      <IconLink
        href={icon.link}
        target={icon.target}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img alt={icon.slug} src={isMouseEnter ? iconHoverSrc : iconSrc} />
      </IconLink>
    )
  }
}

Icon.propTypes = {
  icon: PropTypes.shape({
    link: PropTypes.string,
    slug: PropTypes.string,
    target: PropTypes.string,
  }).isRequired,
}

class IconList extends React.PureComponent {
  render() {
    return (
      <Icons>
        {_.map(iconList, icon => (
          <Icon key={icon.slug} icon={icon} />
        ))}
      </Icons>
    )
  }
}

export default IconList
