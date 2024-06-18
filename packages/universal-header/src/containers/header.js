import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import HeaderContext from '../contexts/header-context'
// constant
import { CONTEXT_PROP } from '../constants/prop-types'
// Header
import Header from '../components/header'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const HIDE_HEADER_THRESHOLD = 8
const TRANSFORM_HEADER_THRESHOLD = 40
const TRANSFORM_TIMEOUT = 800

const Container = ({
  releaseBranch,
  isLinkExternal,
  theme,
  pathname,
  referrerPath,
  hamburgerContext,
}) => {
  const [toUseNarrow, setToUseNarrow] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  const isAuthed = useSelector(state => _.get(state, 'auth.isAuthed', false))

  const lastKnownPageYOffset = useRef(0)
  const ticking = useRef(false)
  const currentY = useRef(0)
  const readyY = useRef(0)
  const isTransforming = useRef(false)
  const transformTimer = useRef(null)

  const handleScroll = useCallback(() => {
    lastKnownPageYOffset.current = window.pageYOffset
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        updateScrollState(lastKnownPageYOffset.current)
        ticking.current = false
      })
      ticking.current = true
    }
  }, [])

  const updateScrollState = useCallback(currentScrollTop => {
    const scrollDirection = currentScrollTop > currentY.current ? 'down' : 'up'
    currentY.current = currentScrollTop
    const updateState = getScrollState(currentScrollTop, scrollDirection)
    setToUseNarrow(updateState.toUseNarrow)
    setHideHeader(updateState.hideHeader)
  }, [])

  const getScrollState = useCallback(
    (scrollTop, scrollDirection) => {
      const isCurrentNarrow = toUseNarrow
      const nextToUseNarrow = scrollTop > TRANSFORM_HEADER_THRESHOLD
      let scrollState = {}

      if (isTransforming.current) {
        return scrollState
      }

      if (scrollDirection === 'up') {
        readyY.current = scrollTop
        scrollState.hideHeader = false
      }

      if (scrollDirection === 'down') {
        if (
          isCurrentNarrow &&
          scrollTop - readyY.current > HIDE_HEADER_THRESHOLD
        ) {
          scrollState.hideHeader = true
        }
      }

      if (isCurrentNarrow) {
        scrollState.toUseNarrow =
          scrollDirection === 'down' ? true : nextToUseNarrow
      } else {
        scrollState.toUseNarrow =
          scrollDirection === 'up' ? false : nextToUseNarrow
      }

      if (isCurrentNarrow !== scrollState.toUseNarrow) {
        if (!transformTimer.current) {
          isTransforming.current = true
          transformTimer.current = setTimeout(() => {
            isTransforming.current = false
            readyY.current = currentY.current
            transformTimer.current = null
          }, TRANSFORM_TIMEOUT)
        }
      }

      return scrollState
    },
    [toUseNarrow]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const contextValue = {
    releaseBranch,
    isAuthed,
    isLinkExternal,
    theme,
    pathname,
    referrerPath,
    toUseNarrow,
    hideHeader,
  }

  return (
    <HeaderContext.Provider value={contextValue}>
      <Header hamburgerContext={hamburgerContext} />
    </HeaderContext.Provider>
  )
}

Container.propTypes = {
  ...CONTEXT_PROP.propTypes,
}

export default Container
