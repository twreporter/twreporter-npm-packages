import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import { H1 } from '../../text/headline'
import { P1 } from '../../text/paragraph'
import Divider from '../../divider'
import CustomizedLink from '../../customized-link'
// @twreporter
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

const TabItemContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  color: ${props => (props.isActive ? colorBrand.heavy : 'inherit')};
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
  -webkit-mask-image: ${props =>
    props.showGradientMask ? gradientMask : 'none'};
  & > div {
    margin-right: 24px;
  }
`

const TabItem = ({ tab = {}, ...restProps }) => {
  const { text, link, isExternal, isActive } = tab
  return (
    <TabItemContainer isActive={isActive} {...restProps}>
      <CustomizedLink to={link} isExternal={isExternal}>
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
    const refEle = ref.current
    const handleScroll = event => {
      if (refEle.offsetWidth + refEle.scrollLeft >= refEle.scrollWidth) {
        falseOnScrollEnd(false)
      } else {
        falseOnScrollEnd(true)
      }
    }

    refEle.addEventListener('scroll', handleScroll)

    return () => {
      refEle.removeEventListener('scroll', handleScroll)
    }
  }, [ref, falseOnScrollEnd])

  return ref
}

const MobileTab = ({ tabs = [], activeTabIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex)
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
  activeTabIndex: PropTypes.number,
}

const TitleTab = ({ title = '', tabs = [], activeTabIndex = 0 }) => (
  <BarContainer>
    <H1 text={title} />
    <MobileTab tabs={tabs} activeTabIndex={activeTabIndex} />
    <Divider direction="horizontal" />
  </BarContainer>
)
TitleTab.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(tabPropType),
  activeTabIndex: PropTypes.number,
}

export default TitleTab
