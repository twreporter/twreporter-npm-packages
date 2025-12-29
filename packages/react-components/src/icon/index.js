import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// enum
import { IconType, ArrowDirection, BookmarkType, MediaType } from './enum'
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
  mask-image: url(${(props) => props.src});
  mask-size: cover;
`
const RawIconContainer = styled.img`
  height: 24px;
  width: 24px;
`
export const Icon = ({
  type = IconType.MASK,
  filename = '',
  releaseBranch = BRANCH.master,
  ...restProps
}) => {
  const src = `${baseGCSDir}${releaseBranch}/${filename}.svg`
  const IconComponent = type === IconType.RAW ? RawIconContainer : IconContainer
  return <IconComponent alt={filename} src={src} {...restProps} />
}
Icon.propTypes = {
  type: PropTypes.oneOf(Object.values(IconType)),
  filename: PropTypes.string,
  releaseBranch: BRANCH_PROP_TYPES,
}
Icon.type = IconType
Icon.releaseBranch = BRANCH

const getIcon = (gcsFileName) => {
  const gcsIcon = ({ releaseBranch = BRANCH.master, ...props }) => (
    <Icon filename={gcsFileName} releaseBranch={releaseBranch} {...props} />
  )
  gcsIcon.propTypes = {
    type: PropTypes.oneOf(Object.values(IconType)),
    releaseBranch: BRANCH_PROP_TYPES,
  }
  gcsIcon.displayName = gcsFileName || 'icon'
  gcsIcon.Type = IconType

  return gcsIcon
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
export const History = getIcon('history')
export const KidStar = getIcon('kid_star')
export const Plurk = getIcon('plurk')
export const Filter = getIcon('filter')
export const Video = getIcon('video')
export const Report = getIcon('report')
export const Switch = getIcon('switch')
export const Fullscreen = getIcon('fullscreen')
export const Back = getIcon('back')
export const More = getIcon('more')
export const OpenInNew = getIcon('open_in_new')
export const Download = getIcon('download')
export const Source = getIcon('source')

export const Arrow = ({
  direction = ArrowDirection.RIGHT,
  releaseBranch,
  ...props
}) => {
  const filename = `arrow_${direction}`
  return <Icon filename={filename} releaseBranch={releaseBranch} {...props} />
}
Arrow.propTypes = {
  direction: PropTypes.oneOf(Object.values(ArrowDirection)),
  releaseBranch: BRANCH_PROP_TYPES,
}
Arrow.Direction = ArrowDirection

export const Bookmark = ({ type = BookmarkType.BASIC, releaseBranch }) => {
  const filename = `bookmark_${type}`
  return <Icon filename={filename} releaseBranch={releaseBranch} />
}
Bookmark.propTypes = {
  type: PropTypes.oneOf(Object.values(BookmarkType)),
  releaseBranch: BRANCH_PROP_TYPES,
}
Bookmark.Type = BookmarkType

export const SocialMedia = ({ mediaType = MediaType.GOOGLE, ...args }) => (
  <Icon filename={mediaType} {...args} />
)
SocialMedia.propTypes = {
  type: Icon.propTypes.type,
  mediaType: PropTypes.oneOf(Object.values(MediaType)),
  releaseBranch: BRANCH_PROP_TYPES,
}
SocialMedia.Type = IconType
SocialMedia.MediaType = MediaType

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
  History,
  KidStar,
  Plurk,
  Filter,
  Video,
  Report,
  Switch,
  OpenInNew,
  Download,
  Source,
}
