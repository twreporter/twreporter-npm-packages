import { useRef, useEffect } from 'react'

const useOutsideClick = callback => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = event => {
      if (typeof callback !== 'function') {
        return
      }
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])

  return ref
}

export default useOutsideClick
