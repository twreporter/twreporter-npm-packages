import detectEnv from '../utils/detect-env'
import localForage from 'localforage'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import reduxStatePropKey from '../constants/redux-state-field-names'

/*
  WARNING:
  The following functions are built for client side rendering, do not use them on the server side.
*/

const defaultMaxAge = 600

const _ = {
  merge,
  pick,
}

const keys = {
  expires: 'redux_state_expires',
  state: 'redux_state',
}

/*
  When a value in new state has conflict with the one in cached state, we will take the new value by default.
  If there's any prop that we want it always take the cahched value first (except the whole cache was expired), add it to the array below.
*/
const cachedFirstProps = [
  reduxStatePropKey.nextNotifyPopupTS,
  reduxStatePropKey.settings,
]

/*
  Only properties in white list `cacheableProps` will be stored into the browser storage.
  WARNING: do not select those properties related to personal data, such as bookmarks, auth ...etc.
*/
const cacheableProps = [
  reduxStatePropKey.entities,
  reduxStatePropKey.indexPage,
  reduxStatePropKey.lists,
  reduxStatePropKey.topicList,
  reduxStatePropKey.selectedPost,
  reduxStatePropKey.selectedTopic,
  reduxStatePropKey.entitiesForAuthors,
  ...cachedFirstProps,
  // TODO: author list page and author page have some bugs
  // after merging browser storage data. Hence, comment it just for now.
  // reduxStatePropKey.searchedAuthorsList,
  // reduxStatePropKey.authorsList,
  // reduxStatePropKey.articlesByAuthor,
]

/**
 * Check if the redux state copy in the browser storage expired or not
 *
 * @returns {Promise<boolean>} - A promise, resolve with true or false
 */
async function isReduxStateExpired() {
  if (!detectEnv.isBrowser()) {
    throw new Error(
      'isReduxStateExpired function should be executed on client side'
    )
  }
  const expires = await localForage.getItem(keys.expires)
  const now = Date.now()
  if (typeof expires !== 'number' || typeof now !== 'number') {
    return true
  }
  return now > expires
}

/**
 * Set redux state into localStoroage as a copy.
 * However, it will refine the redux state before setting.
 *
 * @param {Object} reduxState - redux state
 * @returns {Promise<Object>} A Promise, resolve with redux state
 */
async function setReduxState(reduxState) {
  if (!detectEnv.isBrowser()) {
    throw new Error('setReduxState function should be executed on client side')
  }
  await localForage.setItem(keys.state, reduxState)
  return localForage.getItem(keys.state)
}

/**
 * Set redux state expire time into localStoroage.
 *
 * @param {number} [maxAge=600] - measure in seconds
 * @returns {Promise<number>} A Promise, resolve with a Number representing the milliseconds elapsed since the UNIX epoch
 */
async function setReduxStateExpires(maxAge = defaultMaxAge) {
  if (!detectEnv.isBrowser()) {
    throw new Error(
      'setReduxStateExpires function should be executed on client side'
    )
  }
  const expires = Date.now() + maxAge * 1000
  await localForage.setItem(keys.expires, expires)
  return localForage.getItem(keys.expires)
}

/**
 * Get redux state copy in the browser storage
 *
 * @returns {Promise<Object>}  A Promise, resolve with a redux state copy in the browser storage
 */
function getStateFromStorage() {
  if (!detectEnv.isBrowser()) {
    return Promise.reject(
      new Error(
        'Method `browser-storage.getStateFromStorage` should be executed on client side'
      )
    )
  }
  return localForage.getItem(keys.state)
}

/**
 * Synchronize the redux state in the store with its copy in the browser storage.
 *
 * @export
 * @param {Object} newReduxState - redux state you want to set into browser storage
 * @param {number} [maxAge=600] - default value is 600 seconds. Date.now() + maxAge = expire time
 * @returns {Object} - return synced state
 */
export async function syncReduxState(newReduxState, maxAge = defaultMaxAge) {
  const isCacheExpired = await isReduxStateExpired()
  const cachedState = await getStateFromStorage()
  const cacheFirstState = _.pick(cachedState, cachedFirstProps)
  // If the cache is expired, we will not take the cached state in storage.
  // But we will always take `cacgeFirstState` if it exists.
  const syncedState = _.merge(
    {},
    isCacheExpired ? null : cachedState,
    newReduxState,
    cacheFirstState
  )
  const toCacheState = _.pick(syncedState, cacheableProps)
  // Save state to storage asynchronously. So it will not block other tasks.
  setReduxState(toCacheState).then(() => {
    return setReduxStateExpires(maxAge)
  })
  return syncedState
}

/**
 * Pick cacheable state and save it to browser storage
 *
 * @export
 * @param {Object} newReduxState - redux state you want to set into browser storage
 * @param {number} [maxAge=600] - default value is 600 seconds. Date.now() + maxAge = expire time
 * @returns {Promise<undefined>} - void promise resolved to undefined
 */
export async function saveCacheableStateToStorage(
  newReduxState,
  maxAge = defaultMaxAge
) {
  const toCacheState = _.pick(newReduxState, cacheableProps)
  await setReduxState(toCacheState)
  await setReduxStateExpires(maxAge)
}
