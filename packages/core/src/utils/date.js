/**
 *
 * @export
 * @param {number} timestampInMs - UNIX timestamp in mileseconds
 * @param {string} separator - return string will be like 2019{separator}1{separator}31
 * @returns
 */
export function date2yyyymmdd(timestampInMs, separator = '.') {
  const date = new Date(timestampInMs)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return [year, mon, day].join(separator)
}
