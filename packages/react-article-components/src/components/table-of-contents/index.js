import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @twrreporters
import TOC from '@twreporter/react-components/lib/table-of-contents'
// constants
import {
  ANCHOR_SCROLL_DURATION,
  WAIT_AFTER_REACH_ANCHOR,
} from '../../constants/anchor'
// styled
import * as Styled from './styled'
import Tab from '../../assets/table-of-contents/long-form-tab.svg'
// lodash
import map from 'lodash/map'
import isNil from 'lodash/isNil'

const _ = {
  map,
  isNil,
}
const TableOfContents = ({
  className,
  manager,
  onStartScrollingToAnchor,
  onToggleTabExpanded,
  scrollStage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const tocRef = useRef(null)

  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)
  const handleTabClick = () => setIsExpanded(!isExpanded)

  const handleTouchOutside = e => {
    try {
      if (tocRef.current && !tocRef.current.contains(e.target) && isExpanded) {
        setIsExpanded(false)
      }
    } catch (error) {
      console.warn('TableOfContents#handleTouchOutside error:', error)
    }
  }

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchOutside, {
      passive: true,
      capture: true,
    })

    return () => {
      document.removeEventListener('touchstart', handleTouchOutside, {
        passive: true,
        capture: true,
      })
    }
  }, [isExpanded])

  const [scrollDirection, setScrollDirection] = useState('init')
  useEffect(() => {
    const threshold = 16
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      if (_.isNil(lastScrollY)) {
        ticking = false
        return
      }

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up'
      setScrollDirection(scrollDirection)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      lastScrollY = null
      ticking = null
    }
  }, [scrollDirection])

  useEffect(() => {
    onToggleTabExpanded(isExpanded)
  }, [isExpanded, onToggleTabExpanded])

  const hideTOC = scrollStage === 3
  return (
    <div className="hidden-print" ref={tocRef}>
      <TOC.React.TableOfContents
        className={className}
        manager={manager}
        scrollDuration={ANCHOR_SCROLL_DURATION}
        render={(anchors, highlightAnchor, handleAnchorClick) => {
          const anchorsJSX = _.map(anchors, anchor => {
            const toHighlight = anchor === highlightAnchor

            return (
              <Styled.TOCRow
                key={anchor.anchorID}
                onClick={() => {
                  onStartScrollingToAnchor(true, () =>
                    handleAnchorClick(anchor.anchorID, () => {
                      // Wait for a short time to avoid trigger waypoint's onEnter() of infogram embed close to the anchor
                      setTimeout(
                        () => onStartScrollingToAnchor(false),
                        WAIT_AFTER_REACH_ANCHOR
                      )
                    })
                  )
                }}
              >
                <Styled.TOCIndicator
                  toHighlight={toHighlight}
                  isExpanded={isExpanded}
                />
                <Styled.TOCText toHighlight={toHighlight}>
                  {anchor.anchorLable}
                </Styled.TOCText>
              </Styled.TOCRow>
            )
          })

          return (
            <React.Fragment>
              <Styled.TOCTabWrapper isHidden={hideTOC}>
                <Styled.TOCTab onClick={handleTabClick} isExpanded={isExpanded}>
                  <div>索引</div>
                  <Tab />
                </Styled.TOCTab>
              </Styled.TOCTabWrapper>
              <Styled.TOCBackground
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isExpanded={isExpanded}
              >
                <Styled.TOCBlock>{anchorsJSX}</Styled.TOCBlock>
              </Styled.TOCBackground>
            </React.Fragment>
          )
        }}
      />
    </div>
  )
}

TableOfContents.propTypes = {
  className: PropTypes.string,
  manager: TOC.React.TableOfContents.propTypes.manager,
  onStartScrollingToAnchor: PropTypes.func,
  onToggleTabExpanded: PropTypes.func,
  scrollStage: PropTypes.number,
}

TableOfContents.defaultProps = {
  className: '',
}

export default {
  createManager: props => {
    return new TOC.Manager(props)
  },
  React: {
    Anchor: TOC.React.Anchor,
    TableOfContents: TableOfContents,
  },
}
