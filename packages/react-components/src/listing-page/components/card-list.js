import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// components
import { ArticleCard } from '../../card'
import FetchingWrapper from '../../is-fetching-wrapper'
import Divider from '../../divider'
import { DesktopAndAbove, TabletAndBelow } from '../../rwd'
// constants
import mockup from '../constants/mockup-spec'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
const _ = {
  forEach,
  get,
  map,
}

const Card = styled(ArticleCard)`
  width: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Item = styled.div`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  width: 100%;
`
const StyledDivider = styled(Divider)`
  margin-top: 24px;
`
const FlexItem = styled.div`
  width: ${mockup.hd.maxWidth}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  ${mq.desktopOnly`
    width: ${mockup.desktop.maxWidth}px;
  `}

  ${mq.tabletOnly`
    width: ${mockup.tablet.maxWidth}px;
  `}

  ${mq.mobileOnly`
    width: 100%;
    justify-content: center;
  `}
`
const Content = FetchingWrapper(FlexItem)

const CardList = ({
  data = [],
  isFetching = false,
  showSpinner = false,
  releaseBranch = BRANCH.master,
  showIsBookmarked = false,
}) => {
  if (!data || data.length === 0) {
    return null
  }

  const getFirstCategory = categorySets => {
    let res = ''
    _.forEach(categorySets, ({ category, subcategory }) => {
      if (category && category.name) {
        res = category.name
        return false
      }
    })

    return res
  }

  const listJSX = _.map(data, item => {
    const { id, title, slug, style } = item
    const articleCardProps = {
      title,
      description: _.get(item, 'og_description', ''),
      image: {
        alt: _.get(item, 'hero_image.description', ''),
        src:
          _.get(item, 'hero_image.resized_targets.mobile.url') ||
          _.get(item, 'og_image.resized_targets.mobile.url'),
      },
      category: getFirstCategory(_.get(item, 'category_set', [])),
      date: date2yyyymmdd(_.get(item, 'published_date'), '/'),
      releaseBranch,
      style,
      slug,
    }

    return (
      <Item key={id}>
        <DesktopAndAbove>
          <Card
            {...articleCardProps}
            showIsBookmarked={showIsBookmarked}
            size={ArticleCard.Size.L}
          />
        </DesktopAndAbove>
        <TabletAndBelow>
          <Card
            {...articleCardProps}
            showIsBookmarked={showIsBookmarked}
            size={ArticleCard.Size.S}
          />
        </TabletAndBelow>
        <StyledDivider />
      </Item>
    )
  })

  return (
    <Container>
      <Content isFetching={isFetching} showSpinner={showSpinner}>
        {listJSX}
      </Content>
    </Container>
  )
}
CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      og_description: PropTypes.string.isRequired,
      hero_image: PropTypes.object,
      og_image: PropTypes.object,
      category_set: PropTypes.array,
      published_date: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      style: PropTypes.string,
    })
  ),
  isFetching: PropTypes.bool,
  showSpinner: PropTypes.bool,
  releaseBranch: BRANCH_PROP_TYPES,
  showIsBookmarked: PropTypes.bool,
}

export default CardList
