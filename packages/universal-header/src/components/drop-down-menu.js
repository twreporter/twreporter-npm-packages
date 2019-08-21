import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import styled from 'styled-components'
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
  contentMaxWidth: 320, // px
  containerPadding: {
    desktop: [10, 0], // px
  },
  itemPadding: {
    mobile: [30, 27], // px
    tablet: [30, 33], // px
    desktop: [9, 22], // px
    hd: [9, 46], // px
  },
  containerBorder: 24, // px
}

const ViewPort = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  max-height: 400px;
`

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${colors.white};
  user-select: none;
  ${mq.tabletAndBelow`
    border: ${arrayToCssShorthand(styles.containerBorder)} solid ${
    colors.grayBg
  };
  `}
  ${mq.desktopAndAbove`
    padding: ${arrayToCssShorthand(styles.containerPadding.desktop)};
  `}
`

const MenuContent = styled.ul`
  flex-wrap: wrap;
  ${mq.tabletAndBelow`
    max-width: ${styles.contentMaxWidth}px;
  `}
  ${mq.desktopAndAbove`
    flex-wrap: nowrap;
  `}
  margin: 0 auto;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`

const SubMenuBox = styled.li`
  padding: ${arrayToCssShorthand(styles.itemPadding.mobile)};
  ${mq.tabletOnly`
    padding: ${arrayToCssShorthand(styles.itemPadding.tablet)};
  `}
  ${mq.desktopAndAbove`
    padding: ${arrayToCssShorthand(styles.itemPadding.desktop)};
  `}
  ${mq.hdOnly`
    padding: ${arrayToCssShorthand(styles.itemPadding.hd)};
  `}
  display: block;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  margin: 0;
`

const SubMenuContent = styled.span`
  color: #818283;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.normal};
  cursor: pointer;
  &:hover {
    color: ${colors.gray15};
  }
`

const Seperator = styled.div`
  ${mq.tabletAndBelow`
    display: ${props => (props.last > 2 ? 'block' : 'none')};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
  `}
  ${mq.desktopAndAbove`
    top: 50%;
    transform: translateY(-40%);
    right: 0;
    width: 2px;
    height: 1em;
    display: ${props => (props.last > 1 ? 'block' : 'none')};
  `}
  position: absolute;
  box-sizing: border-box;
  background-color: #979797;
  content: '';
`

class DropDownMenu extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        link: PropTypes.shape(wellDefinedPropTypes.link.propTypes),
        pathname: PropTypes.string,
      })
    ),
  }
  static defaultProps = {
    onClick: () => {},
    data: [],
  }

  render() {
    const { data, onClick } = this.props

    const subMenuCount = data.length
    const menuJSX = _.map(data, (subMenuItem, index) => {
      return (
        <SubMenuBox key={subMenuItem.key}>
          <Link onClick={onClick} {...subMenuItem.link}>
            <SubMenuContent>{subMenuItem.label}</SubMenuContent>
          </Link>
          <Seperator last={subMenuCount - index} />
        </SubMenuBox>
      )
    })

    return (
      <ViewPort>
        <MenuBox>
          <MenuContent>{menuJSX}</MenuContent>
        </MenuBox>
      </ViewPort>
    )
  }
}

export default DropDownMenu
