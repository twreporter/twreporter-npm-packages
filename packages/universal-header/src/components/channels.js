import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled, { css } from 'styled-components'
import HeaderContext from '../contexts/header-context'
import themeUtils from '../utils/theme'
import animationUtils from '../utils/animations'
import wellDefinedPropTypes from '../constants/prop-types'
import channelConst from '../constants/channels'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import DropDownMenu from './drop-down-menu'
import Link from './customized-link'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const styles = {
  itemMargin: {
    desktop: 0,
  },
  itemPadding: {
    row: [8, 16], // px
    column: [20, 32], // px
  },
  itemWidth: {
    row: 'initial',
    column: '100%',
  },
  itemBorderWidth: {
    row: [0, 0, 0, 1],
    column: [0, 0, 1, 0],
  },
  itemBorderWidthFirstChild: {
    row: [0, 0, 0, 0],
    column: [1, 0, 1, 0],
  },
  dropdownPosition: {
    row: 'absolute',
    column: 'relative',
  },
  dropdownTop: {
    row: 35, // px
    column: 0, // px
  },
}

const dropDownMenuEffectCSS = css`
  .effect-enter {
    max-height: 0;
  }

  .effect-enter-active {
    max-height: 400px;
    transition: max-height 400ms ease-in 100ms;
  }
`

const linkUnderline = css`
  animation: ${animationUtils.changeOpacity('0', '1')} 0.5s linear;
  position: absolute;
  left: 0;
  bottom: -1px;
  display: block;
  content: '';
  width: 100%;
  height: 4px;
  background-color: #a67a44;
`

const DropDownMenuWrapper = styled.div`
  position: ${props => styles.dropdownPosition[props.direction]};
  z-index: 999;
  width: 100%;
  left: 0;
  top: ${props => styles.dropdownTop[props.direction]}px;
  ${dropDownMenuEffectCSS}
`

const Box = styled.div`
  width: 100%;
  height: 100%;
`

const List = styled.ul`
  height: 100%;
  justify-content: space-between;
  background-color: ${props => props.bgColor || colors.white};
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: nowrap;
  align-items: center;
  list-style-type: none;
  margin: auto;
  padding-inline-start: 0;
  border-color: ${props => props.borderColor || colors.gray};
  border-width: ${props => arrayToCssShorthand(props.borderWidth)};
  border-style: solid;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: ${props => props.direction};
  position: relative;
  width: ${props => styles.itemWidth[props.direction]};
  height: 100%;
  font-size: ${fonts.size.base};
  letter-spacing: 0.5px;
  cursor: pointer;
  margin: ${arrayToCssShorthand(styles.itemMargin.desktop)};
  flex: 1;
  text-shadow: ${props => props.textShadow};
  border-style: solid;
  border-color: inherit;
  border-width: ${props =>
    arrayToCssShorthand(styles.itemBorderWidth[props.direction])};
  &:first-child {
    border-width: ${props =>
      arrayToCssShorthand(styles.itemBorderWidthFirstChild[props.direction])};
  }
  &::after {
    ${props =>
      props.isActive && props.direction === 'row' ? linkUnderline : ''}
  }
  a,
  a:link,
  a:visited {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${fonts.size.base};
    font-weight: ${fonts.weight.bold};
    padding: ${props =>
      arrayToCssShorthand(styles.itemPadding[props.direction])};
    width: 100%;
    color: ${props => props.fontColor};
    border: 0;
    line-height: 18px;
    &:hover {
      background-color: ${props => props.hoverBgColor};
      color: ${props => props.hoverFontColor};
    }
  }
`

const ShowOnHover = styled.div`
  display: none;

  ${ListItem}:hover & {
    display: flex;
  }
`

const HideOnHover = styled.div`
  display: flex;

  ${ListItem}:hover & {
    display: none;
  }
`

const invalidDataIndex = -1
const dropDownMenuKey = 'dropDownMenu'

class Channels extends React.PureComponent {
  static propTypes = {
    currentPathname: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        link: PropTypes.shape(wellDefinedPropTypes.link.propTypes),
        pathname: PropTypes.string,
        type: PropTypes.oneOf([
          channelConst.channelDropDownType,
          channelConst.channelLinkType,
        ]),
        [dropDownMenuKey]: DropDownMenu.propTypes.data,
      })
    ),
    direction: PropTypes.string,
    borderWidth: PropTypes.array,
    themeFunction: PropTypes.func,
    callback: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    direction: 'row',
    borderWidth: [0, 0, 0, 0],
    themeFunction: themeUtils.selectChannelTheme,
    callback: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      activeDataIndex: this._checkWhichChannelActive(props.currentPathname),
      activeDropdownIndex: invalidDataIndex,
    }
    this.handleDropDownChannelClick = this._handleDropDownChannelClick.bind(
      this
    )
    this.handleNormalChannelClick = this._handleNormalChannelClick.bind(this)
    this.handleDropDownMenuClick = this._handleDropDownMenuClick.bind(this)
    this.callback = this._callback.bind(this)
  }

  _checkWhichChannelActive(currentPathname) {
    const { data } = this.props
    let activeChannelIndex = invalidDataIndex

    for (let channelIndex = 0; channelIndex < data.length; channelIndex += 1) {
      const channelItem = data[channelIndex]
      if (currentPathname === channelItem.pathname) {
        activeChannelIndex = channelIndex
        break
      }

      if (channelItem.hasOwnProperty(dropDownMenuKey)) {
        const dropDownMenuArr = channelItem[dropDownMenuKey]
        for (
          let dropDownIndex = 0;
          dropDownIndex < dropDownMenuArr.length;
          dropDownIndex += 1
        ) {
          if (dropDownMenuArr[dropDownIndex].pathname === currentPathname) {
            activeChannelIndex = channelIndex
            break
          }
        }

        if (activeChannelIndex !== invalidDataIndex) {
          break
        }
      }
    }

    return activeChannelIndex
  }

  _handleDropDownChannelClick(e, channelIndex) {
    e.preventDefault()
    const { activeDropdownIndex } = this.state
    const nextActiveDropdownIndex =
      channelIndex === activeDropdownIndex ? invalidDataIndex : channelIndex
    this.setState({
      activeDropdownIndex: nextActiveDropdownIndex,
    })
  }

  _handleNormalChannelClick(channelIndex) {
    this.setState({
      activeDataIndex: channelIndex,
      activeDropdownIndex: invalidDataIndex,
    })
    this.callback(channelIndex)
  }

  _handleDropDownMenuClick(parentIndex) {
    this.setState({
      activeDataIndex: parentIndex,
      activeDropdownIndex: invalidDataIndex,
    })
    this.callback(parentIndex)
  }

  _callback(dataIndex) {
    const currentActivePathname =
      dataIndex === invalidDataIndex ? '' : this.props.data[dataIndex].pathname
    this.props.callback(currentActivePathname)
  }

  _prepareChannelItemJSX(channelItem, dataIndex, theme) {
    const channelLabel = channelItem.label
    const channelType = channelItem.type
    const channelLink = channelItem.link

    if (channelType === channelConst.channelDropDownType) {
      const { data, direction } = this.props
      const { activeDropdownIndex } = this.state
      const toShowDropdownMenu = activeDropdownIndex === dataIndex
      const dropdownMenuData = _.get(data, [dataIndex, dropDownMenuKey], [])
      const dropdownMenuJSX = (
        <DropDownMenuWrapper direction={direction}>
          <CSSTransition
            in={toShowDropdownMenu}
            classNames="effect"
            timeout={400}
            exit={false}
            mountOnEnter
            unmountOnExit
          >
            <DropDownMenu
              data={dropdownMenuData}
              onClick={e => this.handleDropDownMenuClick(dataIndex)}
            />
          </CSSTransition>
        </DropDownMenuWrapper>
      )
      const status = toShowDropdownMenu ? 'collapse' : 'expand'
      const [StatusIcon, StatusHoverIcon] = themeUtils.selectIcons(theme)[
        status
      ]
      const statusIconJSX = (
        <React.Fragment>
          <HideOnHover>
            <StatusIcon />
          </HideOnHover>
          <ShowOnHover>
            <StatusHoverIcon />
          </ShowOnHover>
        </React.Fragment>
      )
      return (
        <React.Fragment>
          <Link
            onClick={e => this.handleDropDownChannelClick(e, dataIndex)}
            {...channelLink}
          >
            {channelLabel}
            {statusIconJSX}
          </Link>
          {dropdownMenuJSX}
        </React.Fragment>
      )
    } else {
      return (
        <Link
          onClick={() => this.handleNormalChannelClick(dataIndex)}
          {...channelLink}
        >
          {channelLabel}
        </Link>
      )
    }
  }

  render() {
    const { data, direction, borderWidth, themeFunction } = this.props
    const { activeDataIndex } = this.state
    const channelsJSX = _.map(data, (channelItem, dataIndex) => {
      const isActive = activeDataIndex === dataIndex
      return (
        <HeaderContext.Consumer key={channelItem.key}>
          {({ theme }) => {
            const { fontColor, hoverFontColor, hoverBgColor } = themeFunction(
              theme
            )
            const channelItemJSX = this._prepareChannelItemJSX(
              channelItem,
              dataIndex,
              theme
            )
            return (
              <ListItem
                direction={direction}
                isActive={isActive}
                onClick={this.handleClickChannel}
                fontColor={fontColor}
                hoverFontColor={hoverFontColor}
                hoverBgColor={hoverBgColor}
              >
                {channelItemJSX}
              </ListItem>
            )
          }}
        </HeaderContext.Consumer>
      )
    })
    return (
      <Box>
        <HeaderContext.Consumer>
          {({ theme }) => {
            const { bgColor, borderColor } = themeFunction(theme)
            return (
              <List
                bgColor={bgColor}
                direction={direction}
                borderColor={borderColor}
                borderWidth={borderWidth}
              >
                {channelsJSX}
              </List>
            )
          }}
        </HeaderContext.Consumer>
      </Box>
    )
  }
}

export default Channels
