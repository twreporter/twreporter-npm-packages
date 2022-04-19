import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

const baseGCSDir = 'https://www.twreporter.org/assets/icon/'

const IconContainer = styled.svg`
  height: 24px;
  width: 24px;
  background-color: black;
  mask-image: url(${(props) => props.src});
  mask-size: cover;
`

export const Icon = ({
  filename = '',
  releaseBranch = releaseBranchConsts.master,
}) => {
  const src = `${baseGCSDir}${releaseBranch}/${filename}.svg`
  return <IconContainer alt={filename} src={src} />
}
Icon.propTypes = {
  filename: PropTypes.string,
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Arrow = ({ direction = 'right', releaseBranch }) => {
  const filename = `arrow_${direction}`
  return <Icon filename={filename} releaseBranch={releaseBranch} />
}
Arrow.propTypes = {
  direction: PropTypes.oneOf(['right', 'left', 'up', 'down']),
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Bookmark = ({ type = 'basic', releaseBranch }) => {
  const filename = `bookmark_${type}`
  return <Icon filename={filename} releaseBranch={releaseBranch} />
}
Bookmark.propTypes = {
  type: PropTypes.oneOf(['basic', 'add', 'saved']),
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Hamburger = (args) => <Icon filename="hamburger" {...args} />
Hamburger.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Cross = (args) => <Icon filename="cross" {...args} />
Cross.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Search = (args) => <Icon filename="search" {...args} />
Search.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Member = (args) => <Icon filename="member" {...args} />
Member.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Home = (args) => <Icon filename="home" {...args} />
Home.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Share = (args) => <Icon filename="share" {...args} />
Share.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Text = (args) => <Icon filename="text" {...args} />
Text.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Clock = (args) => <Icon filename="clock" {...args} />
Clock.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Article = (args) => <Icon filename="article" {...args} />
Article.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Topic = (args) => <Icon filename="topic" {...args} />
Topic.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Copy = (args) => <Icon filename="copy" {...args} />
Copy.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Loading = (args) => <Icon filename="loading" {...args} />
Loading.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Facebook = (args) => <Icon filename="facebook" {...args} />
Facebook.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Instagram = (args) => <Icon filename="instagram" {...args} />
Instagram.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Medium = (args) => <Icon filename="medium" {...args} />
Medium.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Twitter = (args) => <Icon filename="twitter" />
Twitter.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Youtube = (args) => <Icon filename="youtube" />
Youtube.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export const Line = (args) => <Icon filename="line" />
Line.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
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
  Medium,
  Member,
  Search,
  Share,
  Text,
  Topic,
  Twitter,
  Youtube,
}
