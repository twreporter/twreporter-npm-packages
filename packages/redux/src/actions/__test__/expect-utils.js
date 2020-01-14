/* global expect */

export function expectActionErrorObj(
  errorObj,
  expectedStatusCode,
  expectedAPIRes
) {
  expect(errorObj.statusCode).toBe(expectedStatusCode)
  expect(errorObj.data).toEqual(expectedAPIRes)
  expect(errorObj).toHaveProperty('config')
  expect(errorObj).toHaveProperty('headers')
  expect(errorObj).not.toHaveProperty('response')
  expect(errorObj).not.toHaveProperty('request')
  expect(errorObj).not.toHaveProperty('toJSON')
}
