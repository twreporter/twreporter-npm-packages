import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SnackBar from '../components/snack-bar'
import useSnackBar from '../hooks/use-snack-bar'
import { PillButton } from '../../button'

export default {
  title: 'Snack Bar',
  component: SnackBar,
}

export const snackBar = props => <SnackBar {...props} />
snackBar.args = {
  text: '系統作業文字',
  theme: 'normal',
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
  opacity: 0;
`

const ClickToShowSnackBar = ({ timeout }) => {
  const ref = useRef()
  const toastr = useSnackBar(ref)
  const handleClick = () => toastr({ timeout })

  return (
    <Container>
      <SnackBarContainer ref={ref}>
        <SnackBar text="click!" />
      </SnackBarContainer>
      <PillButton text="click me" onClick={handleClick} />
    </Container>
  )
}
ClickToShowSnackBar.propTypes = {
  timeout: PropTypes.number,
}

export const clickToShow = props => <ClickToShowSnackBar {...props} />
clickToShow.parameters = { controls: { exclude: ['text', 'theme'] } }
clickToShow.args = {
  timeout: 800,
}
