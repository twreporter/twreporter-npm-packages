import Img from '../img-with-placeholder'
import React from 'react'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/related'
import styled from 'styled-components'
import typography from '../../constants/typography'

const mockup = {
  mobile: {
    thumbnail: {
      width: 88, // px
      height: 68, // px
    },
  },
  tablet: {
    thumbnail: {
      width: 88, // px
      height: 68, // px
    },
  },
  desktop: {
    thumbnail: {
      width: 246, // px
      height: 148, // px
    },
  },
  hd: {
    thumbnail: {
      width: 349, // px
      height: 148, // px
    },
  },
}

const DescBlock = styled.div`
  position: relative;

  ${mq.tabletAndBelow`
    display: none;
  `}
`

const Desc = styled.p`
  visibility: ${props => props._visibility};
  position: ${props => props._position};

  /* clear default margin */
  margin: 0px;
  width: 100%;
  display: block;
  font-size: 14px;
  line-height: 1.43;
  color: #808080;
  padding: 15px 0 15px 0;
`

const Block = styled.article`
  position: relative;
  height: ${props => props._height};

  transition: height 0.1s ease-in-out;

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
  padding: 15px 19px 15px 0px;

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
  color: ${props => props.theme.colors.primary.accent};
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
  line-height: 1.5;
  color: ${props => props.theme.colors.base.text};
  margin: 10px 0 10px 0;

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
  color: #afafaf;

  ${mq.tabletAndBelow`
    order: 3;
  `}
`

const _defaultHeight = '100%'

class Card extends React.PureComponent {
  static propTypes = predefinedProps.card

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
      this.setState({
        heightBeforeHovering: `${this._blockRef.current.clientHeight}px`,
        heightAfterHovering: `${this._blockRef.current.clientHeight +
          this._descRef.current.clientHeight}px`,
      })
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
    const { category, title, desc, date, thumbnail } = this.props
    const localeDate = date
      ? new Date(date).toLocaleString('zh-hant', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      : ''

    const { heightBeforeHovering, heightAfterHovering, isHovered } = this.state

    const categoryJSX = category ? <Category>{category}</Category> : null
    const titleJSX = title ? <Title>{title}</Title> : null
    const localeDateJSX = localeDate ? (
      <PublishedDate>{localeDate}</PublishedDate>
    ) : null

    return (
      <Block
        ref={this._blockRef}
        _height={isHovered ? heightAfterHovering : heightBeforeHovering}
      >
        <Thumbnail>
          <Img
            defaultImage={thumbnail}
            objectFit="cover"
            objectPosition="center center"
          />
        </Thumbnail>
        <DesktopTextBlock
          onMouseEnter={this.handleMouseEnterTextBlock}
          onMouseLeave={this.handleMouseLeaveTextBlock}
        >
          {categoryJSX}
          {titleJSX}
          <DescBlock>
            <Desc
              ref={this._descRef}
              _visibility={isHovered ? 'visible' : 'hidden'}
              _position={isHovered ? 'static' : 'absolute'}
            >
              {desc}
            </Desc>
          </DescBlock>
          {localeDateJSX}
        </DesktopTextBlock>
        {/* render `MobileTextBlock` to prevent from re-rendering once hovering */}
        <MobileTextBlock>
          {categoryJSX}
          {titleJSX}
          {localeDateJSX}
        </MobileTextBlock>
      </Block>
    )
  }
}

export default Card
