import Card from './card'
import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import React from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedProps from '../../constants/prop-types/related'
import styled from 'styled-components'
import themeConst from '../../constants/theme'

const _ = {
  get,
  map,
}

const ListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  align-self: ${props => props.alignSelf};
  flex: 0 1 auto;
  border-style: solid;
  border-width: 0 0.5px 0.5px 0;
  border-color: ${props => {
    switch (props.theme.name) {
      case themeConst.article.v2.photo:
        return 'rgba(255, 255, 255, 0.2)'
      default:
        return '#d8d8d8'
    }
  }};
  margin-bottom: 40px;

  ${mq.hdOnly`
    margin-right: 10px;
  `}

  ${mq.desktopOnly`
    margin-right: 8px;
  `}

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

export default class List extends React.PureComponent {
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

    if (data.length === 0) {
      return null
    }

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

    return <ListBlock>{cards}</ListBlock>
  }
}
