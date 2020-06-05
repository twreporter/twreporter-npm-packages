import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { post, posts } from './posts'
import { searchedAuthorsList, authorsList } from './authors'
import { topic, topics } from './topics'
import authReducer from './auth'
import bookmarks from './bookmarks'
import bookmarkWidget from './bookmark-widget'
import entities from './entities'
import indexPage from './index-page'
import origins from './origins'
import reduxStatePropKey from '../constants/redux-state-field-names'
import settings from './settings'
import types from '../constants/action-types'
// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

/**
 *  Mongodb ObjectID type definition
 *  @typedef {string} ObjectID
 */

/**
 *  Slug type defintion
 *  @typedef {string} Slug
 */

/**
 *  TopicSlug type defintion
 *  @typedef {string} TopicSlug
 */

/**
 * ResizedTarget type definition
 * @typedef {Object} ResizedTarget
 * @property {string} url
 * @property {number} height
 * @property {number} width
 */

/**
 *  Image type definition
 *  @typedef {Object} Image
 *  @property {string} id
 *  @property {string} description
 *  @property {string} copyright
 *  @property {string} filetype
 *  @property {number} height
 *  @property {number} width
 *  @property {string} url
 *  @property {Object} resized_targets
 *  @property {ResizedTarget} resized_targets.tiny
 *  @property {ResizedTarget} resized_targets.w400
 *  @property {ResizedTarget} resized_targets.mobile
 *  @property {ResizedTarget} resized_targets.tablet
 *  @property {ResizedTarget} resized_targets.desktop
 */

/**
 *  Tag type definition
 *  @typedef {Object} Tag
 *  @property {string} id
 *  @property {string} name
 */

/**
 *  Category type definition
 *  @typedef {Object} Category
 *  @property {string} id
 *  @property {string} name
 *  @property {number} sort_order
 */

/**
 *  Author type definition
 *  @typedef {Object} Author
 *  @property {string} id
 *  @property {string} name
 *  @property {string} job_title
 */

/**
 *  Post type definition
 *  @typedef {Object} Post
 *  @property {Category[]} categories
 *  @property {Image} hero_image
 *  @property {Image} leading_image_portrait
 *  @property {Image} og_image
 *  @property {Object[]} brief.api_data
 *  @property {Object} brief
 *  @property {Object} theme
 *  @property {Slug} slug
 *  @property {Tag[]} tags
 *  @property {bool} full
 *  @property {bool} is_external
 *  @property {bool} is_featured
 *  @property {string} copyright
 *  @property {string} extend_byline
 *  @property {string} hero_image_size
 *  @property {string} id
 *  @property {string} leading_image_description
 *  @property {string} name
 *  @property {string} og_description
 *  @property {string} og_title
 *  @property {string} published_date
 *  @property {string} state
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 *  @property {string} updated_at
 */

/**
 *  Topic type definition
 *  @typedef {Object} Topic
 *  @property {Image} leading_image
 *  @property {Image} og_image
 *  @property {Object} description
 *  @property {Object[]} description.api_data
 *  @property {Object} team_description
 *  @property {Object[]} team_description.api_data
 *  @property {TopicSlug} slug
 *  @property {bool} full
 *  @property {string} headline
 *  @property {string} id
 *  @property {string} name
 *  @property {string} og_description
 *  @property {string} og_title
 *  @property {string} published_date
 *  @property {string} relateds_background
 *  @property {string} relateds_format
 *  @property {string} state
 *  @property {string} subtitle
 *  @property {string} title
 *  @property {string} title_position
 *  @property {string} topic_name
 *  @property {string} updated_at
 */

/**
 *  FullTopic type definition
 *  @typedef {Object} FullTopic
 *  @property {Image} leading_image
 *  @property {Image} og_image
 *  @property {Object} description
 *  @property {Object[]} description.api_data
 *  @property {Object} team_description
 *  @property {Object[]} team_description.api_data
 *  @property {TopicSlug} slug
 *  @property {bool} full
 *  @property {string} headline
 *  @property {string} id
 *  @property {string} name
 *  @property {string} og_description
 *  @property {string} og_title
 *  @property {string} published_date
 *  @property {string} relateds_background
 *  @property {string} relateds_format
 *  @property {string} state
 *  @property {string} subtitle
 *  @property {string} title
 *  @property {string} title_position
 *  @property {string} topic_name
 *  @property {string} updated_at
 *
 *  @property {Object} leading_video
 *  @property {Post[]} relateds
 */

/**
 *  FullPost type definition
 *  @typedef {Object} FullPost
 *  @property {Category[]} categories
 *  @property {Image} hero_image
 *  @property {Image} og_image
 *  @property {Object} brief
 *  @property {Object[]} brief.api_data
 *  @property {Object} theme
 *  @property {Slug} slug
 *  @property {Tag[]} tags
 *  @property {bool} full
 *  @property {bool} is_external
 *  @property {bool} is_featured
 *  @property {string} copyright
 *  @property {string} extend_byline
 *  @property {string} hero_image_size
 *  @property {string} id
 *  @property {string} leading_image_description
 *  @property {string} name
 *  @property {string} og_description
 *  @property {string} og_title
 *  @property {string} published_date
 *  @property {string} state
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 *  @property {string} updated_at
 *
 *  @property {Author[]} designers
 *  @property {Author[]} engineers
 *  @property {Author[]} photographers
 *  @property {Author[]} writters
 *  @property {Image} leading_image_portrait
 *  @property {Object} content
 *  @property {Object[]} content.api_data
 *  @property {Post[]} relateds
 *  @property {FullTopic} topics
 */

/**
 *  PostList type definition
 *  @typedef {Object} PostList
 *  @property {Object.<number, number[]>} pages - Page to item positions. Ex: `1: [0, 9]`, which means items[0] - items[9] are for page 1
 *  @property {Object} error
 *  @property {number} total
 *  @property {Slug[]} items
 */

/**
 *  TopicList type definition
 *  @typedef {Object} TopicList
 *  @property {bool} isFetching
 *  @property {Object.<number, TopicSlug[]>} items - Page to slugs. Ex: `1: ['slug_1', 'slug_2']`, which means page 1 having 'slug_1' and 'slug_2'
 *  @property {number} totalPages
 *  @property {number} page
 *  @property {number} nPerPage
 */

/**
 *  ReduxState type definition
 *  @typedef {Object} ReduxState
 *
 *  @property {Object} entities
 *  @property {Object.<Slug, Post|FullPost>} entities.posts - slug to post map
 *  @property {Object.<TopicSlug, Topic|FullTopic>} entities.topics - slug to topic map
 *
 *  @property {Object} index_page
 *  @property {Object} index_page.error
 *  @property {bool} index_page.isFetching
 *  @property {Slug[]} index_page.culture_and_art
 *  @property {Slug[]} index_page.editor_picks_section
 *  @property {Slug[]} index_page.environment_and_education
 *  @property {Slug[]} index_page.hime_right_and_society
 *  @property {Slug[]} index_page.infgraphics_section
 *  @property {Slug[]} index_page.international
 *  @property {Slug[]} index_page.latest_section
 *  @property {TopicSlug[]} index_page.latest_topic_section
 *  @property {Slug[]} index_page.living_and_medical_care
 *  @property {Slug[]} index_page.photos_section
 *  @property {Slug[]} index_page.politics_and_economy
 *  @property {Slug[]} index_page.reviews_section
 *  @property {TopicSlug[]} index_page.topics_section
 *
 *  @property {Object} selected_post
 *  @property {Object} selected_post.error
 *  @property {Slug} selected_post.slug
 *  @property {bool} selected_post.isFetching
 *
 *  @property {Object} selected_topic
 *  @property {Object} selected_topic.error
 *  @property {TopicSlug} selected_topic.slug
 *  @property {bool} selected_topic.isFetching
 *
 *  @property {Object} lists
 *  @property {Object.<ObjectID, PostList>}
 *
 *  @property {TopicList} topic_list
 *
 *  @property {Object} articlesByAuthor
 *  @property {Object} auth
 *  @property {Object} authorsList
 *  @property {Object} bookmarkWidget
 *  @property {Object} bookmarks
 *  @property {Object} enititiesForAuthors
 *  @property {Object} origins
 *  @property {Object} searchedAuthorsList
 *  @property {number} nextNotifyPopupTS
 */

const rootReducer = combineReducers({
  [reduxStatePropKey.articlesByAuthor]: articlesByAuthor,
  [reduxStatePropKey.auth]: authReducer,
  [reduxStatePropKey.authorsList]: authorsList,
  [reduxStatePropKey.bookmarks]: bookmarks,
  [reduxStatePropKey.bookmarkWidget]: bookmarkWidget,
  [reduxStatePropKey.entities]: entities,
  [reduxStatePropKey.indexPage]: indexPage,
  [reduxStatePropKey.lists]: posts,
  [reduxStatePropKey.searchedAuthorsList]: searchedAuthorsList,
  [reduxStatePropKey.selectedPost]: post,
  [reduxStatePropKey.selectedTopic]: topic,
  [reduxStatePropKey.topicList]: topics,
  [reduxStatePropKey.entitiesForAuthors]: (state = {}, action) => {
    const entities = _.get(action, 'payload.normalizedData.entities')
    if (entities) {
      // WORKAROUND:
      // When the data of an author is updated, we have not build the function to synchronize the author data saved in old post records on Algolia.
      // So the author data in post records that already existed will be outdated.
      // The temporarily solution is that we do not update authors in entities when fetching articles of an author.
      if (action.type === types.FETCH_AUTHOR_COLLECTION_SUCCESS) {
        return _.merge({}, state, { articles: entities.articles })
      }
      return _.merge({}, state, entities)
    }
    return state
  },
  [reduxStatePropKey.nextNotifyPopupTS]: (state = 0, action) => {
    if (action.type === types.SET_NEXT_POPUP_TIME_STAMP) {
      return action.payload
    }
    return state
  },
  [reduxStatePropKey.origins]: origins,
  [reduxStatePropKey.settings]: settings,
})

export default rootReducer
