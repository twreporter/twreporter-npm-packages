import { useState, useEffect } from 'react'
import FontFaceObserver from 'fontfaceobserver-es'

const useFontFaceObserver = (fontFaces = [], callback) => {
  const [isResolved, setIsResolved] = useState(false)
  const fontFacesString = JSON.stringify(fontFaces)

  useEffect(() => {
    const promises = JSON.parse(fontFacesString).map(
      ({ family, weight, style, stretch }) =>
        new FontFaceObserver(family, {
          weight,
          style,
          stretch,
        }).load('測試文字')
    )

    Promise.all(promises)
      .then(() => {
        if (typeof callback !== 'function') {
          return
        }
        callback()
        return setIsResolved(true)
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(`An error occurred during font loading`)
        console.log(e)
      })
  }, [fontFacesString, callback])

  return isResolved
}

export default useFontFaceObserver
