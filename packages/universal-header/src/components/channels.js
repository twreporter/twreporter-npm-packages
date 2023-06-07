import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
// util
import { getLink } from '../utils/links'
// constant
import {
  DESKTOP_CHANNEL_ORDER,
  CHANNEL_KEY,
  CHANNEL_LABEL,
  CHANNEL_PATH,
} from '../constants/channels'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import {
  CATEGORY_ORDER,
  CATEGORY_LABEL,
} from '@twreporter/core/lib/constants/category-set'
import { IconButton, TextButton } from '@twreporter/react-components/lib/button'
import { Hamburger } from '@twreporter/react-components/lib/icon'
import Divider from '@twreporter/react-components/lib/divider'
// lodash
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import concat from 'lodash/concat'
const _ = {
  map,
  reduce,
  concat,
}

const Item = styled.div`
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
  }
`
const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
`
const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChannelItem = ({ link = {}, label = '' }) => {
  const { theme } = useContext(HeaderContext)
  return (
    <Item>
      <Link {...link}>
        <TextButton
          text={label}
          size="L"
          theme={theme}
          style={TextButton.Style.DARK}
        />
      </Link>
    </Item>
  )
}
ChannelItem.propTypes = {
  link: PropTypes.object,
  label: PropTypes.string,
}

const Channel = ({ onClickHambuger, ...props }) => {
  const { isLinkExternal, releaseBranch, theme } = useContext(HeaderContext)
  const hamburgerIcon = <Hamburger releaseBranch={releaseBranch} />
  const ItemJSX = _.reduce(
    DESKTOP_CHANNEL_ORDER,
    (res, channelKey) => {
      if (channelKey === CHANNEL_KEY.category) {
        const categoryJSX = _.map(CATEGORY_ORDER, categoryKey => {
          const label = CATEGORY_LABEL[categoryKey]
          const path = `/categories/${categoryKey}`
          const link = getLink(isLinkExternal, releaseBranch, path)
          return <ChannelItem key={categoryKey} label={label} link={link} />
        })
        res = _.concat(res, categoryJSX)
      } else {
        const label = CHANNEL_LABEL[channelKey]
        const link = getLink(
          isLinkExternal,
          releaseBranch,
          CHANNEL_PATH[channelKey]
        )
        if (label && link) {
          res.push(<ChannelItem key={channelKey} label={label} link={link} />)
        }
      }
      return res
    },
    []
  )

  return (
    <ChannelContainer {...props}>
      <CategoryContainer>
        <IconButton
          iconComponent={hamburgerIcon}
          theme={theme}
          onClick={onClickHambuger}
        />
        {ItemJSX}
      </CategoryContainer>
      <Divider />
    </ChannelContainer>
  )
}
Channel.propTypes = {
  onClickHambuger: PropTypes.func,
}

export default Channel
