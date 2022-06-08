import React from 'react'
import SnackBar from '../components/snack-bar'

export default {
  title: 'Snack Bar',
  component: SnackBar,
}

export const snackBar = props => <SnackBar {...props} />
snackBar.args = {
  text: '系統作業文字',
  theme: 'normal',
}
