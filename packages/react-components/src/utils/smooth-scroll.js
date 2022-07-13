// NOTE:
// We want a custom smooth scroll for internal anchors jumping, but we dont want to
// apply to all anchors, so copy the implementation of smoothScroll lib in npm:
// ref: https://github.com/alicelieutier/smoothScroll/blob/master/smoothscroll.js

const position = function(start, end, elapsed, duration) {
  if (elapsed > duration) return end
  return start + (end - start) * easeInOutCubic(elapsed / duration) // <-- you can change the easing funtion there
  // return start + (end - start) * (elapsed / duration) // <-- this would give a linear scroll
}

const getTop = function(element, start) {
  // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
  if (element.nodeName === 'HTML') return -start
  return element.getBoundingClientRect().top + start
}

const easeInOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

const defaultDuration = 500
export default function(el, duration, callback, context) {
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

/*
e.preventDefault()
const id = e?.target?.hash?.substring(1)
const element = document.getElementById(id)
*/
