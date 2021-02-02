import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import entityPaths from '@twreporter/core/lib/constants/entity-path'
import FetchingWrapper from '../../is-fetching-wrapper'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import ListItem from './list-item'
import mockup from '../constants/mockup-spec'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  forEach,
  get,
  map,
}

const Container = styled.div`
  margin: 45px auto 0 auto;
`

const Header = styled.div`
  font-size: 36px;
  font-weight: ${fontWeight.bold};
  color: #404040;
  margin: 0 auto 45px auto;
  text-align: center;

  ${mq.mobileOnly`
    width: ${(mockup.mobile.cardWidth / mockup.mobile.maxWidth) * 100}%;
    text-align: left;
  `}
`

const FlexItems = styled.div`
  width: ${mockup.hd.maxWidth}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  > div:nth-child(odd) {
    margin-right: ${mockup.marginBetweenItems}px;
  }

  ${mq.desktopOnly`
    width: ${mockup.desktop.maxWidth}px;
  `}

  ${mq.tabletOnly`
    width: ${mockup.tablet.maxWidth}px;
  `}

  ${mq.mobileOnly`
    width: 100%;
    > div:nth-child(odd) {
      margin-right: 0;
    }
    justify-content: center;
  `}
`

const Items = FetchingWrapper(FlexItems)

class List extends PureComponent {
  render() {
    const { data, catName, tagName, isFetching, showSpinner } = this.props
    const listJSX = []
    _.forEach(data, item => {
      const style = _.get(item, 'style')
      const slug = _.get(item, 'slug')
      // TODO extract interactive as to a const file
      const to =
        style === 'interactive'
          ? entityPaths.interactiveArticle + slug
          : entityPaths.article + slug

      const tags = _.map(_.get(item, 'tags'), tag => {
        if (_.get(tag, 'name') === tagName) {
          return {
            id: tag.id,
            name: tag.name,
            selected: true,
          }
        }
        return {
          id: _.get(tag, 'id'),
          name: _.get(tag, 'name', ''),
        }
      })

      listJSX.push(
        <ListItem
          key={_.get(item, 'id')}
          title={_.get(item, 'title', '')}
          desc={_.get(item, 'og_description', '')}
          img={{
            alt: _.get(item, 'hero_image.description'),
            // Displaying `hero_image` is a default setting for listing.
            // In cases which do not have `hero_image`, display `og_image` as fallback.
            src:
              _.get(item, 'hero_image.resized_targets.mobile.url') ||
              _.get(item, 'og_image.resized_targets.mobile.url'),
          }}
          category={_.get(item, 'categories.0.name', '')}
          pubDate={date2yyyymmdd(_.get(item, 'published_date', ''), '.')}
          tags={tags}
          link={{
            to,
            target: style === 'interactive' ? '_blank' : '',
          }}
        />
      )
    })
    return (
      <Container>
        <Header>{catName || (tagName ? `#${tagName}` : '')}</Header>
        <Items isFetching={isFetching} showSpinner={showSpinner}>
          {listJSX}
        </Items>
      </Container>
    )
  }
}

List.defaultProps = {
  data: [],
  catName: '',
  tagName: '',
  isFetching: false,
  showSpinner: false,
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      og_description: PropTypes.string.isRequired,
      hero_image: PropTypes.object.isRequired,
      categories: PropTypes.array,
      published_date: PropTypes.string.isRequired,
      tags: PropTypes.array,
      style: PropTypes.string,
    })
  ),
  tagName: PropTypes.string,
  catName: PropTypes.string,
  isFetching: PropTypes.bool,
  showSpinner: PropTypes.bool,
}

export default List
