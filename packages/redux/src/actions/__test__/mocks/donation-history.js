const mockUserId = 1

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
}

export { mockUserId, mockGetUserDonationHistoryData }
