import get from 'lodash.get'

const _ = {
  get,
}

/**
 *  Decode the payload of JWT from base64 string into JSON object
 *
 *  @param {string} jwt
 *  @return {Object} JSON object or null if decoding fails
 */
function decodePayload(jwt) {
  try {
    const payload = _.get(jwt.split('.'), 1)
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  } catch (err) {
    console.warn('extract payload from jwt error: ', err) // eslint-disable-line
    return null
  }
}

export default {
  decodePayload,
}
