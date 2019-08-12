import HeaderContext from '../contexts/header-context'
import Link from './customized-link'
import PropTypes from 'prop-types'
import React from 'react'
import colors from '../constants/colors'
import styled from 'styled-components'
import themeUtils from '../utils/theme'
import wellDefinedPropTypes from '../constants/prop-types'
import { screen } from '../utils/style-utils'

const defaultFlexBoxItemHeight = 90
const rowPerColumn = 5
const defaultFlexBoxHeight = defaultFlexBoxItemHeight * rowPerColumn

const FlexBox = styled.div`
  height: ${defaultFlexBoxHeight}px;
  margin-top: ${props =>
    props.toSlideDown ? 0 : `-${defaultFlexBoxHeight}px`};
  width: 100%;
  text-align: center;
  flex-wrap: wrap;
  align-content: center;
  background-color: ${props => props.bgColor};
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: ${colors.gray15};
  }
  display: none;
  ${screen.mobileOnly`
    display: flex;
  `}
  transition: margin-top 0.1s ease-in-out;
`

const FlexItem = styled.div`
  width: 50%;
  height: ${defaultFlexBoxItemHeight}px;
  line-height: ${defaultFlexBoxItemHeight}px;
  border: 0.5px solid #d8d7d7;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
`

const IconBox = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
  margin-right: 20px;
  svg {
    height: 100%;
    position: absolute;
    left: 50%;
    top: 58%;
    transform: translate(-50%, -50%);
  }
`

const Text = styled.div`
  display: inline-block;
`

class SubMenuFlexItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.shape(wellDefinedPropTypes.link.propTypes).isRequired,
    icon: PropTypes.oneOfType([ PropTypes.element, PropTypes.object ]),
    handleClick: PropTypes.func,
  }

  static defaultProps = {
    icon: null,
    handleClick: () => {},
  }

  render() {
    const { handleClick, icon, label, link } = this.props
    return (
      <FlexItem>
        <Link {...link} onClick={handleClick}>
          <div>
            {icon ? <IconBox>{icon}</IconBox> : null}
            <Text>{label}</Text>
          </div>
        </Link>
      </FlexItem>
    )
  }
}

class MobileSlideDownMenu extends React.PureComponent {
  static defaultProps = {
    data: [],
    toSlideDown: false,
    handleClick: () => {},
  }

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.element,
        link: PropTypes.shape(wellDefinedPropTypes.link.propTypes),
      })
    ),
    toSlideDown: PropTypes.bool,
    handleClick: PropTypes.func,
  }

  render() {
    const { data, handleClick, toSlideDown } = this.props

    return (
      <HeaderContext.Consumer>
        {({ theme }) => {
          const bgColor = themeUtils.selectMobileSlideDownMenuBgColor(theme)
          return (
            <FlexBox bgColor={bgColor} toSlideDown={toSlideDown}>
              {data.map(subMenuItem => (
                <SubMenuFlexItem
                  key={subMenuItem.key}
                  icon={subMenuItem.icon}
                  link={subMenuItem.link}
                  label={subMenuItem.label}
                  handleClick={handleClick}
                />
              ))}
            </FlexBox>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default MobileSlideDownMenu
