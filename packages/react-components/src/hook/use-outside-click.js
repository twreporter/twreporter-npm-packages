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

    // to work with react synthetic events, we need to add event handler on window instead of document
    // ref: https://dev.to/dvnrsn/why-isn-t-event-stoppropagation-working-1bnm
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [ref, callback])

  return ref
}

export default useOutsideClick
