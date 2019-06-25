import {
  labels as serviceLabels,
  configs as serviceConfigs,
} from '@twreporter/core/lib/constants/services'
import {
  order as channels,
  configs as channelConfigs,
} from '@twreporter/core/lib/constants/channels'
import * as linkType from '@twreporter/core/lib/constants/link-type'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
// assets
import BookmarkListIcon from '../assets/bookmark-list-icon.svg'
import DonationIcon from '../assets/donate-icon.svg'
import SearchIcon from '../assets/search-icon.svg'
import SignInIcon from '../assets/member-icon.svg'
import SignOutIcon from '../assets/signout.svg'
import SubscriptionIcon from '../assets/subscribe-icon.svg'

const _ = {
  get,
}

const serviceContent = ifAuthenticated => {
  const {
    SIGN_IN,
    SIGN_OUT,
    SEARCH,
    BOOKMARK,
    DONATION,
    SUSBSCRIPTION,
  } = serviceConfigs
  return [
    {
      ss: ifAuthenticated ? SIGN_OUT : SIGN_IN,
      Icon: ifAuthenticated ? SignOutIcon : SignInIcon,
    },
    { ss: SEARCH, Icon: SearchIcon },
    { ss: BOOKMARK, Icon: BookmarkListIcon },
    { ss: DONATION, Icon: DonationIcon },
    { ss: SUSBSCRIPTION, Icon: SubscriptionIcon },
  ]
}

const DEFAULT_HEIGHT_DIVISION = 90
const ROW_PER_COLUMN = 5
const DEFAULT_HEIGHT_FLEX_BOX = DEFAULT_HEIGHT_DIVISION * ROW_PER_COLUMN

const Container = styled.div`
  height: ${DEFAULT_HEIGHT_FLEX_BOX}px;
  margin-top: ${props => (props.isOpen ? 0 : `-${DEFAULT_HEIGHT_FLEX_BOX}px`)};
  width: 100%;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  background-color: ${props => (props.isIndex ? '#f2f2f2' : '#ffffff')};
  a {
    color: #262626;
  }
  display: none;
  ${mq.mobileOnly`
    display: flex;
  `}
  transition: margin-top 0.1s ease-in-out;
`

const ColumnFrame = styled.div`
  width: 50%;
`

const Division = styled.div`
  width: 100%;
  height: ${DEFAULT_HEIGHT_DIVISION}px;
  line-height: ${DEFAULT_HEIGHT_DIVISION}px;
  border: 0.5px solid #d8d7d7;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
`

const IconFrame = styled.div`
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

const TextFrame = styled.div`
  display: inline-block;
`

const ColumnChannel = ({ handlePanelOnClick }) => {
  const divisions = channels.map(channel => {
    const channelConfig = _.get(channelConfigs, channel, {})
    const channelPath = _.get(channelConfig, 'path', '')
    const channelPrefix = _.get(channelConfig, 'prefix', '')
    const channelText = _.get(channelConfig, 'text', '')
    return (
      <Division
        key={`Division_${channelText}`}
        onClick={() => {
          handlePanelOnClick(channelPrefix + channelPath)
        }}
      >
        <TextFrame>{channelText}</TextFrame>
      </Division>
    )
  })
  return <ColumnFrame>{divisions}</ColumnFrame>
}

ColumnChannel.propTypes = {
  handlePanelOnClick: PropTypes.func.isRequired,
}

class ColumnService extends React.PureComponent {
  componentWillMount() {
    const { authenticationContext } = this.context
    authenticationContext.subscribe(() => {
      this.forceUpdate()
    })
  }

  render() {
    const { authenticationContext } = this.context
    const { ifAuthenticated, signOutAction } = authenticationContext
    const { handlePanelOnClick } = this.props
    const divisions = serviceContent(ifAuthenticated).map(division => {
      const { ss, Icon } = division
      const divisionJSX = (
        <Division>
          <IconFrame>
            <Icon />
          </IconFrame>
          <TextFrame>{ss.label}</TextFrame>
        </Division>
      )
      if (ss.type === linkType.external) {
        return (
          <a
            key={`Division_${ss.label}`}
            href={ss.path}
            target="_blank"
            rel="noopener noreferrer"
          >
            {divisionJSX}
          </a>
        )
      }
      return (
        <div
          key={`Division_${ss.label}`}
          role="button"
          tabIndex="-1"
          onClick={() => {
            if (ss.label === serviceLabels.SIGN_OUT && ifAuthenticated) {
              signOutAction()
            }
            handlePanelOnClick(ss.path)
          }}
        >
          {divisionJSX}
        </div>
      )
    })
    return <ColumnFrame>{divisions}</ColumnFrame>
  }
}

ColumnService.propTypes = {
  handlePanelOnClick: PropTypes.func.isRequired,
}

ColumnService.contextTypes = {
  // context.ifAuthenticated and context.signOutAction
  // should be passed in the context by Clients who using this React Component
  // ifAuthenticated: PropTypes.bool.isRequired,
  // signOutAction: PropTypes.func.isRequired,
  authenticationContext: PropTypes.object.isRequired,
}

const duration = 100

class SlideDownPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.handlePanelOnClick = this._handleOnClick.bind(this)
  }

  _handleOnClick(pushTo) {
    // if current page is homepage,
    // and users want to go to categories section,
    // just scroll to that section by id.
    const { isIndex } = this.props
    if (
      isIndex &&
      pushTo ===
        channelConfigs.categories.prefix + channelConfigs.categories.path
    ) {
      const elem = document.getElementById('categories')
      const offsetTop = _.get(elem, 'offsetTop', 0)
      if (offsetTop) {
        return smoothScroll(offsetTop)
      }
    } else {
      // if users want to go to other pages,
      // close panel first,
      // and then redirect to the page
      this.setState({
        isOpen: !this.state.isOpen,
      })
      const redirect = () => {
        this.context.router.push(pushTo)
      }
      if (pushTo) {
        // give `duration` + 100 ms buffer to open/close the panel
        setTimeout(redirect.bind(this), duration + 100)
      }
    }
  }

  render() {
    const { isOpen } = this.state
    const { isIndex } = this.props
    return (
      <Container isIndex={isIndex} isOpen={isOpen}>
        <ColumnChannel handlePanelOnClick={this.handlePanelOnClick} />
        <ColumnService handlePanelOnClick={this.handlePanelOnClick} />
      </Container>
    )
  }
}

SlideDownPanel.defaultProps = {
  isIndex: false,
}

SlideDownPanel.propTypes = {
  isIndex: PropTypes.bool,
}

SlideDownPanel.contextTypes = {
  // context.router is passed by react-router.Router
  // Hence, SlideDownPanel should be the descendant of the Router
  router: PropTypes.object.isRequired,
}

export default SlideDownPanel
