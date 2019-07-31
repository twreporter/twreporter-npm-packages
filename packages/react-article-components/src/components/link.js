import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const A = styled.a`
  text-decoration: none;
`

export default class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
  }

  render() {
    const { to, ...rest } = this.props
    return <A href={to} {...rest} />
  }
}
