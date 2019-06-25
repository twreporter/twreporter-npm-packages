import { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const linkUnderline = css`
  animation: ${fadeIn} 0.5s linear;
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  content: '';
  width: 100%;
  height: 3px;
  background-color: red;
`

export const categoriesMenuEffect = css`
  .effect-enter {
    max-height: 0;
  }

  .effect-enter.effect-enter-active {
    max-height: 400px;
    transition: max-height 600ms ease-in 100ms;
  }

  .effect-leave {
    max-height: 400px;
  }

  .effect-leave.effect-leave-active {
    max-height: 0;
    transition: max-height 400ms ease-out;
  }
`

export const searchBoxEffect = css`
  .effect-enter {
    opacity: 0;
    right: -20px;
  }

  .effect-enter.effect-enter-active {
    opacity: 1;
    right: 0;
    transition: opacity 500ms ease, right 500ms ease;
  }

  .effect-leave {
    opacity: 1;
    right: 0;
  }

  .effect-leave.effect-leave-active {
    opacity: 0;
    right: -20px;
    transition: opacity 200ms ease, right 200ms ease;
  }
`
