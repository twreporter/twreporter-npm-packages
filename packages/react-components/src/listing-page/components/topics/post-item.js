import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import {
  linkHoverFadeOut,
  resetLinkStyle,
} from '../../constants/predefined-css'
import Image from '../image'
import { Link } from 'react-router-dom'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import color from '../../constants/color'
import font from '../../constants/font'

const styles = {
  imgLandscape: {
    mobile: {
      width: 122,
      height: 92,
    },
    tablet: {
      width: 220,
      height: 125,
    },
    desktop: {
      width: 278,
      height: 125,
    },
  },
  textBlockPadding: {
    mobile: [10, 0, 10, 12],
    tablet: [11, 11, 11, 11],
    desktop: [11, 14, 11, 14],
  },
  postBoxPadding: {
    mobile: [12, 5],
  },
}

const PostBox = styled(Link)`
  display: flex;
  ${mq.mobileOnly`
    padding: ${arrayToCssShorthand(styles.postBoxPadding.mobile)};
    width: 100%;
  `}
  ${mq.tabletOnly`
    width: ${styles.imgLandscape.tablet.width}px;
  `}
  ${mq.desktopAndAbove`
    width: ${styles.imgLandscape.desktop.width}px;
  `}
  ${mq.tabletAndAbove`
    border: solid .5px ${color.gray};
    overflow: hidden;
    flex-direction: column;
  `}
  ${resetLinkStyle}
  ${linkHoverFadeOut}
`

const PostImage = styled.div`
  width: ${styles.imgLandscape.mobile.width}px;
  order: 1;
  ${mq.tabletAndAbove`
    width: ${styles.imgLandscape.tablet.width}px;
    order: 2;
  `}
  flex: 0 0 auto;
  > div {
    width: ${styles.imgLandscape.mobile.width}px;
    height: ${styles.imgLandscape.mobile.height}px;
    ${mq.tabletOnly`
      width: ${styles.imgLandscape.tablet.width}px;
      height: ${styles.imgLandscape.tablet.height}px;
    `}
    ${mq.desktopAndAbove`
      width: ${styles.imgLandscape.desktop.width}px;
      height: ${styles.imgLandscape.desktop.height}px;
    `}
  }
`
const PostText = styled.div`
  color: ${color.darkGray};
  font-weight: ${font.weight.bold};
  font-family: ${font.family.title};
  font-size: 16px;
  line-height: 1.5;
  flex: 1 1 auto;
  white-space: normal;
  order: 2;
  ${mq.tabletAndAbove`
    order: 1;
  `}
  padding: ${arrayToCssShorthand(styles.textBlockPadding.mobile)};
  ${mq.tabletOnly`
    padding: ${arrayToCssShorthand(styles.textBlockPadding.tablet)};
    line-height: 1.33;
  `}
  ${mq.desktopAndAbove`
    padding: ${arrayToCssShorthand(styles.textBlockPadding.desktop)};
    line-height: 1.25;
  `}
`

class PostItem extends PureComponent {
  render() {
    const { title, imgUrl, linkTo, linkTarget } = this.props
    return (
      <PostBox to={linkTo} target={linkTarget}>
        <PostImage>
          <div>
            <Image src={imgUrl} alt={title} />
          </div>
        </PostImage>
        <PostText>{title}</PostText>
      </PostBox>
    )
  }
}

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkTarget: PropTypes.oneOf(['_blank']),
}

PostItem.defaultProps = {
  linkTarget: null,
}

export default PostItem
