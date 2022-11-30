import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// component
import { H1 } from '../../text/headline'
import { TextButton } from '../../button'
import Divider from '../../divider'
import CustomizedLink from '../../customized-link'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

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
  color: ${colorGrayscale.gray800};
`

const TabItemContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-right: 24px;
  &:last-child {
    margin-right: 0;
  }
  a {
    text-decoration: none;
  }
`

const StyledTextButton = styled(TextButton)`
  padding: 16px 0;
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
`

const TabItem = ({ tab = {}, ...restProps }) => {
  const { text, link, isExternal, isActive } = tab
  return (
    <TabItemContainer {...restProps}>
      <CustomizedLink to={link} isExternal={isExternal}>
        <StyledTextButton text={text} active={isActive} size="L" />
      </CustomizedLink>
    </TabItemContainer>
  )
}
TabItem.propTypes = {
  tab: tabPropType,
}

const useScrollStatus = setShowNext => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current.scrollWidth > ref.current.clientWidth) {
      // scrollbar occur
      setShowNext(true)
    }
  }, [ref, setShowNext])

  useEffect(() => {
    const refEle = ref.current
    const handleScroll = event => {
      if (refEle.offsetWidth + refEle.scrollLeft >= refEle.scrollWidth) {
        // scroll to end
        setShowNext(false)
      } else {
        setShowNext(true)
      }
    }

    refEle.addEventListener('scroll', handleScroll)

    return () => {
      refEle.removeEventListener('scroll', handleScroll)
    }
  }, [ref, setShowNext])

  return ref
}

const MobileTab = ({ tabs = [], activeTabIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex)
  const [showGradientMask, setShowGradientMask] = useState(false)
  const ref = useScrollStatus(setShowGradientMask)
  const tabJSX = tabs.map((tab, index) => {
    tab.isActive = index === activeIndex
    const handleClick = () => {
      setActiveIndex(index)
    }
    return <TabItem key={index} tab={tab} onClick={handleClick} />
  })
  useEffect(() => {
    setActiveIndex(activeTabIndex)
  }, [activeTabIndex])

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
