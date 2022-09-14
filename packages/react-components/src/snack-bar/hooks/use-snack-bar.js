import { useState } from 'react'

const useSnackBar = () => {
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [snackBarText, setSnackBarText] = useState('')
  const toastr = ({ text = '', timeout = 3000 }) => {
    setSnackBarText(text)
    setShowSnackBar(true)
    setTimeout(() => {
      setShowSnackBar(false)
    }, timeout)
  }

  return { toastr, showSnackBar, snackBarText }
}

export default useSnackBar
