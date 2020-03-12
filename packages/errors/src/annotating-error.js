export default class AnnotatingError extends Error {
  /**
   * Creates an instance of AnnotatingError.
   * @param {Error} causer
   * @param {string} name - name of this error
   * @param {string} message - message of this error
   * @param {Object} payload - the context information for better debugging
   * @param {Function} [ignoreFrameFrom=AnnotatingError] - when collecting the stack trace all frames above the topmost call to this function, including that call, are left out of the stack trace
   * @param {number} [frameLimit=1] - the number of frames saved in the stack
   * @memberof AnnotatingError
   */
  constructor(
    causer,
    name,
    message,
    payload,
    ignoreFrameFrom = AnnotatingError,
    stackLimit = 1
  ) {
    super(message)
    this._causer = causer
    /**
     * @type {Object} the context information for better debugging
     * @public
     */
    this.payload = payload
    /**
     * @type {string} the stack trace from where the error be constructed. it contains the name and message of the error in the V8 engine
     * @public
     */
    this.stack = ''
    this._setStack(ignoreFrameFrom, stackLimit)
    /**
     * @type {string} the name of this error
     * @public
     */
    this.name = name || 'Error'
  }

  _setStack(ignoreFrameFrom, stackLimit) {
    if (Error.captureStackTrace) {
      const originalStackTraceLimit = Error.stackTraceLimit
      Error.stackTraceLimit = stackLimit
      Error.captureStackTrace(this, ignoreFrameFrom)
      Error.stackTraceLimit = originalStackTraceLimit
    }
  }

  /**
   *
   *
   * @returns {Error} the earliest error in the chain in which this error locates
   * @memberof AnnotatingError
   * @public
   */
  cause() {
    let causer = this._causer
    while (causer) {
      if (typeof causer.cause === 'function') {
        causer = causer.cause()
      } else {
        break
      }
    }
    return causer
  }

  /**
   *
   *
   * @returns {Error} the previous error in the chain in which this error locates
   * @memberof AnnotatingError
   * @public
   */
  unwrap() {
    if (this._causer) {
      return this._causer
    }
    return null
  }
}
