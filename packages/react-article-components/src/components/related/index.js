import Card from './card'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import React from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/related'
import styled from 'styled-components'
import typography from '../../constants/typography'

const _ = {
  get,
  map,
}

const Block = styled.section`
  ${mq.desktopAndAbove`
    display: flex;
  `}

  ${mq.desktopOnly`
    margin-left: 28px;
  `}

  ${mq.hdOnly`
    margin-left: 53px;
  `}
`

const Descriptor = styled.div`

  ${mq.tabletAndBelow`
    margin: 0 auto 40px auto;
    color: ${props => props.theme.colors.base.lightText};
    font-size: 20px;
    font-weigth: ${typography.font.weight.bold};

    &:before {
      content: '相關文章';
    }
  `}

  ${mq.mobileOnly`
    width: calc(309/355*100%);
  `}

  ${mq.tabletOnly`
    width: 513px;
  `}

  ${mq.desktopAndAbove`
    flex-shrink: 0;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: 0.4px;
    color: #494949;
    margin-right: auto;
    padding-top: 5px;
    border-top: solid 0.5px #d8d8d8;
    position: relative;

    &:before {
      content: '相關文章';
      margin-left: 5px;
      margin-top: 5px;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 12px;
      border-right: solid 0.5px #d8d8d8;
    }
  `}

  ${mq.desktopOnly`
    width: 180px;
    margin-right: 15px;
  `}

  ${mq.hdOnly`
    width: 250px;
    margin-right: 12px;
  `}
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  align-self: ${props => props.alignSelf};
  flex: 0 1 auto;
  border-style: solid;
  border-width: 0 0.5px 0.5px 0;
  border-color: #d8d8d8;
  margin-bottom: 40px;
  margin-right: 3px;

  ${mq.tabletAndBelow`
    border-width: 0 0 0.5px 0;
    margin: 0 auto;
  `}

  ${mq.mobileOnly`
    flex-basis: calc(309/355*100%);
  `}

  ${mq.tabletOnly`
    flex-basis: 513px;
  `}
`

export default class Related extends React.PureComponent {
  static propTypes = {
    data: predefinedProps.data,
  }

  static defaultProps = {
    data: [],
  }

  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
  }

  render() {
    const { data } = this.props
    const { isMounted } = this.state

    const cards = _.map(data, item => {
      return (
        <DynamicComponentsContext.Consumer key={item.id}>
          {components => {
            return (
              // Use `stretch` to make sure every Item(Card)
              // having the same height while mounting.
              // Then, use `flex-start` instead to make each Item(Card)
              // show description with different height while hovering.
              <Item alignSelf={!isMounted ? 'stretch' : 'flex-start'}>
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
    })

    if (cards.length === 0) {
      return null
    }

    return (
      <Block>
        <Descriptor />
        <List>{cards}</List>
      </Block>
    )
  }
}
