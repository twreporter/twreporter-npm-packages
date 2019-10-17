import React from 'react'
import PropTypes from 'prop-types'
import VelocityComponent from 'velocity-react/velocity-component'

export const Animate = ({ animation, onAnimationFinish, children }) => {
  return (
    <VelocityComponent animation={animation} complete={onAnimationFinish}>
      {children}
    </VelocityComponent>
  )
}

Animate.defaultProps = {
  animation: 'none',
  onAnimationFinish: () => {},
  children: [],
}

Animate.propTypes = {
  animation: PropTypes.string,
  onAnimationFinish: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element),
}

// function Animate({ animation, className,
//   children, delay, duration,
//   easing, imgAlt, imgSrc, onAnimationFinish }) {
//   return (
//     <VelocityComponent
//       animation={animation}
//       duration={duration}
//       delay={delay}
//       complete={onAnimationFinish}
//       easing={easing}
//     >
//       <div className={className}>
//         <img src={imgSrc} alt={imgAlt} role="presentation" />
//         { children }
//       </div>
//     </VelocityComponent>
//   );
// }
