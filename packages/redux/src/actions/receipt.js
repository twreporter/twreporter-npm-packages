import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// utils
import { formURL } from '../utils/url'
// constants
import apiEndpoints from '../constants/api-endpoints'
import stateFieldNames from '../constants/redux-state-field-names'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const receiptApi = createApi({
  reducerPath: 'receiptApi',
  baseQuery: async (args, api, extraOptions) => {
    const { getState } = api
    const state = getState()
    const apiOrigin = _.get(state, [stateFieldNames.origins, 'api'])
    const baseUrl = formURL(apiOrigin, `/v1/${apiEndpoints.receipt}`)

    const rawBaseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: headers => {
        headers.set('Accept', 'application/pdf')
        return headers
      },
    })
    return rawBaseQuery(args, api, extraOptions)
  },
  endpoints: builder => ({
    getPrimeReceipt: builder.query({
      query: ({ orderNumber, jwt }) => ({
        url: `?order=${orderNumber}`,
        method: 'GET',
        responseHandler: response => response.blob(),
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    }),
  }),
})

export const { useLazyGetPrimeReceiptQuery } = receiptApi

export default receiptApi
