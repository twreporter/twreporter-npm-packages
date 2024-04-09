const mockUserId = 1
const mockOrderNumber = 'twreporter-171030007486335012920'

const mockGetUserDonationHistoryData = {
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
      order_number: mockOrderNumber,
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
}

const getUserPeriodicDonationHistoryData = {
  order_number: mockOrderNumber,
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
}

export {
  mockUserId,
  mockOrderNumber,
  mockGetUserDonationHistoryData,
  getUserPeriodicDonationHistoryData,
}
