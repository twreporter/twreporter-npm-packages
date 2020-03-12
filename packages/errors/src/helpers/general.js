import AnnotatingError from '../annotating-error'

/**
 * Annotate the error with `name`, `message` and `payload`. It will return a new error that is an instance of `errors.AnnotatingError`.
 *
 * @param {Error} causer - the annotated error
 * @param {string} name - name of the annotating error
 * @param {string} message - message of the annotating error
 * @param {Object} payload - the context information for better debugging
 * @param {Function} [ignoreFrameFrom=wrap] - when collecting the stack trace all frames above the topmost call to this function, including that call, are left out of the stack trace
 * @param {number} [stackLimit] - the number of frames saved in the stack
 * @returns {AnnotatingError}
 */
function wrap(
  causer,
  name,
  message,
  payload,
  ignoreFrameFrom = wrap,
  stackLimit
) {
  return new AnnotatingError(
    causer,
    name,
    message,
    payload,
    ignoreFrameFrom,
    stackLimit
  )
}

/**
 * The function will invoke the `cause` method of the input error.
 * If the input error doesn't implement `unwrap`, the function will return the input method itself.
 *
 * @param {AnnotatingError|Error} error
 * @returns {AnnotatingError|Error} the earliest error in the chain that the input error belongs to
 */
function cause(error) {
  if (typeof error.cause === 'function') {
    return error.cause()
  }
  return error
}

/**
 * The function will invoke the `unwrap` method of the input error.
 * If the input error doesn't implement `unwrap`, the function will return `null`.
 *
 * @param {AnnotatingError|Error} error
 * @returns {AnnotatingError|Error|null} the previous error in the chain that the input error belongs to
 */
function unwrap(error) {
  if (typeof error.unwrap === 'function') {
    return error.unwrap()
  }
  return null
}

export default {
  wrap,
  cause,
  unwrap,
}
