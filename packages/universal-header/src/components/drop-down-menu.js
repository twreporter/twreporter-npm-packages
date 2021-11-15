import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import styled from 'styled-components'
import wellDefinedPropTypes from '../constants/prop-types'
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

const styles = {
  subMenuHeight: {
    mobile: 58, // px
    desktop: 46, // px
  },
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
  background-color: ${colorGrayscale.white};
  user-select: none;
`

const MenuContent = styled.ul`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`

const SubMenuBox = styled.li`
  display: flex;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  margin: 0;
  border-bottom: 1px solid ${colorGrayscale.gray200};
  width: 100%;
  height: ${styles.subMenuHeight.mobile}px;
  ${mq.desktopAndAbove`
    height: ${styles.subMenuHeight.desktop}px;
  `}
  a,
  a:link,
  a:visited {
    width: 100%;
    border: 0;
    color: ${colorGrayscale.gray600};
    &:hover {
      color: ${colorGrayscale.gray900};
      background-color: ${colors.gray150};
    }
  }
`

const SubMenuContent = styled.span`
  font-size: ${fonts.size.base};
  font-weight: ${fonts.weight.bold};
  cursor: pointer;
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

    const menuJSX = _.map(data, (subMenuItem, index) => {
      return (
        <SubMenuBox key={subMenuItem.key}>
          <Link onClick={onClick} {...subMenuItem.link}>
            <SubMenuContent>{subMenuItem.label}</SubMenuContent>
          </Link>
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
