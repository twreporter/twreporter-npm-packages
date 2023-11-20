import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import mockup from './mockup'
// components
import Card from './card'
// constants
import themeConsts from '../../constants/theme'
import predefinedProps from '../../constants/prop-types/related'
import typography from '../../constants/typography'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
const _ = {
  get,
  map,
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
        color: ${colorGrayscale.gray300};
        background-color: ${colorGrayscale.white}1a; // add 10% opacity with hex alpha
        &:hover {
          color: ${colorGrayscale.white};
          background-color: ${colorGrayscale.gray400};
        }
      `
    case themeConsts.article.v2.pink:
    case themeConsts.article.v2.default:
    default:
      return css`
        color: ${colorGrayscale.gray600};
        background-color: ${colorGrayscale.gray300};
        &:hover {
          color: ${colorGrayscale.gray800};
          background-color: ${colorGrayscale.gray400};
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
  font-weight: ${typography.font.weight.bold};
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
        return colorGrayscale.gray400
      default:
        return colorGrayscale.gray300
    }
  }};
  margin-bottom: 40px;
  animation: ${fadeIn} 400ms ease-in-out;
  ${mq.tabletAndBelow`
    border-width: 0 0 0.5px 0;
    margin: 0 auto;
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
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: [],
    hasMore: false,
  }

  mountedCardNum = 0

  state = {
    alignItems: 'stretch',
  }

  handleCardMounted = () => {
    this.mountedCardNum += 1
    if (this.mountedCardNum === _.get(this.props, 'data.length', 0)) {
      this.setState({
        alignItems: 'flex-start',
      })
    }
  }

  renderCard = (item, i) => {
    return (
      <DynamicComponentsContext.Consumer key={item.id}>
        {components => {
          return (
            <Item>
              <components.Link
                to={item.href}
                target={
                  _.get(item, 'isTargetBlank', false) ? '_blank' : '_self'
                }
              >
                <Card {...item} handleMounted={this.handleCardMounted} />
              </components.Link>
            </Item>
          )
        }}
      </DynamicComponentsContext.Consumer>
    )
  }

  loadMore = () => {
    // `alignItems: stretch` will make cards the same height.
    // Therefore, we have to set `alignItems: stretch`
    // before loading more to render.
    this.setState(
      {
        alignItems: 'stretch',
      },
      this.props.loadMore
    )
  }

  render() {
    const { data, hasMore } = this.props
    const { alignItems } = this.state
    const cards = _.map(data, this.renderCard)
    // Use `align-items: stretch` to make sure every Item(Card)
    // having the same height while mounting.
    // Then, use `flex-start` instead to make each Item(Card)
    // show description with different height while hovering.
    return (
      <div>
        <ListBlock alignItems={alignItems}>{cards}</ListBlock>
        {hasMore ? (
          <LoadMoreButton total={data.length} onClick={this.loadMore}>
            載入更多文章
          </LoadMoreButton>
        ) : null}
      </div>
    )
  }
}
