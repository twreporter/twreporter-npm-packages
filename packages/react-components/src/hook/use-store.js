import { useContext, useState, useEffect } from 'react'
import { ReactReduxContext } from 'react-redux'

function useStore() {
  const { store } = useContext(ReactReduxContext)
  const { getState, dispatch, subscribe } = store

  const [storeState, setStoreState] = useState(getState())

  useEffect(() =>
    subscribe(() => {
      setStoreState(getState())
    }, [])
  )

  return [storeState, dispatch]
}

export default useStore
