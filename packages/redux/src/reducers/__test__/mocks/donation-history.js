import actionTypes from '../../../constants/action-types'

const { donationHistory } = actionTypes

const ERROR_MSG = new Error('Unexpected error')

export const mockActions = {
  [donationHistory.donationHistory.read.request]: {
    type: donationHistory.donationHistory.read.request,
  },
  [donationHistory.donationHistory.read.success]: {
    type: donationHistory.donationHistory.read.success,
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
  [donationHistory.donationHistory.read.failure]: {
    type: donationHistory.donationHistory.read.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
  [donationHistory.periodicDonationHistory.read.request]: {
    type: donationHistory.periodicDonationHistory.read.request,
  },
  [donationHistory.periodicDonationHistory.read.success]: {
    type: donationHistory.periodicDonationHistory.read.success,
    payload: {
      data: {
        order_number: 'twreporter-171030007486335012920',
        meta: {
          total: 1,
          offset: 0,
          limit: 10,
        },
        records: [
          {
            created_at: '2024-03-08T07:43:38Z',
            order_number: 'twreporter-170988381804198200010',
            status: 'paid',
            amount: 300,
          },
        ],
        status: 'ok',
      },
    },
  },
  [donationHistory.periodicDonationHistory.read.failure]: {
    type: donationHistory.periodicDonationHistory.read.failure,
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
    periodicDonationHistory: {
      isFetching: false,
      records: {},
      error: null,
      offset: 0,
      total: 0,
      limit: 10,
    },
  },

  InitialStateWithHistory: {
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
    periodicDonationHistory: {
      isFetching: false,
      records: {},
      error: null,
      offset: 0,
      total: 0,
      limit: 10,
    },
  },

  ExpStateReq: {
    isFetching: true,
    donationHistory: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
    periodicDonationHistory: {
      isFetching: false,
      records: {},
      error: null,
      offset: 0,
      total: 0,
      limit: 10,
    },
  },

  ExpStateReqWithHistory: {
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
    periodicDonationHistory: {
      isFetching: true,
      records: {},
      error: null,
      offset: 0,
      total: 0,
      limit: 10,
    },
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
    periodicDonationHistory: {
      isFetching: false,
      records: {},
      error: null,
      offset: 0,
      total: 0,
      limit: 10,
    },
  },

  ExpStateSucWithPeriodicHistory: {
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
    periodicDonationHistory: {
      isFetching: false,
      records: {
        'twreporter-171030007486335012920': [
          {
            created_at: '2024-03-08T07:43:38Z',
            order_number: 'twreporter-170988381804198200010',
            status: 'paid',
            amount: 300,
          },
        ],
      },
      error: null,
      offset: 0,
      total: 1,
      limit: 10,
    },
  },

  ExpStateFail: {
    isFetching: false,
    donationHistory: [],
    error: ERROR_MSG,
    offset: 0,
    total: 0,
    limit: 10,
    periodicDonationHistory: {
      isFetching: false,
      records: {},
      error: null,
      offset: 0,
      total: 0,
      limit: 10,
    },
  },

  ExpStateFailWithHistory: {
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
    periodicDonationHistory: {
      isFetching: false,
      records: {},
      error: ERROR_MSG,
      offset: 0,
      total: 0,
      limit: 10,
    },
  },
}
