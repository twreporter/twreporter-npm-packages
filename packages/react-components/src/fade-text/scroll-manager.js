const stopPropagation = e => {
  e.stopPropagation()
}

const animationStartStoper = node => {
  if (node) {
    node.addEventListener('webkitAnimationStart', stopPropagation)
    node.addEventListener('animationstart', stopPropagation)
  }
}

const animationEndStoper = node => {
  if (node) {
    node.addEventListener('webkitAnimationEnd', stopPropagation)
    node.addEventListener('animationend', stopPropagation)
  }
}

const childAnimationStoper = node => {
  animationStartStoper(node)
  animationEndStoper(node)
}

const unlockAfterAnimation = (node, scrollUnlocker) => {
  if (node) {
    animationStartStoper(node)
    node.addEventListener('webkitAnimationEnd', e => {
      scrollUnlocker(e)
    })
    node.addEventListener('animationend', e => {
      scrollUnlocker(e)
    })
  }
}

const lockBeforeAnimation = (node, srcollLocker) => {
  if (node) {
    animationEndStoper(node)
    node.addEventListener('webkitAnimationStart', e => {
      srcollLocker(e)
    })
    node.addEventListener('animationstart', e => {
      srcollLocker(e)
    })
  }
}

export default {
  unlockAfterAnimation,
  lockBeforeAnimation,
  childAnimationStoper,
}
