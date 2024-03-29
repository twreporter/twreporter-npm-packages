/* eslint react/display-name:0 */
import React from 'react'
import Divider from './divider'
import styled from 'styled-components'

export default {
  title: 'Divider/Line',
  component: Divider,
}

const flexDirection = {
  vertical: 'row',
  horizontal: 'column',
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => flexDirection[props.direction]};
  align-items: center;
  justify-content: space-between;
  height: 250px;
  width: 250px;
`

const Cube = styled.div`
  height: 100px;
  width: 100px;
  background-color: #aaa;
`

const VerticalContainer = styled.div`
  height: 200px;
`

export const divider = {
  render: args => (
    <FlexContainer {...args}>
      <Cube />
      <Divider {...args} />
      <Cube />
    </FlexContainer>
  ),

  args: { direction: Divider.Direction.HORIZONTAL },
}

export const horizontal = {
  render: () => <Divider direction={Divider.Direction.HORIZONTAL} />,

  parameters: { controls: { exclude: ['direction'] } },
}

export const vertical = {
  render: () => (
    <VerticalContainer>
      <Divider direction={Divider.Direction.VERTICAL} />
    </VerticalContainer>
  ),

  parameters: { controls: { exclude: ['direction'] } },
}
