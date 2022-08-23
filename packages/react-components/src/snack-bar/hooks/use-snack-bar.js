import { useState, useEffect } from 'react'

const useSnackBar = ref => {
  const [showSnackBar, setShowSnackBar] = useState(false)
  const toastr = ({ timeout = 3000 }) => {
    setShowSnackBar(true)
    setTimeout(() => {
      setShowSnackBar(false)
    }, timeout)
  }

  useEffect(() => {
    const refElem = ref.current
    if (!refElem) {
      return
    }
    const opacity = showSnackBar ? 1 : 0

    refElem.style.opacity = opacity
  }, [showSnackBar, ref])

  return toastr
}

export default useSnackBar
