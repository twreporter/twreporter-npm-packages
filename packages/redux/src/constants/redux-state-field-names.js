import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'
import { CATEGORY_PATH } from '@twreporter/core/lib/constants/category-set'

const entities = 'entities'
const indexPage = 'index_page'
const latest = 'latest'
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

const user = 'user'

// sections in index_page
const editorPicksSection = 'editor_picks_section'
const infographicsSection = 'infographics_section'
const latestSection = 'latest_section'
const latestTopicSection = 'latest_topic_section'
const photosSection = 'photos_section'
const reviewsSection = 'reviews_section'
const topicsSection = 'topics_section'

// categories in index_page
const humanRightsAndSociety = 'human_rights_and_society'
const environmentAndEducation = 'environment_and_education'
const politicsAndEconomy = 'politics_and_economy'
const cultureAndArt = 'culture_and_art'
const international = 'international'
const livingAndMedicalCare = 'living_and_medical_care'

// feature toggle
const categories = ENABLE_NEW_INFO_ARCH
  ? {
      world: CATEGORY_PATH.world,
      humanrights: CATEGORY_PATH.humanrights,
      politicsAndSociety: CATEGORY_PATH.politicsAndSociety,
      health: CATEGORY_PATH.health,
      environment: CATEGORY_PATH.environment,
      econ: CATEGORY_PATH.econ,
      culture: CATEGORY_PATH.culture,
      education: CATEGORY_PATH.education,
    }
  : {
      humanRightsAndSociety,
      environmentAndEducation,
      politicsAndEconomy,
      cultureAndArt,
      international,
      livingAndMedicalCare,
    }

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
  categories,
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
  latest,
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
  relatedPostsOf: 'relatedPostsOf',
  featureTopic: 'featureTopic',
  user,
}
