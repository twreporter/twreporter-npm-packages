export default {
  // auth
  REQUEST_AUTH: 'request_authorization',
  AUTH_SUCCESS: 'grant_authorization_success',
  AUTH_FAILURE: 'grant_authorization_failure',
  AUTH_CLEAR: 'clear_authorization',

  // change selected post
  CHANGE_SELECTED_POST: 'CHANGE_SELECTED_POST',
  CHANGE_SELECTED_TOPIC: 'CHANGE_SELECTED_TOPIC',

  // actions fetching topics
  START_TO_GET_TOPICS: 'START_TO_GET_TOPICS',
  ERROR_TO_GET_TOPICS: 'ERROR_TO_GET_TOPICS',
  GET_TOPICS: 'GET_TOPICS',

  // actions fetching a full topic
  START_TO_GET_A_FULL_TOPIC: 'START_TO_GET_A_FULL_TOPIC',
  ERROR_TO_GET_A_FULL_TOPIC: 'ERROR_TO_GET_A_FULL_TOPIC',
  GET_A_FULL_TOPIC: 'GET_A_FULL_TOPIC',

  // actions fetching posts
  START_TO_GET_POSTS: 'START_TO_GET_POSTS',
  ERROR_TO_GET_POSTS: 'ERROR_TO_GET_POSTS',
  GET_EDITOR_PICKED_POSTS: 'GET_EDITOR_PICKED_POSTS',
  GET_LISTED_POSTS: 'GET_LISTED_POSTS',
  ERROR_TO_GET_LISTED_POSTS: 'ERROR_TO_GET_LISTED_POSTS',
  ERROR_TO_GET_EDITOR_PICKED_POSTS: 'ERROR_TO_GET_EDITOR_PICKED_POSTS',

  // actions fetching a full post
  START_TO_GET_A_FULL_POST: 'START_TO_GET_A_FULL_POST',
  ERROR_TO_GET_A_FULL_POST: 'ERROR_TO_GET_A_FULL_POST',
  GET_A_FULL_POST: 'GET_A_FULL_POST',

  // actions on index page
  GET_TOPICS_FOR_INDEX_PAGE: 'GET_TOPICS_FOR_INDEX_PAGE',
  GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE: 'GET_PHOTOGRAPHY_POSTS_FOR_INDEX_PAGE',
  GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE: 'GET_INFOGRAPHIC_POSTS_FOR_INDEX_PAGE',
  GET_CONTENT_FOR_INDEX_PAGE: 'GET_CONTENT_FOR_INDEX_PAGE',
  START_TO_GET_INDEX_PAGE_CONTENT: 'START_TO_GET_INDEX_PAGE_CONTENT',
  ERROR_TO_GET_INDEX_PAGE_CONTENT: 'ERROR_TO_GET_INDEX_PAGE_CONTENT',

  FETCH_AUTHOR_DETAILS_REQUEST: 'FETCH_AUTHOR_DETAILS_REQUEST',
  FETCH_AUTHOR_DETAILS_SUCCESS: 'FETCH_AUTHOR_DETAILS_SUCCESS',
  FETCH_AUTHOR_DETAILS_FAILURE: 'FETCH_AUTHOR_DETAILS_FAILURE',

  SEARCH_AUTHORS_REQUEST: 'SEARCH_AUTHORS_REQUEST',
  SEARCH_AUTHORS_SUCCESS: 'SEARCH_AUTHORS_SUCCESS',
  SEARCH_AUTHORS_FAILURE: 'SEARCH_AUTHORS_FAILURE',

  LIST_ALL_AUTHORS_REQUEST: 'LIST_ALL_AUTHORS_REQUEST',
  LIST_ALL_AUTHORS_SUCCESS: 'LIST_ALL_AUTHORS_SUCCESS',
  LIST_ALL_AUTHORS_FAILURE: 'LIST_ALL_AUTHORS_FAILURE',

  FETCH_AUTHOR_COLLECTION_REQUEST: 'FETCH_AUTHOR_COLLECTION_REQUEST',
  FETCH_AUTHOR_COLLECTION_FAILURE: 'FETCH_AUTHOR_COLLECTION_FAILURE',
  FETCH_AUTHOR_COLLECTION_SUCCESS: 'FETCH_AUTHOR_COLLECTION_SUCCESS',

  SET_NEXT_POPUP_TIME_STAMP: 'SET_NEXT_POPUP_TIME_STAMP',

  singleBookmark: {
    read: {
      request: 'request to fetch single bookmark',
      success: 'succes to fetch single bookmark',
      failure: 'fail to fetch single bookmark',
    },
    create: {
      request: 'request to  create single bookmark',
      success: 'succes to create single bookmark',
      failure: 'fail to create single bookmark',
    },
    delete: {
      request: 'request to  delete single bookmark',
      success: 'succes to delete single bookmark',
      failure: 'fail to delete single bookmark',
    },
  },

  multipleBookMarks: {
    read: {
      request: 'request to fetch multiple bookmarks',
      success: 'succes to fetch multiple bookmarks',
      failure: 'fail to fetch multiple bookmarks',
    },
  },

  origins: {
    update: 'update request origins',
  },

  settings: {
    changeFontLevel: 'change font level',
  },

  dataAlreadyExists: 'data already exists',
  noMoreItemsToFetch: 'no more items to fetch',
  lastActionIsStillProcessing: 'last action is still processing',
}
