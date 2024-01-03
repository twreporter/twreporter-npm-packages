const mockUserId = 1

const mockSetUserAnalyticsData = {
  postID: 'post-id',
  readPostsCount: true,
  readPostsSec: 1234,
}

const mockSetUserAnalyticsDataResponse = {
  data: {
    user_id: mockUserId,
    post_id: 'post-id',
    read_posts_count: true,
    read_posts_sec: 1234,
  },
  status: 'success',
}

export {
  mockUserId,
  mockSetUserAnalyticsData,
  mockSetUserAnalyticsDataResponse,
}
