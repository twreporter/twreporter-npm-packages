import actionTypes from '../../../constants/action-types'

const { postReviews } = actionTypes

const ERROR_MSG = new Error('Unexpected error')

export const mockActions = {
  [postReviews.read.request]: {
    type: postReviews.read.request,
  },
  [postReviews.read.success]: {
    type: postReviews.read.success,
    payload: {
      data: [
        {
          order: 1,
          post_id: '654873446674f40600595a8c',
          slug: 'bookreview-egg-a-dozen-ovatures',
          title: '《蛋的多重宇宙》：從一顆蛋、一隻雞，到弱勢者的選擇自由',
          og_description:
            '30出頭就生養6個孩子的阿米娜，因為養雞與賣雞，而有能力在身體裡裝置避孕器。《蛋的多重宇宙》回顧從古至今世界各地和阿米娜一樣的弱勢者，如何靠著雞與蛋獲取自由的資本。',
          og_image: {
            filetype: 'image/jpeg',
            resized_targets: {
              mobile: {
                height: 533,
                width: 800,
                url:
                  'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-mobile.jpg',
              },
              tiny: {
                height: 100,
                width: 150,
                url:
                  'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-tiny.jpg',
              },
              desktop: {
                height: 1333,
                width: 2000,
                url:
                  'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-desktop.jpg',
              },
              tablet: {
                height: 800,
                width: 1200,
                url:
                  'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-tablet.jpg',
              },
              w400: {
                height: 267,
                width: 400,
                url:
                  'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-w400.jpg',
              },
            },
            id: '6565e9de6674f4060059602d',
            description:
              '《蛋的多重宇宙》：從一顆蛋、一隻雞，到弱勢者的選擇自由',
          },
          reviewWord: '就是要嘗試寫很多很多文字，在寫',
        },
        {
          order: 2,
          post_id: '654c52196674f40600595b4d',
          slug:
            'bookreview-study-gods-how-the-new-chinese-elite-prepare-for-global-competition',
          title: '中國「學神」考煉之路：一場從北京高校走向世界頂大的階級遊戲',
          og_description:
            '獨尊考試成績的中國菁英高中生，如何進到強調「全人」素質的美國頂大？中國複製菁英的邏輯，正輸出至美國？《學神》從北京青少年的真實案例，爬梳階級複製與全球菁英形成的過程。',
          og_image: {
            filetype: 'image/jpeg',
            resized_targets: {
              mobile: {
                height: 533,
                width: 800,
                url:
                  'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-mobile.jpg',
              },
              tiny: {
                height: 100,
                width: 150,
                url:
                  'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-tiny.jpg',
              },
              desktop: {
                height: 1333,
                width: 2000,
                url:
                  'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-desktop.jpg',
              },
              tablet: {
                height: 800,
                width: 1200,
                url:
                  'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-tablet.jpg',
              },
              w400: {
                height: 267,
                width: 400,
                url:
                  'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-w400.jpg',
              },
            },
            id: '655b083c6674f40600595d95',
            description:
              '《學神》：從高中就開始的階級遊戲──中國菁英教育現場一手觀察',
          },
          reviewWord: '測試用回顧',
        },
      ],
    },
  },
  [postReviews.read.failure]: {
    type: postReviews.read.failure,
    payload: {
      error: ERROR_MSG,
    },
  },
}

export const mockStates = {
  InitialState: {
    isFetching: false,
    postReviews: [],
    error: null,
  },

  ExpStateReq: {
    isFetching: true,
    postReviews: [],
    error: null,
  },

  ExpStateSuc: {
    isFetching: false,
    postReviews: [
      {
        order: 1,
        post_id: '654873446674f40600595a8c',
        slug: 'bookreview-egg-a-dozen-ovatures',
        title: '《蛋的多重宇宙》：從一顆蛋、一隻雞，到弱勢者的選擇自由',
        og_description:
          '30出頭就生養6個孩子的阿米娜，因為養雞與賣雞，而有能力在身體裡裝置避孕器。《蛋的多重宇宙》回顧從古至今世界各地和阿米娜一樣的弱勢者，如何靠著雞與蛋獲取自由的資本。',
        og_image: {
          filetype: 'image/jpeg',
          resized_targets: {
            mobile: {
              height: 533,
              width: 800,
              url:
                'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-mobile.jpg',
            },
            tiny: {
              height: 100,
              width: 150,
              url:
                'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-tiny.jpg',
            },
            desktop: {
              height: 1333,
              width: 2000,
              url:
                'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-desktop.jpg',
            },
            tablet: {
              height: 800,
              width: 1200,
              url:
                'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-tablet.jpg',
            },
            w400: {
              height: 267,
              width: 400,
              url:
                'https://www.twreporter.org/images/20231128212342-5f59eb95269b4f61cdca94639a578c72-w400.jpg',
            },
          },
          id: '6565e9de6674f4060059602d',
          description: '《蛋的多重宇宙》：從一顆蛋、一隻雞，到弱勢者的選擇自由',
        },
        reviewWord: '就是要嘗試寫很多很多文字，在寫',
      },
      {
        order: 2,
        post_id: '654c52196674f40600595b4d',
        slug:
          'bookreview-study-gods-how-the-new-chinese-elite-prepare-for-global-competition',
        title: '中國「學神」考煉之路：一場從北京高校走向世界頂大的階級遊戲',
        og_description:
          '獨尊考試成績的中國菁英高中生，如何進到強調「全人」素質的美國頂大？中國複製菁英的邏輯，正輸出至美國？《學神》從北京青少年的真實案例，爬梳階級複製與全球菁英形成的過程。',
        og_image: {
          filetype: 'image/jpeg',
          resized_targets: {
            mobile: {
              height: 533,
              width: 800,
              url:
                'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-mobile.jpg',
            },
            tiny: {
              height: 100,
              width: 150,
              url:
                'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-tiny.jpg',
            },
            desktop: {
              height: 1333,
              width: 2000,
              url:
                'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-desktop.jpg',
            },
            tablet: {
              height: 800,
              width: 1200,
              url:
                'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-tablet.jpg',
            },
            w400: {
              height: 267,
              width: 400,
              url:
                'https://www.twreporter.org/images/20231120151820-57ec511e29a8337184ea8dc3fb525cd5-w400.jpg',
            },
          },
          id: '655b083c6674f40600595d95',
          description:
            '《學神》：從高中就開始的階級遊戲──中國菁英教育現場一手觀察',
        },
        reviewWord: '測試用回顧',
      },
    ],
    error: null,
  },

  ExpStateFail: {
    isFetching: false,
    postReviews: [],
    error: ERROR_MSG,
  },
}
