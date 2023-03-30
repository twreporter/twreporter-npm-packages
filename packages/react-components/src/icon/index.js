import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const baseGCSDir = 'https://www.twreporter.org/assets/icon/'

const IconContainer = styled.svg`
  height: 24px;
  width: 24px;
  background-color: black;
  mask-image: url(${props => props.src});
  mask-size: cover;
`
const RawIconContainer = styled.img`
  height: 24px;
  width: 24px;
`
export const Icon = ({
  type = 'mask',
  filename = '',
  releaseBranch = BRANCH.master,
  ...restProps
}) => {
  const src = `${baseGCSDir}${releaseBranch}/${filename}.svg`
  const IconComponent = type === 'raw' ? RawIconContainer : IconContainer
  return <IconComponent alt={filename} src={src} {...restProps} />
}
Icon.propTypes = {
  type: PropTypes.oneOf(['mask', 'raw']),
  filename: PropTypes.string,
  releaseBranch: BRANCH_PROP_TYPES,
}

const getIcon = gcsFileName => {
  const gscIcon = ({ releaseBranch = BRANCH.master, ...props }) => (
    <Icon filename={gcsFileName} releaseBranch={releaseBranch} {...props} />
  )
  gscIcon.propTypes = {
    type: PropTypes.oneOf(['mask', 'raw']),
    releaseBranch: BRANCH_PROP_TYPES,
  }
  gscIcon.displayName = gcsFileName || 'icon'

  return gscIcon
}

export const Hamburger = getIcon('hamburger')
export const Cross = getIcon('cross')
export const Search = getIcon('search')
export const Member = getIcon('member')
export const Home = getIcon('home')
export const Share = getIcon('share')
export const Text = getIcon('text')
export const Clock = getIcon('clock')
export const Article = getIcon('article')
export const Topic = getIcon('topic')
export const Copy = getIcon('copy')
export const Loading = getIcon('loading')
export const Printer = getIcon('printer')
export const Letter = getIcon('letter')
export const Facebook = getIcon('facebook')
export const Instagram = getIcon('instagram')
export const Medium = getIcon('medium')
export const Twitter = getIcon('twitter')
export const Youtube = getIcon('youtube')
export const Line = getIcon('line')
export const Google = getIcon('google')

export const Arrow = ({ direction = 'right', releaseBranch, ...props }) => {
  const filename = `arrow_${direction}`
  return <Icon filename={filename} releaseBranch={releaseBranch} {...props} />
}
Arrow.propTypes = {
  direction: PropTypes.oneOf(['right', 'left', 'up', 'down']),
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Bookmark = ({ type = 'basic', releaseBranch }) => {
  const filename = `bookmark_${type}`
  return <Icon filename={filename} releaseBranch={releaseBranch} />
}
Bookmark.propTypes = {
  type: PropTypes.oneOf(['basic', 'add', 'saved']),
  releaseBranch: BRANCH_PROP_TYPES,
}

export const SocialMedia = ({ mediaType, ...args }) => (
  <Icon filename={mediaType} {...args} />
)
SocialMedia.propTypes = {
  mediaType: PropTypes.oneOf([
    'facebook',
    'instagram',
    'medium',
    'twitter',
    'youtube',
    'line',
    'google',
  ]),
  releaseBranch: BRANCH_PROP_TYPES,
}

export default {
  Arrow,
  Article,
  Bookmark,
  Clock,
  Copy,
  Cross,
  Facebook,
  Hamburger,
  Home,
  Instagram,
  Line,
  Loading,
  Printer,
  Letter,
  Medium,
  Member,
  Search,
  Share,
  Text,
  Topic,
  Twitter,
  Youtube,
  Google,
  SocialMedia,
}
