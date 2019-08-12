import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import DropDownMenu from './drop-down-menu'
import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import channelConst from '../constants/channels'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import get from 'lodash/get'
import map from 'lodash/map'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
import wellDefinedPropTypes from '../constants/prop-types'
import {
  arrayToCssShorthand,
  linkUnderline,
  screen,
} from '../utils/style-utils'
import { categoriesMenuEffect as dropDownMenuEffect } from '../constants/css-transition-group'

const _ = {
  get,
  map,
}

const styles = {
  channelsPositionTop: {
    desktop: 30, // px
  },
  channelsPositionLeft: {
    desktop: 352, // px
    hd: 389, // px
  },
  channelsPadding: {
    mobile: [5, 24], // px
    tablet: [5, 220], // px
  },
  itemMargin: {
    mobile: 0, // px
    tablet: 0, // px
    desktop: [0, 41, 0, 0], // px
    hd: [0, 68, 0, 0], // px
  },
  itemPadding: {
    mobile: [5, 1], // px
    tablet: [5, 1], // px
    desktop: [8, 1], // px
  },
  channelsContainerMaxWidth: 1440, // px
}

const DropDownMenuTransitionGroup = styled(CSSTransitionGroup)`
  position: absolute;
  z-index: 999;
  width: 100%;
  left: 0;
  ${dropDownMenuEffect}
`

const Box = styled.div`
  width: 100%;
  ${screen.hdAbove`
    max-width: ${styles.channelsContainerMaxWidth}px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `}
  ${screen.mobileOnly`
    display: none;
  `}
`

const List = styled.ul`
  justify-content: space-between;
  padding: ${arrayToCssShorthand(styles.channelsPadding.mobile)};
  background-color: ${props => props.bgColor || colors.white};
  ${screen.tabletOnly`
    justify-content: space-around;
    padding: ${arrayToCssShorthand(styles.channelsPadding.tablet)};
  `}
  ${screen.desktopAbove`
    justify-content: space-around;
    position: absolute;
    top: ${styles.channelsPositionTop.desktop}px;
    left: ${styles.channelsPositionLeft.desktop}px;
    background-color: transparent;
  `}
  ${screen.hdAbove`
    left: ${styles.channelsPositionLeft.hd}px;
  `}
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  list-style-type: none;
  margin: 0;
`

const ListItem = styled.li`
  padding: ${arrayToCssShorthand(styles.itemPadding.mobile)};
  margin: ${arrayToCssShorthand(styles.itemMargin.mobile)};
  text-shadow: ${props => props.textShadow};
  a,
  a:link,
  a:visited {
    color: ${props => props.fontColor};
    &:hover {
      color: ${props => props.hoverFontColor} !important;
    }
  }
  ${screen.tabletOnly`
    padding: ${arrayToCssShorthand(styles.itemPadding.tablet)};
    margin: ${arrayToCssShorthand(styles.itemMargin.tablet)};
  `}
  ${screen.desktopAbove`
    padding: ${arrayToCssShorthand(styles.itemPadding.desktop)};
    margin: ${arrayToCssShorthand(styles.itemMargin.desktop)};
  `}
  position: relative;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.5px;
  cursor: pointer;
  &::after {
    ${props => (props.isActive ? linkUnderline : '')}
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
  }

  static defaultProps = {
    data: [],
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
  }

  render() {
    const { currentPathname, data } = this.props

    const { indexToDropDown } = this.state

    let activeChannelIndex = invalidDataIndex

    if (indexToDropDown > invalidDataIndex) {
      activeChannelIndex = indexToDropDown
    } else {
      activeChannelIndex = this._checkWhichChannelActive(currentPathname)
    }

    const channelsJSX = _.map(data, (channelItem, dataIndex) => {
      const channelLabel = channelItem.label
      const channelType = channelItem.type
      const isActive = activeChannelIndex === dataIndex
      const channelLink = channelItem.link
      return (
        <HeaderContext.Consumer key={channelItem.key}>
          {({ theme }) => {
            const fontColor = themeUtils.selectFontColor(theme)
            const hoverFontColor = themeUtils.selectHoverFontColor(theme)
            const textShadow = themeUtils.selectChannelTextShadow(theme)
            return (
              <ListItem
                isActive={isActive}
                onClick={this.handleClickChannel}
                fontColor={fontColor}
                textShadow={textShadow}
                hoverFontColor={hoverFontColor}
              >
                <Link
                  onClick={
                    channelType === channelConst.channelDropDownType
                      ? e => this.handleDropDownMenuClick(e, dataIndex)
                      : this.handleChannelClick
                  }
                  {...channelLink}
                >
                  {channelLabel}
                </Link>
              </ListItem>
            )
          }}
        </HeaderContext.Consumer>
      )
    })

    let dropDownMenuJSX = null

    if (indexToDropDown > invalidDataIndex) {
      const dropDownMenu = _.get(data, [indexToDropDown, dropDownMenuKey], {})
      dropDownMenuJSX = (
        <DropDownMenu data={dropDownMenu} onClick={this.closeDropDownMenu} />
      )
    }

    return (
      <React.Fragment>
        <Box>
          <HeaderContext.Consumer>
            {({ theme }) => {
              const bgColor = themeUtils.selectChannelsBgColor(theme)
              return <List bgColor={bgColor}>{channelsJSX}</List>
            }}
          </HeaderContext.Consumer>
        </Box>
        <DropDownMenuTransitionGroup
          key="transition"
          transitionName="effect"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
          {dropDownMenuJSX}
        </DropDownMenuTransitionGroup>
      </React.Fragment>
    )
  }
}

export default Channels
