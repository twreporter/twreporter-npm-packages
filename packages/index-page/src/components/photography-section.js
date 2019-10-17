import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import PropTypes from 'prop-types'
import React from 'react'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import { Waypoint } from 'react-waypoint'
import categoryStrings from '../constants/category-strings'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
import { breakPoints, finalMedia } from '../utils/style-utils'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import { getHref } from '../utils/getHref'

const _ = {
  get,
}

const mockup = {
  img: {
    sizes: {
      desktop: '672px',
      tablet: '350px',
      mobile: '414px',
    },
  },
}

// If window is less than oneColumnWidth,
// there will be only one column. Default is two columns.
const oneColumnWidth = breakPoints.mobileMaxWidth
const oneColumnWidthInt = 768

const Section = styled.div`
  position: relative;
  background-color: ${props => {
    return props.isAutoHover ? '#fff' : '#08192d'
  }};
  padding-bottom: ${props => {
    return props.isAutoHover ? '40px' : '80px'
  }};
  padding-top: 100px;

  ${finalMedia.mobile`
    padding-top: 0px;
  `}
`

const Listing = styled.ul`
  padding-left: 0px;
  max-width: 1344px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 60px;

  ${finalMedia.desktop`
    max-width: 928px;
  `}

  ${finalMedia.tablet`
    max-width: 700px;
  `}

  ${finalMedia.mobile`
    padding-top: 0px;
    padding-bottom: 40px;
    max-width: 100%;
  `}
`

const Item = styled.li`
  max-width: 672px;
  display: inline-block;
  vertical-align: bottom;

  ${finalMedia.desktop`
    max-width: 464px;
  `}

  ${finalMedia.tablet`
    max-width: 349px;
  `}

  ${finalMedia.mobile`
    max-width: 100%;
    width: 100%;
    height: 100%;
    display: block;
  `}
`
const Title = styled.div`
  position: absolute;
  color: #fff;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.5;
  text-align: justify;
  font-weight: ${fontWeight.normal};
`

const Img = styled.div`
  position: relative;
  width: 672px;
  height: 450px;

  ${finalMedia.desktop`
    width: 464px;
    height: 310px;
  `}

  ${finalMedia.tablet`
    margin: 0 auto;
    width: 350px;
    height: 234px;
  `}

  ${finalMedia.mobile`
    width: 100%;
    height: 100%;
  `}
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: ${props => {
    return props.isHover ? 1 : 0
  }};
  transition: 0.5s ease;
  background-color: rgba(21, 54, 84, 0.7);

  @media (min-width: ${oneColumnWidth}) {
    &:hover {
      opacity: 1;
    }
  }
`

const More = styled.div`
  text-align: center;
`

class Photography extends React.PureComponent {
  render() {
    const { title, imgObj, isHover, slug, style } = this.props
    const href = getHref(slug, style)
    return (
      <Item>
        <TRLink href={href} redirect={style === 'interactive'}>
          <Img>
            <ImgWrapper
              alt={imgObj.alt}
              src={imgObj.src}
              srcSet={imgObj.srcSet}
              sizes={
                `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                `${mockup.img.sizes.mobile}`
              }
            >
              <Overlay isHover={isHover}>
                <Title>
                  <CategoryName>{categoryStrings.photography}</CategoryName>
                  {title}
                </Title>
              </Overlay>
            </ImgWrapper>
          </Img>
        </TRLink>
      </Item>
    )
  }
}

Photography.defaultProps = {
  title: '',
  imgObj: {},
  isHover: false,
  slug: '',
  style: '',
}

Photography.propTypes = {
  title: PropTypes.string,
  imgObj: PropTypes.object,
  isHover: PropTypes.bool,
  slug: PropTypes.string,
  style: PropTypes.string,
}

class PhotographySection extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      eleTouchViewportTop: -1,
      // when the width size is less than oneColumnWidth,
      // we assume the device is mobile,
      // so enable auto hovering.
      isAutoHover: false,
    }
    this.itemsToShow = 4
    this.onLeave = this._onElementTouchViewportTop.bind(this, -1)
    this.onEnters = []
    this.onEnter = this._onElementTouchViewportTop.bind(this)
    this._mounted = false
  }

  componentDidMount() {
    this._mounted = true
    // fetch the posts in advance
    const _checkViewportWidth = this._checkViewportWidth.bind(this)
    _checkViewportWidth()
    let resizeTimeout
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          _checkViewportWidth()
          // The _checkViewportWidth will execute at a rate of 15fps
        }, 500)
      }
    }

    // add resize event listener
    window.addEventListener('resize', resizeThrottler.bind(this), false)
  }

  componentWillUnmount() {
    this._mounted = false
  }

  _checkViewportWidth() {
    const innerW = _.get(window, 'innerWidth', oneColumnWidthInt)
    if (this._mounted) {
      this.setState({
        isAutoHover: innerW < oneColumnWidthInt,
      })
    }
  }

  _onElementTouchViewportTop(index) {
    if (this.state.isAutoHover) {
      this.setState({
        eleTouchViewportTop: index,
      })
    }
  }

  render() {
    const { data, moreURI, useTinyImg } = this.props
    const { eleTouchViewportTop, isAutoHover } = this.state

    const postComps = data.slice(0, this.itemsToShow).map((item, index) => {
      const imgObj = _.get(item, 'hero_image') || _.get(item, 'og_image')
      let isHover = false
      if (isAutoHover) {
        isHover = eleTouchViewportTop === index
      }
      return (
        <Waypoint
          key={_.get(item, 'id')}
          onEnter={() => {
            this.onEnter(index)
          }}
          topOffset="8%"
          bottomOffset="90%"
        >
          <span>
            <Photography
              title={_.get(item, 'title')}
              imgObj={{
                alt: _.get(imgObj, 'description'),
                src: _.get(imgObj, [
                  'resized_targets',
                  useTinyImg ? 'tiny' : 'tablet',
                  'url',
                ]),
                srcSet: _.get(imgObj, 'resized_targets'),
              }}
              isHover={isHover}
              slug={_.get(item, 'slug')}
              style={_.get(item, 'style', '')}
              ifSrcset={this.state.ifSrcset}
            />
          </span>
        </Waypoint>
      )
    }, this)

    return (
      <Waypoint key={'section_check_point'} onLeave={this.onLeave}>
        <div>
          <Section isAutoHover={isAutoHover}>
            <SectionName mobileWidth={`${oneColumnWidth}`}>
              <span>{sectionStrings.photography}</span>
            </SectionName>
            <Listing>{postComps}</Listing>
            <More>
              <BottomLink text="更多影像新聞" isDarkBg path={moreURI} />
            </More>
          </Section>
        </div>
      </Waypoint>
    )
  }
}

PhotographySection.defaultProps = {
  data: [],
  moreURI: 'photography',
  useTinyImg: false,
}

PhotographySection.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
  moreURI: PropTypes.string,
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(PhotographySection)
