import React, { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
// component
import { H1 } from '../../text/headline'
import { P1 } from '../../text/paragraph'
import { Arrow } from '../../icon'
import { IconButton } from '../../button'
import Divider from '../../divider'
import CustomizedLink from '../../customized-link'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { colorBrand } from '@twreporter/core/lib/constants/color'

// const
const gradientMask =
  'linear-gradient(to left, rgba(241, 241, 241, 0), #F1F1F1 48px)'
const tabPropType = PropTypes.shape({
  text: PropTypes.string,
  link: PropTypes.string,
  isExternal: PropTypes.boolean,
  isActive: PropTypes.boolean,
})

const BarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  & > div {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const DesktopOnly = styled.div`
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const MobileOnly = styled.div`
  ${mq.desktopAndAbove`
    display: none;
  `}
`

const TabItemContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  color: ${(props) => (props.isActive ? colorBrand.heavy : 'inherit')};
  a {
    color: unset;
    text-decoration: none;
  }
`

const MobileTabContainer = styled.div`
  display: flex;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-mask-image: ${(props) =>
    props.showGradientMask ? gradientMask : 'none'};
  & > div {
    margin-right: 24px;
  }
`

const DesktopTabContainer = styled.div`
  .react-horizontal-scrolling-menu--scroll-container {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .react-horizontal-scrolling-menu--item {
    display: flex;
    flex-shrink: 0;
    ${TabItemContainer} {
      margin-right: 24px;
    }
    &:last-child ${TabItemContainer} {
      margin-right: 0;
    }
  }
`

const ArrowContainer = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  visibility: ${(props) => (props.disabled ? 'hidden' : 'visible')};
  opacity: ${(props) => (props.disabled ? '0' : '1')};
  transition: visibility 0s opacity 0.5s linear;
`

const PrevArrowContainer = styled(ArrowContainer)`
  ${(props) => (props.disabled ? 'display: none;' : '')}
`

const TabItem = ({ tab = {}, ...restProps }) => {
  const { text, link, isExternal, isActive } = tab
  return (
    <TabItemContainer isActive={isActive} {...restProps}>
      <CustomizedLink to={link} isExternal={isExternal} target="_blank">
        <P1 text={text} weight="bold" />
      </CustomizedLink>
    </TabItemContainer>
  )
}
TabItem.propTypes = {
  tab: tabPropType,
}

const useScrollStatus = (onHasScroll, falseOnScrollEnd) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current.scrollWidth > ref.current.clientWidth) {
      onHasScroll(true)
    }
  }, [ref, onHasScroll])

  useEffect(() => {
    const handleScroll = (event) => {
      if (
        ref.current.offsetWidth + ref.current.scrollLeft >=
        ref.current.scrollWidth
      ) {
        falseOnScrollEnd(false)
      } else {
        falseOnScrollEnd(true)
      }
    }

    ref.current.addEventListener('scroll', handleScroll)

    return () => {
      ref.current.removeEventListener('scroll', handleScroll)
    }
  }, [ref, falseOnScrollEnd])

  return ref
}

const MobileTab = ({ tabs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showGradientMask, setShowGradientMask] = useState(false)
  const ref = useScrollStatus(setShowGradientMask, setShowGradientMask)
  const tabJSX = tabs.map((tab, index) => {
    tab.isActive = index === activeIndex
    const handleClick = () => {
      setActiveIndex(index)
    }
    return <TabItem key={index} tab={tab} onClick={handleClick} />
  })

  return (
    <MobileTabContainer ref={ref} showGradientMask={showGradientMask}>
      {tabJSX}
    </MobileTabContainer>
  )
}
MobileTab.propTypes = {
  tabs: PropTypes.arrayOf(tabPropType),
}

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext)
  const prev = () => scrollPrev()
  const iconComponent = <Arrow direction="left" />
  return (
    <PrevArrowContainer onClick={prev} disabled={isFirstItemVisible}>
      <IconButton iconComponent={iconComponent} />
    </PrevArrowContainer>
  )
}

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext)
  const next = () => {
    scrollNext()
  }
  const iconComponent = <Arrow direction="right" />
  return (
    <ArrowContainer onClick={next} disabled={isLastItemVisible}>
      <IconButton iconComponent={iconComponent} />
    </ArrowContainer>
  )
}

const DesktopTab = ({ tabs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabJSX = tabs.map((tab, index) => {
    const id = `tab-${index}`
    tab.isActive = index === activeIndex
    const handleClick = () => {
      setActiveIndex(index)
    }
    return (
      <TabItem
        key={index}
        id={id}
        itemId={id}
        tab={tab}
        onClick={handleClick}
      />
    )
  })
  // ease-out-quint
  const transitionEaseFunc = (t) => 1 - --t * t * t * t

  return (
    <DesktopTabContainer>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        transitionDuration="300"
        transitionEaseFunc={transitionEaseFunc}
      >
        {tabJSX}
      </ScrollMenu>
    </DesktopTabContainer>
  )
}
DesktopTab.propTypes = {
  tabs: PropTypes.arrayOf(tabPropType),
}

const TitleTab = ({ title = '', tabs = [] }) => (
  <BarContainer>
    <H1 text={title} />
    <MobileOnly>
      <MobileTab tabs={tabs} />
    </MobileOnly>
    <DesktopOnly>
      <DesktopTab tabs={tabs} />
    </DesktopOnly>
    <Divider direction="horizontal" />
  </BarContainer>
)
TitleTab.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(tabPropType),
}

export default TitleTab
