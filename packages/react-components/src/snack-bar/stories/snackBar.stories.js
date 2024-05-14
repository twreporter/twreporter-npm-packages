/* eslint react/display-name:0 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// hooks
import useSnackBar from '../hooks/use-snack-bar'
// components
import SnackBar from '../components/snack-bar'
import { PillButton } from '../../button'
// storybook
import { THEME_STORYBOOK_ARG_TYPE } from '../../storybook/constants'
// lodash
import random from 'lodash/random'
const _ = {
  random,
}

export default {
  title: 'Snack Bar',
  component: SnackBar,
  argTypes: {
    theme: THEME_STORYBOOK_ARG_TYPE,
  },
}

export const snackBar = {
  args: {
    text: '系統作業文字',
    theme: SnackBar.THEME.normal,
  },
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`

const SnackBarContainer = styled.div`
  margin-bottom: 4px;
  transition: opacity 1s;
  opacity: ${(props) => (props.$showSnackBar ? 1 : 0)};
`

const ClickToShowSnackBar = ({ timeout }) => {
  const { toastr, showSnackBar, snackBarText } = useSnackBar()
  const handleClick = () => {
    const textPool = ['click!', 'hahaha', 'hello', 'world', 'yoyo']
    const text = textPool[_.random(0, 4)]
    toastr({ text, timeout })
  }

  return (
    <Container>
      <SnackBarContainer $showSnackBar={showSnackBar}>
        <SnackBar text={snackBarText} />
      </SnackBarContainer>
      <PillButton text="click me" onClick={handleClick} />
    </Container>
  )
}
ClickToShowSnackBar.propTypes = {
  timeout: PropTypes.number,
}

export const clickToShow = {
  render: (props) => <ClickToShowSnackBar {...props} />,
  parameters: { controls: { exclude: ['text', 'theme'] } },

  args: {
    timeout: 800,
  },
}
