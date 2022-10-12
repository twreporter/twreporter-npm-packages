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

export const Icon = ({
  filename = '',
  releaseBranch = BRANCH.master,
  ...restProps
}) => {
  const src = `${baseGCSDir}${releaseBranch}/${filename}.svg`
  return <IconContainer alt={filename} src={src} {...restProps} />
}
Icon.propTypes = {
  filename: PropTypes.string,
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Arrow = ({ direction = 'right', releaseBranch }) => {
  const filename = `arrow_${direction}`
  return <Icon filename={filename} releaseBranch={releaseBranch} />
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

export const Hamburger = args => <Icon filename="hamburger" {...args} />
Hamburger.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Cross = args => <Icon filename="cross" {...args} />
Cross.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Search = args => <Icon filename="search" {...args} />
Search.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Member = args => <Icon filename="member" {...args} />
Member.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Home = args => <Icon filename="home" {...args} />
Home.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Share = args => <Icon filename="share" {...args} />
Share.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Text = args => <Icon filename="text" {...args} />
Text.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Clock = args => <Icon filename="clock" {...args} />
Clock.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Article = args => <Icon filename="article" {...args} />
Article.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Topic = args => <Icon filename="topic" {...args} />
Topic.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Copy = args => <Icon filename="copy" {...args} />
Copy.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Loading = args => <Icon filename="loading" {...args} />
Loading.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Printer = args => <Icon filename="printer" {...args} />
Printer.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Facebook = args => <Icon filename="facebook" {...args} />
Facebook.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Instagram = args => <Icon filename="instagram" {...args} />
Instagram.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Medium = args => <Icon filename="medium" {...args} />
Medium.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Twitter = args => <Icon filename="twitter" {...args} />
Twitter.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Youtube = args => <Icon filename="youtube" {...args} />
Youtube.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export const Line = args => <Icon filename="line" {...args} />
Line.propTypes = {
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
  Medium,
  Member,
  Search,
  Share,
  Text,
  Topic,
  Twitter,
  Youtube,
}
