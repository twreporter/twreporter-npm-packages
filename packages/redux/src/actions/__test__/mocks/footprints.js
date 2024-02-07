const mockUserId = 1
const mockPostId = 'post-id'

const mockSetUserFootprintData = {
  post_id: mockPostId,
}

const mockSetUserFootprintDataResponse = {
  status: 'success',
}

const mockGetUserFootprintsData = {
  meta: {
    total: 1,
    offset: 0,
    limit: 2,
  },
  records: [
    {
      id: '57317d488c0c261000b3f6d9',
      slug: 'torrent-gun-violence',
      hero_image: {
        filetype: 'image/jpeg',
        resized_targets: {
          mobile: {
            height: 512,
            width: 768,
            url:
              'https://storage.googleapis.com/twreporter-multimedia/images/20160813143935-39f2607a555cd3271f794a6f0a674bdd-mobile.jpg',
          },
          tiny: {
            height: 100,
            width: 150,
            url:
              'https://storage.googleapis.com/twreporter-multimedia/images/20160813143935-39f2607a555cd3271f794a6f0a674bdd-tiny.jpg',
          },
          desktop: {
            height: 512,
            width: 768,
            url:
              'https://storage.googleapis.com/twreporter-multimedia/images/20160813143935-39f2607a555cd3271f794a6f0a674bdd-desktop.jpg',
          },
          tablet: {
            height: 512,
            width: 768,
            url:
              'https://storage.googleapis.com/twreporter-multimedia/images/20160813143935-39f2607a555cd3271f794a6f0a674bdd-tablet.jpg',
          },
          w400: {
            height: 0,
            width: 0,
            url: '',
          },
        },
        id: '57af3127c4fbb01100b73b6c',
        description: 'torrent-gun-violence',
      },
      description: '',
      title: '卞中佩／鄉勇式正義使美國槍枝管制議題無解',
      subtitle: '評論',
      category_set: [
        {
          category: {
            id: '63206383207bf7c5f871622c',
            sort_order: 17,
            name: '國際兩岸',
          },
          subcategory: {
            id: '63206383207bf7c5f871622f',
            key: '63206383207bf7c5f871622f',
            latest_order: 0,
            name: '美國',
          },
        },
      ],
      published_date: '2015-12-16T00:00:00Z',
      is_external: false,
      bookmark_id: 123,
    },
  ],
  status: 'ok',
}

export {
  mockUserId,
  mockPostId,
  mockSetUserFootprintData,
  mockSetUserFootprintDataResponse,
  mockGetUserFootprintsData,
}
