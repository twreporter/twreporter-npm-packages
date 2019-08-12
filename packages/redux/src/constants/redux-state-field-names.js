/** These strings are used for field key of redux state
 * Redux state will be like
 *  {
 *    index_page: {
 *      latest_section: [],
 *      editor_picks_section: [],
 *      latest_topic_section: [],
 *      reviews_section: [],
 *      topics_section: [],
 *      photos_section: [],
 *      infographics_section: [],
 *    },
 *    entities: {
 *      posts: {},
 *      topics: {},
 *    },
 *
 *    lists: {
 *      // list might be any group of ariticles, topics or other assets
 *      listID1: {
 *        total: 10,
 *        items: [],
 *      },
 *      listID2: {
 *        total: 15,
 *        items: []
 *      }
 *    },
 *
 *    // list topics we already get
 *    topic_list: {
 *      total: 10,
 *      // only store topic id
 *      items: []
 *    },
 *
 *    // current post we want to show in article page
 *    selected_post: {
 *      isFetching: true,
 *      slug: 'post-slug',
 *      error: null
 *    },
 *
 *    // current topic we want to show in topic landing page
 *    selected_topic: {
 *      isFetching: true,
 *      slug: 'topic-slug',
 *      error: null
 *    },
 *
 *  }
 *
 */

/**
 * first level properties of redux state
 */
const entities = 'entities'
const indexPage = 'index_page'
const lists = 'lists'
const topicList = 'topic_list'
const selectedPost = 'selected_post'
const selectedTopic = 'selected_topic'

const articlesByAuthor = 'articlesByAuthor'
const auth = 'auth'
const authorsList = 'authorsList'
const bookmarks = 'bookmarks'
const bookmarkWidget = 'bookmarkWidget'
const entitiesForAuthors = 'entitiesForAuthors'
const searchedAuthorsList = 'searchedAuthorsList'

// sections in index_page
const editorPicksSection = 'editor_picks_section'
const infographicsSection = 'infographics_section'
const latestSection = 'latest_section'
const latestTopicSection = 'latest_topic_section'
const photosSection = 'photos_section'
const reviewsSection = 'reviews_section'
const topicsSection = 'topics_section'

// categories in index_page
const humanRightsAndSociety = 'human_rights_society'
const environmentAndEducation = 'environment_education'
const politicsAndEconomy = 'politics_economy'
const cultureAndArt = 'culture_art'
const international = 'international'
const livingAndMedicalCare = 'living_medical_care'

// time stamp for next popup
const nextNotifyPopupTS = 'nextNotifyPopupTS'

/**
 * fields in the `entities` field
 */
const postsInEntities = 'posts'
const topicsInEntities = 'topics'

// origins
const origins = 'origins'

// settings
const settings = 'settings'

export default {
  categories: {
    humanRightsAndSociety,
    environmentAndEducation,
    politicsAndEconomy,
    cultureAndArt,
    international,
    livingAndMedicalCare,
  },
  sections: {
    editorPicksSection,
    infographicsSection,
    latestSection,
    latestTopicSection,
    photosSection,
    reviewsSection,
    topicsSection,
  },
  selectedPost,
  selectedTopic,
  entities,
  indexPage,
  lists,
  topicList,
  postsInEntities,
  topicsInEntities,
  origins,
  // twreporter-react
  articlesByAuthor,
  auth,
  authorsList,
  bookmarks,
  bookmarkWidget,
  entitiesForAuthors,
  nextNotifyPopupTS,
  searchedAuthorsList,
  settings,
}
