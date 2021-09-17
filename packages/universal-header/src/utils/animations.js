import { keyframes } from 'styled-components'

const changeOpacity = (valueFrom, valueTo) => keyframes`
  from {
    opacity: ${valueFrom};
  }
  to {
    opacity: ${valueTo};
  }
`

const changeHeight = (valueFrom, valueTo) => keyframes`
  from {
    height: ${valueFrom};
  }
  to {
    height: ${valueTo};
  }
`

const changeWidth = (valueFrom, valueTo) => keyframes`
  from {
    width: ${valueFrom};
  }
  to {
    width: ${valueTo};
  }
`

const changeTranslateX = (valueFrom, valueTo) => keyframes`
  from {
    transform: translateX(${valueFrom});
  }
  to {
    transform: translateX(${valueTo});
  }
`

export default {
  changeOpacity,
  changeHeight,
  changeWidth,
  changeTranslateX,
}
