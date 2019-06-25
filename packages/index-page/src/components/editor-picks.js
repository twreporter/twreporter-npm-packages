/* eslint-disable no-param-reassign */
import CategoryName from './common-utils/category-name'
import ContentWrapper from './common-utils/section-content-wrapper'
import EditorPicksMobile from './editor-picks-mobile'
import ImgWrapper from './common-utils/img-wrapper'
import LeftArrowIcon from '../static/left-arrow.svg'
import PropTypes from 'prop-types'
import React from 'react'
import RightArrowIcon from '../static/right-arrow.svg'
import TRLink from './common-utils/twreporter-link'
import clone from 'lodash/clone'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import styled from 'styled-components'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import { getHref } from '../utils/getHref'
import { truncate, breakPoints, finalMedia } from '../utils/style-utils'

const mockup = {
  img: {
    sizes: {
      desktop: '886px',
      tablet: '450px',
      mobile: '307px',
    },
  },
}

const _ = {
  get,
  clone,
}

const swapArrayElements = (arr, indexA, indexB) => {
  if (Array.isArray(arr) && arr.length > 2) {
    const newArr = _.clone(arr)
    const tmp = newArr[indexA]
    newArr[indexA] = newArr[indexB]
    newArr[indexB] = tmp
    return newArr
  }
  return arr
}

const CarouselContainer = styled(ContentWrapper)`
  overflow-x: hidden;
  position: relative;
  @media (max-width: ${breakPoints.mobileMaxWidth}) {
    display: none;
  }
`

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  height: 932px;
  align-items: center;
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    height: 702px;
  }
`

// FlexItem is for moving Title
const FlexItem = styled.div`
  flex: 0 0 20%;
  margin-right: 20%;
  position: relative;
  transform: ${props =>
    props.selected !== 0
      ? `translateX(-${(props.selected - 1) * 200}%)`
      : 'translateX(200%)'};
  transition: 500ms transform ease-in, 500ms margin-top ease-in;
  cursor: pointer;
  margin-top: ${props => (props.middle ? '-770px' : '16px')};
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    margin-top: ${props => (props.middle ? '-540px' : '16px')};
  }
  z-index: 2;
`

const ImgFrame = styled.div`
  cursor: pointer;
  position: absolute;
  width: 886px;
  height: 570px;
  left: 50%;
  top: 236px;
  transform: translateX(-50%);
  ${finalMedia.desktop`
    width: 610px;
    height: 391px;
  `}
  ${finalMedia.tablet`
    width: 450px;
    height: 295px;
  `}
`

const Arrow = styled.div`
  cursor: pointer;
  position: absolute;
  top: 480px;
`

// top: sideCategory + 27px
const LeftArrow = styled(Arrow)`
  left: 17%;
  display: ${props => (props.selected === 0 ? 'none' : 'inline')};
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    top: 365px;
  }
  transition: 0.2s display linear;
`
const RightArrow = styled(Arrow)`
  right: 17%;
  display: ${props =>
    props.selected === props.dataLength - 1 ? 'none' : 'inline'};
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    top: 365px;
  }
  transition: 0.2s display linear;
`

const SideCategory = styled(CategoryName)`
  text-align: center;
  height: 16px;
  line-height: 1.33;
  position: absolute;
  width: auto;
  transform: translateX(-50%);
  text-align: center;
  width: 161px;
  height: 16px;
  top: 453px;
  left: ${props => (props.left ? props.left : '0')};
  @media (max-width: ${breakPoints.desktopMaxWidth}) {
    top: 338px;
  }
`

const MiddleCategory = styled(CategoryName)`
  text-align: center;
  height: 16px;
  line-height: 1.33;
  position: absolute;
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
  width: auto;
  transform: translateX(-50%);
  text-align: center;
  width: 161px;
  height: 16px;
`

const Title = styled.div`
  font-size: ${props => (props.middle ? `32px` : `16px`)};
  font-weight: ${fontWeight.bold};
  color: #4a4949;
  width: ${props => (props.middle ? '450px' : '150px')};
  position: absolute;
  text-align: center;
  line-height: ${props => (props.middle ? '1.25' : '1.25')};
  max-height: ${props => (props.middle ? '2.5' : '7.5')};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  ${finalMedia.desktop`
    width: ${props => (props.middle ? '450px' : '120px')};
  `}
  ${finalMedia.tabletBelow`
    width: ${props => (props.middle ? '450px' : '90px')};
  `}
`
const Description = styled.div`
  position: absolute;
  font-size: 16px;
  width: 450px;
  top: ${props => (props.top ? props.top : '0')};
  left: ${props => (props.left ? props.left : '0')};
  color: #4a4949;
  transform: translateX(-50%);
  ${truncate('absolute', 1.43, 2, 'white')};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    ${props => (props.ifHover ? 'opacity: 0.7;' : '')}
    transition: .2s opacity linear;
  }
  z-index: 2;
`

const HoverEffect = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: #4a4949;
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    ${props => (props.ifHover ? 'opacity: 0.7;' : 'opacity: 1;')}
    transition: .2s opacity linear;
  }
`
const FadeInFadeOut = styled.div`
  opacity: ${props => (props.isSelected ? '1' : '0')};
  z-index: ${props => (props.isSelected ? '1' : '0')};
  transition: 0.5s opacity linear;
`

// this is a container
class EditorPicks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 1,
      ifHover: false,
    }
    this.onShiftToLeft = this._onShiftToLeft.bind(this)
    this.onShiftToRight = this._onShiftToRight.bind(this)
    this.handleOnMouseEnter = this._handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this._handleOnMouseLeave.bind(this)
  }

  _onShiftToLeft() {
    if (this.state.selected + 1 < this.props.data.length) {
      this.setState({
        selected: this.state.selected + 1,
      })
    }
  }

  _onShiftToRight() {
    if (this.state.selected > 0) {
      this.setState({
        selected: this.state.selected - 1,
      })
    }
  }

  _handleOnMouseEnter() {
    this.setState({
      ifHover: true,
    })
  }

  _handleOnMouseLeave() {
    this.setState({
      ifHover: false,
    })
  }

  render() {
    const { data } = this.props
    const swappedData = swapArrayElements(data, 0, 1)
    const getTruncate = title => {
      if (title.length > 25) {
        return `${title.slice(0, 24)}...`
      }
      return title
    }
    const FlexItems = (() => {
      return swappedData.map((obj, i) => {
        const style = _.get(obj, 'style', '')
        const href = getHref(_.get(obj, 'slug', 'error'), style)
        const propsMap = {
          middle: false,
          onClick: () => {},
        }
        if (i === this.state.selected - 1) {
          propsMap.onClick = this.onShiftToRight
        } else if (i === this.state.selected) {
          propsMap.middle = true
          propsMap.onClick = () => {}
        } else if (i === this.state.selected + 1) {
          propsMap.onClick = this.onShiftToLeft
        }
        return (
          <FlexItem
            key={`key_${obj.title}`}
            middle={propsMap.middle}
            selected={this.state.selected}
            onClick={() => {
              propsMap.onClick(`a/${_.get(obj, 'slug', 'error')}`)
            }}
          >
            {i === this.state.selected ? (
              <TRLink href={href} redirect={style === 'interactive'} plain>
                <HoverEffect ifHover={this.state.ifHover}>
                  <Title
                    middle={propsMap.middle}
                    onMouseOver={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                  >
                    <div>
                      {propsMap.middle ? getTruncate(obj.title) : obj.title}
                    </div>
                  </Title>
                </HoverEffect>
              </TRLink>
            ) : (
              <Title middle={propsMap.middle}>
                <div>
                  {propsMap.middle ? getTruncate(obj.title) : obj.title}
                </div>
              </Title>
            )}
          </FlexItem>
        )
      })
    })()

    const Types = (() => {
      // type: left, middle, right. description: middle
      const propList = [
        {
          position: 'left',
          component: SideCategory,
          propsForComponent: { top: null, left: '10%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'middle',
          component: MiddleCategory,
          propsForComponent: { top: '60px', left: '50%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'right',
          middle: false,
          component: SideCategory,
          propsForComponent: { top: null, left: '90%' },
          dataPath: 'categories[0].name',
        },
        {
          position: 'middle',
          component: Description,
          propsForComponent: { top: '171px', left: '50%' },
          dataPath: 'og_description',
        },
      ]

      return propList.map(theProp => {
        return swappedData.map((post, index) => {
          const style = _.get(post, 'style', '')
          const href = getHref(_.get(post, 'slug', 'error'), style)
          const currentData = _.get(post, theProp.dataPath, '')
          const selectDataToShow = {
            left: this.state.selected - 1,
            middle: this.state.selected,
            right: this.state.selected + 1,
          }
          const fadingStyle = {
            opacity: index === selectDataToShow[theProp.position] ? '1' : '0',
            zIndex: index === selectDataToShow[theProp.position] ? '1' : '0',
            transition: 'opacity .5s linear',
          }
          return (
            <FadeInFadeOut
              key={_.get(post, 'id')}
              isSelected={index === selectDataToShow[theProp.position]}
            >
              {theProp.dataPath === 'og_description' ? (
                <TRLink href={href} redirect={style === 'interactive'} plain>
                  <theProp.component
                    ifHover={this.state.ifHover}
                    top={theProp.propsForComponent.top}
                    left={theProp.propsForComponent.left}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                    // Adds fade-in fade-out inline style for IE and Edge
                    style={fadingStyle}
                  >
                    {currentData}
                  </theProp.component>
                </TRLink>
              ) : (
                <theProp.component
                  top={theProp.propsForComponent.top}
                  left={theProp.propsForComponent.left}
                  // Adds fade-in fade-out inline style for IE and Edge
                  style={fadingStyle}
                >
                  {currentData}
                </theProp.component>
              )}
            </FadeInFadeOut>
          )
        })
      })
    })()

    const Images = swappedData.map((post, index) => {
      const heroImg = _.get(post, 'hero_image')
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      const fadingStyle = {
        opacity: this.state.selected === index ? '1' : '0',
        zIndex: this.state.selected === index ? '1' : '0',
        transition: 'opacity .5s linear',
      }
      return (
        <FadeInFadeOut
          key={_.get(heroImg, 'id')}
          isSelected={index === this.state.selected}
        >
          <TRLink href={href} redirect={style === 'interactive'} plain>
            <HoverEffect ifHover={this.state.ifHover}>
              <ImgFrame
                onMouseEnter={this.handleOnMouseEnter}
                onMouseLeave={this.handleOnMouseLeave}
                // Adds fade-in fade-out inline style for IE and Edge
                style={fadingStyle}
              >
                <ImgWrapper
                  alt={_.get(heroImg, 'description')}
                  src={_.get(heroImg, 'resized_targets.tablet.url')}
                  srcSet={_.get(heroImg, 'resized_targets', '')}
                  sizes={
                    `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                    `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                    `${mockup.img.sizes.mobile}`
                  }
                />
              </ImgFrame>
            </HoverEffect>
          </TRLink>
        </FadeInFadeOut>
      )
    })

    const Arrows = (() => {
      return (
        <div>
          <LeftArrow
            onClick={this.onShiftToRight}
            selected={this.state.selected}
          >
            <LeftArrowIcon />
          </LeftArrow>
          <RightArrow
            onClick={this.onShiftToLeft}
            selected={this.state.selected}
            dataLength={this.props.data.length}
          >
            <RightArrowIcon />
          </RightArrow>
        </div>
      )
    })()

    return (
      <div>
        <CarouselContainer>
          <FlexContainer>
            {Types}
            {Arrows}
            {Images}
            {FlexItems}
          </FlexContainer>
        </CarouselContainer>
        <EditorPicksMobile data={this.props.data} maxSwipableItems={5} />
      </div>
    )
  }
}

EditorPicks.defaultProps = {
  data: [],
}

EditorPicks.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
}

export default EditorPicks
