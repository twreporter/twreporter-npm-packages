import Header from '../components/header'
import HeaderContext from '../contexts/header-context'
import MobileHeader from '../components/mobile-header'
import PropTypes from 'prop-types'
import React from 'react'
import categoryConst from '../constants/categories'
import channelConst from '../constants/channels'
import actionConst from '../constants/actions'
import linkUtils from '../utils/links'
import serviceConst from '../constants/services'
import styled from 'styled-components'
import wellDefinedPropTypes from '../constants/prop-types'
import { connect } from 'react-redux'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const MobileOnly = styled.div`
  display: none;

  ${mq.mobileOnly`
    display: block;
  `}
`

const TabletOnly = styled.div`
  display: none;

  ${mq.tabletOnly`
    display: block;
  `}
`

const DesktopAndAbove = styled.div`
  display: none;

  ${mq.desktopAndAbove`
    display: block;
  `}
`

function mergeTwoArraysInOrder(arr1 = [], arr2 = []) {
  const rtn = []
  const maxLength = Math.max(arr1.length, arr2.length)

  for (let i = 0; i < maxLength; i++) {
    if (arr1[i]) {
      rtn.push(arr1[i])
    }
    if (arr2[i]) {
      rtn.push(arr2[i])
    }
  }

  return rtn
}

class Container extends React.PureComponent {
  static defaultProps = {
    ...wellDefinedPropTypes.context.defaultProps,
    pathname: '',
  }
  static propTypes = {
    ...wellDefinedPropTypes.context.propTypes,
    pathname: PropTypes.string,
  }

  __prepareServiceProps(isAuthed) {
    const serviceProps = _.map(serviceConst.serviceOrder, key => ({ key }));

    if (isAuthed) {
      const logoutKey = serviceConst.serviceKeys.logout
      serviceProps.push({ key: logoutKey })
    } else {
      const loginKey = serviceConst.serviceKeys.login
      serviceProps.push({ key: loginKey })
    }

    return serviceProps
  }

  __prepareChannelProps(releaseBranch, isLinkExternal) {
    const channelProps = _.map(channelConst.channelOrder, (key) => {
      return {
        key,
        label: channelConst.channelLabels[key],
        type: channelConst.channelTypes[key],
        pathname: channelConst.channelPathnames[key],
        link: linkUtils.getChannelLinks(isLinkExternal, releaseBranch)[key],
      }
    })

    return channelProps
  }

  __prepareCategoriesProps(releaseBranch, isLinkExternal, channelProps) {
    channelProps[
      channelProps.length - 1
    ].dropDownMenu = _.map(categoryConst.categoryOrder, (key) => {
      return {
        key,
        label: categoryConst.categoryLabels[key],
        pathname: categoryConst.categoryPathnames[key],
        link: linkUtils.getCategoryLinks(isLinkExternal, releaseBranch)[key],
      }
    })
  }

  __prepareActionProps() {
    const mobileActionProps = _.map(actionConst.actionOrder.mobile, (key) => ({ key }))
    const desktopAndTabletActionProps = _.map(actionConst.actionOrder.desktop, (key) => ({ key }))

    return {
      mobile: mobileActionProps,
      tablet: desktopAndTabletActionProps,
      hamburger: desktopAndTabletActionProps,
      desktop: desktopAndTabletActionProps,
    }
  }

  render() {
    const {
      releaseBranch,
      isAuthed,
      isLinkExternal,
      theme,
      ...passThrough
    } = this.props
    const contextValue = {
      releaseBranch,
      isAuthed,
      isLinkExternal,
      theme,
    }

    const serviceProps = this.__prepareServiceProps(
      isAuthed,
    )
    const channelProps = this.__prepareChannelProps(
      releaseBranch,
      isLinkExternal
    )
    const actionProps = this.__prepareActionProps();

    this.__prepareCategoriesProps(releaseBranch, isLinkExternal, channelProps)

    return (
      <HeaderContext.Provider value={contextValue}>
        <MobileOnly>
          <MobileHeader
            actions={actionProps.mobile}
            menuChannels={channelProps}
            menuServices={serviceProps}
            menuActions={actionProps.hamburger}
            {...passThrough}
          />
        </MobileOnly>
        <TabletOnly>
          <MobileHeader
            actions={actionProps.tablet}
            menuChannels={channelProps}
            menuServices={serviceProps}
            menuActions={actionProps.hamburger}
            {...passThrough}
          />
        </TabletOnly>
        <DesktopAndAbove>
          <Header
            channels={channelProps}
            services={serviceProps}
            actions={actionProps.desktop}
            {...passThrough}
          />
        </DesktopAndAbove>
      </HeaderContext.Provider>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthed: _.get(state, 'auth.isAuthed', false),
    // bookmarks: _.get(state, 'header.bookmarks'),
    // notifications: _.get(state, 'headers.notifications'),
  }
}

export default connect(mapStateToProps)(Container)
