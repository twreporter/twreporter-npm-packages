import actionTypes from '../../../constants/action-types'

const { donationHistory } = actionTypes

const ERROR_MSG = new Error('Unexpected error')

export const mockActions = {
  [donationHistory.read.request]: {
    type: donationHistory.read.request,
  },
  [donationHistory.read.success]: {
    type: donationHistory.read.success,
    payload: {
      data: {
        meta: {
          total: 1,
          offset: 0,
          limit: 10,
        },
        records: [
          {
            id: 11446,
            type: 'periodic',
            amount: 300,
            created_at: '2024-03-13T03:21:15Z',
            order_number: 'twreporter-171030007486335012920',
            send_receipt: 'no_receipt',
            status: 'paid',
            pay_method: 'credit_card',
            bin_code: '424242',
            first_name: null,
            last_name: null,
            receipt_header: null,
            address_country: null,
            address_state: null,
            address_city: null,
            address_detail: null,
            address_zip_code: null,
          },
        ],
        status: 'ok',
      },
    },
  },
  [donationHistory.read.failure]: {
    type: donationHistory.read.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
}

export const mockStates = {
  InitialState: {
    isFetching: false,
    donationHistory: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
  },

  ExpStateReq: {
    isFetching: true,
    donationHistory: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
  },

  ExpStateSuc: {
    isFetching: false,
    donationHistory: [
      {
        id: 11446,
        type: 'periodic',
        amount: 300,
        created_at: '2024-03-13T03:21:15Z',
        order_number: 'twreporter-171030007486335012920',
        send_receipt: 'no_receipt',
        status: 'paid',
        pay_method: 'credit_card',
        bin_code: '424242',
        first_name: null,
        last_name: null,
        receipt_header: null,
        address_country: null,
        address_state: null,
        address_city: null,
        address_detail: null,
        address_zip_code: null,
      },
    ],
    error: null,
    offset: 0,
    total: 1,
    limit: 10,
  },

  ExpStateFail: {
    isFetching: false,
    donationHistory: [],
    error: ERROR_MSG,
    offset: 0,
    total: 0,
    limit: 10,
  },

  ExpStateUpdateSuc: {
    isFetching: false,
    donationHistory: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
  },
}
