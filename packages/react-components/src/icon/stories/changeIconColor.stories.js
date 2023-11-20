import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Article } from '../index'

const IconContainer = styled.div`
  svg {
    background-color: ${props => props.color};
  }
`

const ChangeIconColor = ({ color }) => (
  <IconContainer color={color}>
    <Article />
  </IconContainer>
)
ChangeIconColor.propTypes = {
  color: PropTypes.string,
}

export default {
  title: 'Icon/Change Icon Color',
  component: ChangeIconColor,
  argTypes: {
    color: {
      control: { type: 'color', presetColors: ['red', 'green'] },
    },
  },
}

export const changeIconColor = {}
