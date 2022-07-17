import * as Styled from './styled'
import PropTypes from 'prop-types'
import React from 'react'
import TOC from '@twreporter/react-components/lib/table-of-contents'
import map from 'lodash/map'
import Tab from '../../assets/table-of-contents/long-form-tab.svg'
import {
  WAIT_AFTER_REACH_ANCHOR,
  TOC_ANCHOR_SCROLL_DURATION,
} from '../../constants/anchor'

const _ = {
  map,
}

class TableOfContents extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    manager: TOC.React.TableOfContents.propTypes.manager,
    onAnchorClick: PropTypes.func,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
    }

    this.handleMouseEnter = this._setIsExpanded.bind(this, true)
    this.handleMouseLeave = this._setIsExpanded.bind(this, false)
    this.handleTabClick = this._toggleIsExpanded.bind(this)
    this.handleTouchOutside = this._handleTouchOutside.bind(this)

    this._ref = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.handleTouchOutside, {
      passive: true,
      capture: true,
    })
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleTouchOutside, {
      passive: true,
      capture: true,
    })
  }

  _setIsExpanded(isExpanded) {
    this.setState({
      isExpanded,
    })
  }

  _toggleIsExpanded(e) {
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  _handleTouchOutside(e) {
    try {
      if (!this._ref.current.contains(e.target) && this.state.isExpanded) {
        this.setState({
          isExpanded: false,
        })
      }
    } catch (e) {
      console.warn('TableOfContents#handleTouchOutside occurs error:', e)
    }
  }

  render() {
    const { className, manager, onAnchorClick } = this.props
    const { isExpanded } = this.state

    return (
      <div className="hidden-print" ref={this._ref}>
        <TOC.React.TableOfContents
          className={className}
          manager={manager}
          scrollDuration={TOC_ANCHOR_SCROLL_DURATION}
          render={(anchors, highlightAnchor, handleAnchorClick) => {
            const anchorsJSX = _.map(anchors, anchor => {
              const toHighlight = anchor === highlightAnchor

              return (
                <Styled.TOCRow
                  key={anchor.anchorID}
                  onClick={() => {
                    onAnchorClick(true, () =>
                      handleAnchorClick(anchor.anchorID, () => {
                        // Wait for a short time to avoid trigger waypoint's onEnter() of infogram embed close to the anchor
                        setTimeout(
                          () => onAnchorClick(false),
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
                <Styled.TOCTab
                  onClick={this.handleTabClick}
                  isExpanded={isExpanded}
                >
                  <div>索引</div>
                  <Tab />
                </Styled.TOCTab>
                <Styled.TOCBackground
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
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
