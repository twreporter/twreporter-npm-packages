export default {
  // auth
  REQUEST_AUTH: 'request_authorization',
  AUTH_SUCCESS: 'grant_authorization_success',
  AUTH_FAILURE: 'grant_authorization_failure',
  AUTH_CLEAR: 'clear_authorization',

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

  selectedPost: {
    read: {
      request: 'request to fetch the post',
      success: 'success to fetch the post',
      failure: 'fail to fetch the post',
      alreadyExists: 'the post is already existed',
    },
  },

  selectedTopic: {
    read: {
      request: 'request to fetch the topic',
      success: 'success to fetch the topic',
      failure: 'fail to fetch the topic',
      alreadyExists: 'the topic is already existed',
    },
  },

  indexPage: {
    read: {
      request: 'request to fetch index page content',
      success: 'success to fetch index page content',
      failure: 'fail to fetch index page content',
      alreadyExists: 'index page content is already existed',
    },
  },

  postsByListId: {
    read: {
      request: 'request to fetch posts by list id',
      success: 'success to fetch posts by list id',
      failure: 'fail to fetch posts by list id',
      noMore: 'no more posts by list id to fetch',
      alreadyExists: 'posts by list id to fetch are already existed',
    },
  },

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

  relatedPosts: {
    read: {
      request: 'request to fetch related posts',
      success: 'success to fetch related posts',
      failure: 'fail to fetch related posts',
      noMore: 'no more related posts to fetch',
    },
  },

  featureTopic: {
    read: {
      request: 'request to fetch feature topic',
      success: 'success to fetch feature topic',
      failure: 'fail to fetch feature topic',
    },
  },

  topics: {
    read: {
      request: 'request to fetch topics',
      success: 'success to fetch topics',
      failure: 'fail to fetch topics',
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
