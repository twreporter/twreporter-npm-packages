import Img from '../img-with-placeholder'
import PropTypes from 'prop-types'
import mockup from './mockup'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/related'
import React from 'react'
import styled, { css } from 'styled-components'
import themeConsts from '../../constants/theme'
import typography from '../../constants/typography'
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'

const StyledImg = styled(Img)``

const DescBlock = styled.div`
  position: relative;

  ${mq.tabletAndBelow`
    display: none;
  `}
`

const Desc = styled.p`
  opacity: ${props => (props.isHovered ? '1' : '0')};
  visibility: ${props => (props.isHovered ? 'visible' : 'hidden')};
  position: ${props => (props.isHovered ? 'static' : 'absolute')};

  /* clear default margin */
  margin: 0px;
  width: 100%;
  display: block;
  font-size: 14px;
  line-height: 1.43;
  color: ${colorGrayscale.gray600};
  padding: 15px 0 15px 0;
  transition: opacity 200ms ease 100ms;
`

const Thumbnail = styled.figure`
  margin: 0;

  ${mq.tabletAndBelow`
    order: 2;
  `}

  ${mq.mobileOnly`
    width: ${mockup.mobile.thumbnail.width}px;
    height: ${mockup.mobile.thumbnail.height}px;
  `}

  ${mq.tabletOnly`
    width: ${mockup.tablet.thumbnail.width}px;
    height: ${mockup.tablet.thumbnail.height}px;
  `}

  ${mq.desktopOnly`
    width: 100%;
    height: ${mockup.desktop.thumbnail.height}px;
  `}

  ${mq.hdOnly`
    width: 100%;
    height: ${mockup.hd.thumbnail.height}px;
  `}
`

const DesktopTextBlock = styled.div`
  padding: 10px 19px 45px 5px;

  ${mq.tabletAndBelow`
    display: none;
  `}
`

const MobileTextBlock = styled.div`
  ${mq.tabletAndBelow`
    max-width: 62%;
    order: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
  `}

  ${mq.desktopAndAbove`
    display: none;
  `}
`

const Category = styled.span`
  font-size: 14px;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.43;
  margin-right: 10px;

  ${mq.tabletAndBelow`
    order: 1;
  `}
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: ${typography.font.weight.bold};
  font-family: ${typography.font.family.title};
  line-height: 1.5;
  margin: 5px 0 10px 0;

  ${mq.tabletAndBelow`
    order: 2;
    margin-bottom: 15px;
  `}
`

const PublishedDate = styled.p`
  /* clear default margin*/
  margin: 0;
  font-size: 12px;
  line-height: 2;
  color: ${colorGrayscale.gray500};

  ${mq.desktopAndAbove`
    position: absolute;
    left: 5px;
    bottom: 15px;
  `}

  ${mq.tabletAndBelow`
    order: 3;
  `}
`

const Block = styled.div`
  ${props => getBlockStyles(props.theme.name)}

  position: relative;
  height: ${props => props._height};

  transition: height 0.2s ease-in-out;

  ${mq.tabletAndBelow`
    height: auto;
    width: 100%;
    min-height: 152px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}

  ${mq.desktopOnly`
    width: ${mockup.desktop.thumbnail.width}px;
  `}

  ${mq.hdOnly`
    width: ${mockup.hd.thumbnail.width}px;
  `}
`

function getBlockStyles(themeName) {
  switch (themeName) {
    case themeConsts.article.v2.photo:
      return css`
        ${Category} {
          color: ${colorSupportive.main};
        }
        ${Title} {
          color: ${colorGrayscale.gray300};
        }
        ${StyledImg} {
          background-color: ${colorGrayscale.gray400};
        }
      `
    case themeConsts.article.v2.pink:
      return css`
        ${Category} {
          color: ${COLOR_PINK_ARTICLE.darkPink};
        }
        ${Title} {
          color: ${colorGrayscale.gray800};
        }
        ${StyledImg} {
          background-color: ${colorGrayscale.gray200};
        }
      `
    case themeConsts.article.v2.default:
    default:
      return css`
        ${Category} {
          color: ${colorSupportive.heavy};
        }
        ${Title} {
          color: ${colorGrayscale.gray800};
        }
        ${StyledImg} {
          background-color: ${colorGrayscale.gray200};
        }
      `
  }
}

const _defaultHeight = '100%'

class Card extends React.PureComponent {
  static propTypes = {
    ...predefinedProps.card,
    handleMounted: PropTypes.func,
  }

  static defaultProps = {
    handleMounted: () => {},
  }

  constructor(props) {
    super(props)

    //  state.heightBeforeHovering,
    //  state.heightAfterHovering,
    //  _blockRef,
    //  _descRef,
    //  are used for computing Card animation details,
    //  only for desktop and above layout
    this.state = {
      heightBeforeHovering: _defaultHeight,
      heightAfterHovering: _defaultHeight,

      // only desktop and above layout will take
      // `isHovered` into account.
      // mobile layout won't have the on-hover animation
      isHovered: false,
    }
    this._blockRef = React.createRef()
    this._descRef = React.createRef()

    this.handleMouseEnterTextBlock = this._handleIsHovered.bind(this, true)
    this.handleMouseLeaveTextBlock = this._handleIsHovered.bind(this, false)
  }

  componentDidMount() {
    try {
      this.setState(
        {
          heightBeforeHovering: `${this._blockRef.current.clientHeight}px`,
          heightAfterHovering: `${this._blockRef.current.clientHeight +
            this._descRef.current.clientHeight}px`,
        },
        this.props.handleMounted()
      )
    } catch (e) {
      const { title } = this.props
      console.warn(
        'cannot set state.heightBeforeHovering and state.heightAfterHovering ' +
          'after componentDidMount on related post with title: ' +
          title
      )
    }
  }

  _handleIsHovered(isHovered) {
    this.setState({
      isHovered,
    })
  }

  render() {
    const { category, title, desc, publishedDate, thumbnail } = this.props

    let dateStr = ''

    if (publishedDate) {
      const date = new Date(publishedDate)
      dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }

    const { heightBeforeHovering, heightAfterHovering, isHovered } = this.state

    const categoryJSX = category ? <Category>{category}</Category> : null
    const titleJSX = title ? <Title>{title}</Title> : null
    const dateJSX = dateStr ? <PublishedDate>{dateStr}</PublishedDate> : null

    return (
      <Block
        ref={this._blockRef}
        _height={isHovered ? heightAfterHovering : heightBeforeHovering}
      >
        <Thumbnail>
          <StyledImg
            defaultImage={thumbnail}
            objectFit="cover"
            objectPosition="center center"
            noImgPlaceholder
          />
        </Thumbnail>
        <DesktopTextBlock
          onMouseEnter={this.handleMouseEnterTextBlock}
          onMouseLeave={this.handleMouseLeaveTextBlock}
        >
          {categoryJSX}
          {titleJSX}
          <DescBlock>
            <Desc ref={this._descRef} isHovered={isHovered}>
              {desc}
            </Desc>
          </DescBlock>
          {dateJSX}
        </DesktopTextBlock>
        {/* render `MobileTextBlock` to prevent from re-rendering once hovering */}
        <MobileTextBlock>
          {categoryJSX}
          {titleJSX}
          {dateJSX}
        </MobileTextBlock>
      </Block>
    )
  }
}

export default Card
