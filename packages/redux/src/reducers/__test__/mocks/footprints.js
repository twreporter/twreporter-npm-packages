import actionTypes from '../../../constants/action-types'

const { footprints } = actionTypes

const ERROR_MSG = new Error('Unexpected error')

export const mockActions = {
  [footprints.read.request]: {
    type: footprints.read.request,
  },
  [footprints.read.success]: {
    type: footprints.read.success,
    payload: {
      data: {
        meta: {
          total: 1,
          offset: 0,
          limit: 10,
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
          },
        ],
        status: 'ok',
      },
    },
  },
  [footprints.read.failure]: {
    type: footprints.read.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
  [footprints.update.request]: {
    type: footprints.update.request,
  },
  [footprints.update.success]: {
    type: footprints.update.success,
    payload: {
      data: {
        status: 'success',
      },
    },
  },
  [footprints.update.failure]: {
    type: footprints.update.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
}

export const mockStates = {
  InitialState: {
    isFetching: false,
    footprints: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
  },

  ExpStateReq: {
    isFetching: true,
    footprints: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
  },

  ExpStateSuc: {
    isFetching: false,
    footprints: [
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
      },
    ],
    error: null,
    offset: 0,
    total: 1,
    limit: 10,
  },

  ExpStateFail: {
    isFetching: false,
    footprints: [],
    error: ERROR_MSG,
    offset: 0,
    total: 0,
    limit: 10,
  },

  ExpStateUpdateSuc: {
    isFetching: false,
    footprints: [],
    error: null,
    offset: 0,
    total: 0,
    limit: 10,
  },
}
