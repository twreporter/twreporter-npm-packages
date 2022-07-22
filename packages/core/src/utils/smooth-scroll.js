// NOTE:
// 1. behavior: 'smooth' of window.scroll() is not supported by Safari, so we need a custom smooth scroll.
// 2. The underline anchors in TOC is actually not <a> but <H1>, so we can't use 'smooth-scroll' lib
//    which is developed specifically for <a>. Here is a workaround to copy the smooth scroll behavior
//    of 'smoothScroll' lib. (ref: https://github.com/alicelieutier/smoothScroll/blob/master/smoothscroll.js)
//    P.S. We don't use 'smoothScroll' directly due to it will apply smooth scroll behavior to ALL anchors
//    in the website automatically.

const defaultDuration = 500
export default function(el, duration, callback, context) {
  const position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end
    return start + (end - start) * easeInOutQuint(elapsed / duration) // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration) // <-- this would give a linear scroll
  }

  const getTop = function(element, start) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if (element.nodeName === 'HTML') return -start
    return element.getBoundingClientRect().top + start
  }

  const easeInOutQuint = function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
  }

  duration = duration || defaultDuration
  context = context || window
  var start = context.scrollTop || window.pageYOffset
  var end
  if (typeof el === 'number') {
    end = parseInt(el)
  } else {
    end = getTop(el, start)
  }
  var clock = Date.now()
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(fn) {
      window.setTimeout(fn, 15)
    }
  var step = function() {
    var elapsed = Date.now() - clock
    if (context !== window) {
      context.scrollTop = position(start, end, elapsed, duration)
    } else {
      window.scroll(0, position(start, end, elapsed, duration))
    }
    if (elapsed > duration) {
      if (typeof callback === 'function') {
        callback(el)
      }
    } else {
      requestAnimationFrame(step)
    }
  }
  step()
}
