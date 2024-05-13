import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
// components
import Image from '../image'
// constants
import {
  linkHoverFadeOut,
  resetLinkStyle,
} from '../../constants/predefined-css'
import { TEXT } from '../../constants/topics'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const styles = {
  imgPortrait: {
    mobile: {
      width: 150,
      height: 200,
    },
    tablet: {
      width: 164,
      height: 206,
    },
  },
  topicBox: {
    mobile: {
      marginBottom: 35,
    },
    tablet: {
      marginBottom: 35,
    },
    desktop: {
      marginBottom: 45,
    },
  },
  textBlock: {
    mobile: {
      paddingLeft: 15,
      titleMarginBottom: 14,
    },
    tablet: {
      paddingLeft: 19,
      paddingBottom: 8,
    },
    desktop: {
      paddingLeft: 26,
      paddingBottom: 8,
    },
  },
  fontSize: {
    title: {
      mobile: 23,
      tablet: 30,
      desktop: 34,
    },
  },
}

const StyledLink = styled(Link)`
  ${resetLinkStyle}
`

const TopicBox = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
`

const ItemContainer = styled.div`
  margin-bottom: ${(props) =>
    !props.$isTop
      ? `${styles.topicBox.mobile.marginBottom}px`
      : `${styles.topicBox.mobile.marginBottom - 10}px`};
  ${mq.tabletOnly`
    margin-bottom: ${(props) =>
      !props.$isTop
        ? `${styles.topicBox.tablet.marginBottom}px`
        : `${styles.topicBox.tablet.marginBottom - 10}px`};
  `}
  ${mq.desktopAndAbove`
    margin-bottom: ${(props) =>
      !props.$isTop
        ? `${styles.topicBox.desktop.marginBottom}px`
        : `${styles.topicBox.desktop.marginBottom - 10}px`};
  `}
  width: 100%;
  ${linkHoverFadeOut}
`

const ImageBlock = styled.div`
  width: ${styles.imgPortrait.mobile.width}px;
  ${mq.tabletAndAbove`
    width: ${styles.imgPortrait.tablet.width}px;
  `}
  flex: 0 0 auto;
  > div {
    width: ${styles.imgPortrait.mobile.width}px;
    height: ${styles.imgPortrait.mobile.height}px;
    ${mq.tabletAndAbove`
      width: ${styles.imgPortrait.tablet.width}px;
      height: ${styles.imgPortrait.tablet.height}px;
    `}
  }
`

const TextBlock = styled.div`
  padding-left: ${styles.textBlock.mobile.paddingLeft}px;
  ${mq.tabletOnly`
    padding-left: ${styles.textBlock.tablet.paddingLeft}px;
    padding-bottom: ${styles.textBlock.tablet.paddingBottom}px;
  `}
  ${mq.desktopAndAbove`
    padding-left: ${styles.textBlock.desktop.paddingLeft}px;
    padding-bottom: ${styles.textBlock.desktop.paddingBottom}px;
  `}
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  color: ${colorGrayscale.gray900};
`

const TopicTitle = styled.h2`
  margin: 0;
  ${mq.mobileOnly`
    margin-bottom: ${styles.textBlock.mobile.titleMarginBottom}px;
  `}
  font-size: ${styles.fontSize.title.mobile}px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  letter-spacing: 0.2px;
  line-height: 1.43;
  ${mq.tabletOnly`
    font-size: ${styles.fontSize.title.tablet}px;
  `}
  ${mq.desktopAndAbove`
    font-size: ${styles.fontSize.title.desktop}px;
  `}
`

const TopicDate = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  ${mq.tabletOnly`
    padding-top: 12px;
    padding-bottom: 12px;
  `}
  font-size: 14px;
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.5px;
`
const TopicDescription = styled.div`
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 1.56;
  text-align: justify;
`

const DesktopDescription = styled(TopicDescription)`
  ${mq.mobileOnly`
    display: none;
  `}
`

const MobileDescription = styled(TopicDescription)`
  display: none;
  ${mq.mobileOnly`
    display: block;
    margin-top: 12px;
  `}
`

class TopicItem extends PureComponent {
  render() {
    const { title, updatedAt, description, imgUrl, imgAlt, linkTo, isTop } =
      this.props
    return (
      <StyledLink to={linkTo}>
        <ItemContainer $isTop={isTop}>
          <TopicBox>
            <ImageBlock>
              <div>
                <Image src={imgUrl} alt={imgAlt} />
              </div>
            </ImageBlock>
            <TextBlock>
              <TopicTitle>{title}</TopicTitle>
              <TopicDate>{`${TEXT.LAST_UPDATED} ${updatedAt}`}</TopicDate>
              <DesktopDescription>{description}</DesktopDescription>
            </TextBlock>
          </TopicBox>
          <MobileDescription>{description}</MobileDescription>
        </ItemContainer>
      </StyledLink>
    )
  }
}

TopicItem.propTypes = {
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  isTop: PropTypes.bool,
}

TopicItem.defaultProps = {
  isTop: false,
}

export default TopicItem
