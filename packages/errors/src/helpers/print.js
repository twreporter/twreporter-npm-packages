import helpers from './general'

function trimLinesFromTheBottom(string, trimmedCount) {
  if (!trimmedCount || !string) return string ?? ''
  const array = string.split(/\r?\n|\r/)
  if (array.length > trimmedCount) {
    array.splice(array.length - trimmedCount, trimmedCount);
  } else {
    array.splice(1, array.length - 1);
  }
  return array.join('\n');
}

/**
 * print the information of error
 *
 * @param {Error} error
 * @param {Object} fields
 * @param {boolean} fields.withStack
 * @param {boolean} fields.withPayload
 * @param {number} [trimStack=0] - how many lines that will be trimmed in the stack from the bottom
 * @returns {string}
 */
function printOne(error, fields, trimStack = 0) {
  const { withPayload = false, withStack = true } = fields
  let message = withStack
    ? trimLinesFromTheBottom(error.stack, trimStack).replace(/^\s+/gm, ' ')
    : `${error.name}: ${error.message}` // stack string contains name and message already
  if (withPayload) {
    message += `\n > payload ${JSON.stringify(error.payload)}`
  }
  return message
}

const defaultTrimStack =
  Error.stackTraceLimit > 1 ? Error.stackTraceLimit - 1 : 0

/**
 * print the information of all errors from cause to input errors
 *
 * @param {Error} error
 * @param {Object} fields
 * @param {boolean} [fields.withStack=true]
 * @param {boolean} [fields.withPayload=true]
 * @param {number} [limit=0] - how many errors will be printed from the cause. if limit = 0, all errors will be printed
 * @param {number} [trimCauseStack=defaultTrimStack] - how many frames of cause stack will be trimmed
 * @returns {string}
 */
function printAll(
  error,
  fields = {},
  limit = 0,
  trimCauseStack = defaultTrimStack
) {
  const { withStack = true, withPayload = true } = fields
  let joinedMessage = ''
  let _error = error
  const errorsChain = []
  while (_error) {
    errorsChain.push(_error)
    _error = helpers.unwrap(_error)
  }
  const chainLength = errorsChain.length
  const causeIndex = chainLength - 1
  const printEnd = limit ? chainLength - limit : 0
  for (let i = causeIndex; i >= printEnd; i--) {
    joinedMessage +=
      printOne(
        errorsChain[i],
        { withPayload: i === causeIndex ? false : withPayload, withStack },
        i === causeIndex ? trimCauseStack : 0
      ) + (i === printEnd ? '' : '\n')
  }
  return joinedMessage
}

export default {
  printOne,
  printAll,
}
