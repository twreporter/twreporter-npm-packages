import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import fonts from '../constants/fonts'
import colors from '../constants/colors'
import linkUtils from '../utils/links'
import actionConst from '../constants/actions'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const styles = {
  itemWidth: {
    desktop: 70, // px
  },
  itemHeight: {
    desktop: 30, // px
  },
  fontSize: {
    mobile: fonts.size.medium,
    desktop: fonts.size.base,
  },
}

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const ActionContainer = styled.div`
  margin: 0 10px;

  a,
  a:link,
  a:visited {
    color: ${props => props.color || colors.white};
    font-size: ${styles.fontSize.desktop};
  }
`

const ActionItem = styled.div`
  background-color: ${props => props.bgColor || colors.red};
  width: ${styles.itemWidth.desktop}px;
  height: ${styles.itemHeight.desktop}px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.hoverBgColor || colors.red};
  }
`

class ActionButton extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.array,
  }

  static defaultProps = {
    actions: [],
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _prepareActionJSX(action) {
    const actionKey = action.key
    const actionLabel = actionConst.actionLabels[actionKey]
    const actionLink = linkUtils.getActionLinks()[actionKey]
    return (
      <HeaderContext.Consumer key={actionKey}>
        {({ theme }) => {
          const { color, bgColor, hoverBgColor } = themeUtils.selectActionButtonTheme(theme)
          return (
            <ActionContainer color={color}>
              <Link {...actionLink}>
                <ActionItem
                  bgColor={bgColor}
                  hoverBgColor={hoverBgColor}
                >
                  {actionLabel}
                </ActionItem>
              </Link>
            </ActionContainer>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  render() {
    const { actions } = this.props
    return (
      <ActionsContainer>
        { _.map(actions, action => this._prepareActionJSX(action)) }
      </ActionsContainer>
    )
  }
}

export default ActionButton
