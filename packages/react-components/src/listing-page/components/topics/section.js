import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// assets
import RightArrowIcon from '../../assets/arrow-right.svg'
// constants
import { resetLinkStyle } from '../../constants/predefined-css'
import color from '../../constants/color'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight } from '@twreporter/core/lib/constants/font'

const styles = {
  goToTopicMargin: [20, 'auto', 0, 'auto'],
  goToTopicPadding: [14, 0, 14, 0],
  sectionMargin: {
    mobile: [24, 0, 36, 0],
    tablet: [32, 0, 64, 0],
    desktop: [64, 0, 64, 0],
  },
  titleMargin: {
    mobile: [0, 0, 24, 0],
    tablet: [0, 0, 32, 0],
    desktop: [0, 0, 64, 0],
  },
  titlePadding: [16, 0, 16, 0],
}

const StyledLink = styled(Link)`
  ${resetLinkStyle}
  display: block;
  margin: ${arrayToCssShorthand(styles.goToTopicMargin)};
`

const SectionContent = styled.div`
  width: 100%;
  ${mq.mobileOnly`
    margin: ${arrayToCssShorthand(styles.sectionMargin.mobile)};
  `}
  ${mq.tabletOnly`
    margin: ${arrayToCssShorthand(styles.sectionMargin.tablet)};
  `}
  ${mq.desktopAndAbove`
    margin: ${arrayToCssShorthand(styles.sectionMargin.desktop)};
  `}
`

const GoToTopic = styled.div`
  color: ${color.blue};
  text-align: center;
  line-height: 1;
  padding: ${arrayToCssShorthand(styles.goToTopicPadding)};
  span {
    display: inline-block;
    max-width: 400px;
    ${mq.mobileOnly`
      max-width: 290px;
    `}
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.1px;
    font-size: 16px;
    font-weight: ${fontWeight.normal};
  }
  svg {
    height: 16px;
    vertical-align: baseline;
    margin-left: 0.5em;
  }
`

const TopSectionContent = props => (
  <SectionContent>
    {props.children}
    {!props.topicName ? null : (
      <StyledLink to={props.topicUrl}>
        <GoToTopic>
          <span>{`更多${props.topicName}文章`}</span>
          <RightArrowIcon />
        </GoToTopic>
      </StyledLink>
    )}
  </SectionContent>
)

TopSectionContent.propTypes = {
  children: PropTypes.node.isRequired,
  topicUrl: PropTypes.string.isRequired,
  topicName: PropTypes.string,
}

TopSectionContent.defaultProps = {
  topicName: '',
}

const ListSectionContent = props => (
  <SectionContent>{props.children}</SectionContent>
)

ListSectionContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export { TopSectionContent, ListSectionContent }
