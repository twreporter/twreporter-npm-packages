import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
// components
import FetchingWrapper from '../../../is-fetching-wrapper'
import PostsContainer from './posts'
import PostItem from './post-item'
import TopicItem from './topic-item'
import PageContent from './page-content'
import { TopSectionContent, ListSectionContent } from './section'
// constants
import { TEXT } from '../../constants/topics'
import color from '../../constants/color'
// @twreporter
import { fontWeight } from '@twreporter/core/lib/constants/font'
import { TitleBar } from '@twreporter/react-components/lib/title-bar'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const NoData = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${color.darkGray};
  font-weight: ${fontWeight.normal};
  text-align: center;
`

const topicTitleText = '深度專題'

class Topics extends Component {
  _buildRelatedPosts(posts) {
    const _buildPostJSX = post => {
      if (typeof post !== 'object' || post === null) {
        return null
      }

      const { id, linkTarget, linkTo, title, imgUrl } = post
      return (
        <PostItem
          key={`post-${id}`}
          title={title}
          imgUrl={imgUrl}
          linkTo={linkTo}
          linkTarget={linkTarget}
        />
      )
    }
    return _.map(posts, _buildPostJSX)
  }

  _buildTopicBoxes(topics) {
    const _buildTopicBox = (item, index) => {
      const { id, linkTo, title, updatedAt, description, imgUrl, imgAlt } = item
      return (
        <TopicItem
          key={`topic-${id}`}
          title={title}
          updatedAt={updatedAt}
          description={description}
          imgUrl={imgUrl}
          imgAlt={imgAlt}
          isTop={index === 0}
          linkTo={linkTo}
        />
      )
    }
    return _.map(topics, _buildTopicBox)
  }

  render() {
    const { topics, currentPage, isFetching, showSpinner } = this.props
    if (!isFetching && _.get(topics, 'length', 0) <= 0) {
      return (
        <PageContent>
          <NoData>無資料</NoData>
        </PageContent>
      )
    }
    const isFirstPage = currentPage === 1
    /* Build PageContent */
    const topicsJSX = this._buildTopicBoxes(topics)
    let topTopicJSX = null
    let listedTopicsJSX = null
    let topRelatedPosts = null
    let topTopicName = null
    let topicUrl = null
    let topSectionJSX = null
    if (isFirstPage && !isFetching) {
      topTopicJSX = topicsJSX[0]
      listedTopicsJSX = topicsJSX.slice(1)
      topRelatedPosts = _.get(topics, [0, 'relateds'], []).slice(
        -3
      ) /* take last 3 posts from the end */
      topTopicName = _.get(topics, [0, 'topic_name'], '')
      topicUrl = _.get(topics, [0, 'linkTo'], '')
      topSectionJSX = [
        <TitleBar
          key="top-title"
          title={topicTitleText}
          subtitle={TEXT.SECTION_TITLE_FEATURED}
        />,
        <TopSectionContent
          key="top-section"
          topicName={topTopicName}
          topicUrl={topicUrl}
        >
          {topTopicJSX}
          <PostsContainer>
            {this._buildRelatedPosts(topRelatedPosts)}
          </PostsContainer>
        </TopSectionContent>,
      ]
    } else {
      listedTopicsJSX = topicsJSX
    }

    const WrappedListSectionContent = FetchingWrapper(
      <ListSectionContent>{listedTopicsJSX}</ListSectionContent>
    )

    return (
      <PageContent>
        {topSectionJSX}
        {isFetching && isFirstPage ? null : (
          <TitleBar
            title={topicTitleText}
            subtitle={TEXT.SECTION_TITLE_OTHERS}
          />
        )}
        <WrappedListSectionContent
          isFetching={isFetching}
          showSpinner={showSpinner}
        />
      </PageContent>
    )
  }
}

Topics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      linkTo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      topic_name: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      imgAlt: PropTypes.string.isRequired,
      relateds: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          imgUrl: PropTypes.string.isRequired,
          linkTarget: PropTypes.string,
          linkTo: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  currentPage: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  showSpinner: PropTypes.bool,
}

Topics.defaultProps = {
  topics: [],
  currentPage: 1,
  showSpinner: false,
}

export default Topics
