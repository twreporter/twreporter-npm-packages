import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import styled from 'styled-components'
import wellDefinedPropTypes from '../constants/prop-types'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
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
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
  a,
  a:link,
  a:visited {
    width: 100%;
    border: 0;
    color: #808080;
    &:hover {
      color: ${colors.grayDark};
      background-color: rgba(0,0,0,0.1);
    }
  }
`

const SubMenuContent = styled.span`
  font-size: ${fonts.size.base};
  font-weight: ${fonts.weight.normal};
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
