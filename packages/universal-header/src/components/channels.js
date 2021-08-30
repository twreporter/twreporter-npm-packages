import CSSTransition from 'react-transition-group/CSSTransition'
import DropDownMenu from './drop-down-menu'
import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import channelConst from '../constants/channels'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import styled, { css, keyframes } from 'styled-components'
import themeUtils from '../utils/theme'
import wellDefinedPropTypes from '../constants/prop-types'
// @twreporter
import { arrayToCssShorthand } from '@twreporter/core/lib/utils/css'
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const styles = {
  channelsPadding: {
    row: [0, 60], // px
    column: [0, 0], // px
  },
  channelsMaxWidth: {
    desktop: 1024, // px
    hd: 1440, // px
  },
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
  dropdownPosition: {
    row: 'absolute',
    column: 'relative',
  },
  dropdownTop: {
    row: 36, // px
    column: 0, //px
  }
}

const changeOpacity = (valueFrom, valueTo) => keyframes`
  from {
    opacity: ${valueFrom};
  }
  to {
    opacity: ${valueTo};
  }
`

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
  animation: ${changeOpacity('0', '1')} 0.5s linear;
  position: absolute;
  left: 0;
  bottom: -1px;
  display: block;
  content: '';
  width: 100%;
  height: 4px;
  background-color: #A67A44;
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
`

const List = styled.ul`
  justify-content: space-between;
  padding: ${props => arrayToCssShorthand(styles.channelsPadding[props.direction])};
  max-width: ${styles.channelsMaxWidth.hd}px;
  background-color: ${props => props.bgColor || colors.white};
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: nowrap;
  align-items: center;
  list-style-type: none;
  margin: auto;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: ${props => props.direction};
  position: relative;
  width: ${props => styles.itemWidth[props.direction]};
  font-size: ${fonts.size.base};
  letter-spacing: 0.5px;
  cursor: pointer;
  margin: ${arrayToCssShorthand(styles.itemMargin.desktop)};
  flex: 1;
  text-shadow: ${props => props.textShadow};
  border: 1px solid ${props => props.borderColor || colors.gray};
  border-right: 0;
  &:first-child {
    border-left: 0;
  }
  &::after {
    ${props => (props.isActive && props.direction === 'row' ? linkUnderline : '')}
  }
  a,
  a:link,
  a:visited {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${fonts.size.base};
    padding: ${props => arrayToCssShorthand(styles.itemPadding[props.direction])};
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
    callback: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    direction: 'row',
    callback: ()=> {},
  }

  constructor(props) {
    super(props)
    this.state = {
      indexToDropDown: invalidDataIndex,
    }
    this.handleDropDownMenuClick = this._handleDropDownMenuClick.bind(this)
    this.closeDropDownMenu = this._closeDropDownMenu.bind(this)
    this.handleChannelClick = this._handleChannelClick.bind(this)
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

  _handleDropDownMenuClick(e, channelIndex) {
    e.preventDefault()

    if (channelIndex !== this.state.indexToDropDown) {
      this.setState({
        indexToDropDown: channelIndex,
      })
      return
    }
    this.closeDropDownMenu()
  }

  _closeDropDownMenu() {
    this.setState({
      indexToDropDown: invalidDataIndex,
    })
  }

  _handleChannelClick() {
    this.closeDropDownMenu()
    this.props.callback()
  }

  _prepareChannelItemJSX(channelItem, dataIndex, theme) {
    const channelLabel = channelItem.label
    const channelType = channelItem.type
    const channelLink = channelItem.link

    if (channelType === channelConst.channelDropDownType) {
      const { data, direction } = this.props
      const { indexToDropDown } = this.state
      const toShowDropdownMenu = indexToDropDown > invalidDataIndex
      const dropdownMenuData = _.get(data, [indexToDropDown, dropDownMenuKey], [])
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
              onClick={this.handleChannelClick}
            />
          </CSSTransition>
        </DropDownMenuWrapper>
      )
      const isActive = indexToDropDown === dataIndex
      const status = isActive ? 'collapse' : 'expand'
      const [ StatusIcon, StatusHoverIcon ] = themeUtils.selectIcons(theme)[status]
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
            onClick={e => this.handleDropDownMenuClick(e, dataIndex)}
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
          onClick={this.handleChannelClick}
          {...channelLink}
        >
          {channelLabel}
        </Link>
      )
    }
  }

  render() {
    const { currentPathname, data, direction } = this.props
    const { indexToDropDown } = this.state
    const toShowDropDownMenu = indexToDropDown > invalidDataIndex
    const activeChannelIndex = toShowDropDownMenu
      ? indexToDropDown
      : this._checkWhichChannelActive(currentPathname)

    const channelsJSX = _.map(data, (channelItem, dataIndex) => {
      const isActive = activeChannelIndex === dataIndex
      return (
        <HeaderContext.Consumer key={channelItem.key}>
          {({ theme }) => {
            const { fontColor, hoverFontColor, hoverBgColor, textShadow, borderColor } = themeUtils.selectChannelTheme(theme)
            const channelItemJSX = this._prepareChannelItemJSX(channelItem, dataIndex, theme)
            return (
              <ListItem
                direction={direction}
                isActive={isActive}
                onClick={this.handleClickChannel}
                fontColor={fontColor}
                textShadow={textShadow}
                hoverFontColor={hoverFontColor}
                hoverBgColor={hoverBgColor}
                borderColor={borderColor}
              >
                {channelItemJSX}
              </ListItem>
            )
          }}
        </HeaderContext.Consumer>
      )
    })
    return (
      <React.Fragment>
        <Box>
          <HeaderContext.Consumer>
            {({ theme }) => {
              const bgColor = themeUtils.selectChannelsBgColor(theme)
              return <List bgColor={bgColor} direction={direction}>{channelsJSX}</List>
            }}
          </HeaderContext.Consumer>
        </Box>
      </React.Fragment>
    )
  }
}

export default Channels
