import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import Card from './card'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import mockup from './mockup'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/related'
import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import themeConsts from '../../constants/theme'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const firstShowedLimit = {
  tabletAndBelow: 3,
  desktopAndAbove: 6,
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const selectButtonColors = theme => {
  switch (theme) {
    case themeConsts.article.v2.photo:
      return css`
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(255, 255, 255, 0.1);
        &:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
        }
      `
    case themeConsts.article.v2.pink:
    case themeConsts.article.v2.default:
    default:
      return css`
        color: #808080;
        background-color: rgba(0, 0, 0, 0.08);
        &:hover {
          color: #404040;
          background-color: rgba(0, 0, 0, 0.13);
        }
      `
  }
}

const LoadMoreButton = styled.div`
  text-align: center;
  font-size: 14px;
  letter-spacing: 0.4px;
  padding-top: 26px;
  border-radius: 4px;
  height: 72px;
  font-weight: ${fontWeight.bold};
  cursor: pointer;
  ${props => selectButtonColors(props.theme.name)}
  transition: color 100ms ease;
  ${mq.mobileOnly`
    width: ${mockup.mobile.item.width};
    margin: 30px auto;
  `}
  ${mq.tabletOnly`
    width: ${mockup.tablet.item.width}px;
    margin: 40px auto;
  `}
  ${mq.desktopOnly`
    width: ${mockup.desktop.item.width * 3 +
      mockup.desktop.item.margin.right * 2 +
      3}px;
    margin: 30px 0;
  `}
  ${mq.hdOnly`
    width: ${mockup.hd.item.width * 3 + mockup.hd.item.margin.right * 2 + 3}px;
    margin: 30px 0;
  `}
`

const ListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => props.alignItems};
`

const Item = styled.div`
  border-style: solid;
  border-width: 0 0.5px 0.5px 0;
  border-color: ${props => {
    switch (props.theme.name) {
      case themeConsts.article.v2.photo:
        return 'rgba(255, 255, 255, 0.2)'
      default:
        return '#d8d8d8'
    }
  }};
  margin-bottom: 40px;
  animation: ${fadeIn} 400ms ease-in-out;
  ${mq.tabletAndBelow`
    border-width: 0 0 0.5px 0;
    margin: 0 auto;
  
    /* Show less items at mobile and tabet than desktop */
    display: ${props =>
      !props.showAll && props.i > firstShowedLimit.tabletAndBelow - 1
        ? 'none'
        : 'block'};
  `}

  ${mq.mobileOnly`
    flex: 0 0 ${mockup.mobile.item.width};
  `}

  ${mq.tabletOnly`
    flex: 0 0 ${mockup.tablet.item.width}px;
  `}

  ${mq.desktopOnly`
    margin-right: ${mockup.desktop.item.margin.right}px;
    flex: 0 0 ${mockup.desktop.item.width}px;
  `}

  ${mq.hdOnly`
    margin-right: ${mockup.hd.item.margin.right}px;
    flex: 0 0 ${mockup.hd.thumbnail.width}px;
  `}
`

export default class List extends React.PureComponent {
  static propTypes = {
    data: predefinedProps.data,
  }

  static defaultProps = {
    data: [],
  }

  state = {
    alignItems: 'stretch',
    showAll: false,
  }

  componentDidMount() {
    this.setState({
      alignItems: 'flex-start',
    })
  }

  renderCard = (item, i) => {
    return (
      <DynamicComponentsContext.Consumer key={item.id}>
        {components => {
          return (
            <Item i={i} showAll={this.state.showAll}>
              <components.Link
                to={item.href}
                target={
                  _.get(item, 'isTargetBlank', false) ? '_blank' : '_self'
                }
              >
                <Card {...item} />
              </components.Link>
            </Item>
          )
        }}
      </DynamicComponentsContext.Consumer>
    )
  }

  loadMore = () => {
    this.setState(
      {
        showAll: true,
        alignItems: 'stretch',
      },
      () => {
        // `align-items: flex-start` will be applied after the new cards mounted with `stretch`
        this.setState({
          alignItems: 'flex-start',
        })
      }
    )
  }

  render() {
    const { data } = this.props
    if (data.length === 0) {
      return null
    }
    const { showAll, alignItems } = this.state
    const cards = showAll
      ? _.map(data, this.renderCard)
      : _.map(data.slice(0, firstShowedLimit.desktopAndAbove), this.renderCard)

    // Use `align-items: stretch` to make sure every Item(Card)
    // having the same height while mounting.
    // Then, use `flex-start` instead to make each Item(Card)
    // show description with different height while hovering.
    return (
      <div>
        <ListBlock alignItems={alignItems}>{cards}</ListBlock>
        {showAll ? null : (
          <LoadMoreButton onClick={this.loadMore}>載入更多文章</LoadMoreButton>
        )}
      </div>
    )
  }
}
