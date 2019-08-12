import { getAccessToken } from './auth'
import { fetchAuthorCollectionIfNeeded } from './author-articles'
import { fetchAuthorDetails } from './author-details'
import { searchAuthorsIfNeeded } from './authors'
import {
  fetchIndexPageContent,
  fetchCategoriesPostsOnIndexPage,
} from './index-page'
import {
  fetchAFullPost,
  fetchListedPosts,
  fetchEditorPickedPosts,
  fetchInfographicPostsOnIndexPage,
  fetchPhotographyPostsOnIndexPage,
} from './posts'
import { fetchAFullTopic, fetchTopics, fetchTopicsOnIndexPage } from './topics'
import {
  createSingleBookmark,
  deleteSingleBookmark,
  getSingleBookmark,
  getMultipleBookmarks,
} from './bookmarks'

export default {
  createSingleBookmark,
  deleteSingleBookmark,
  fetchAFullPost,
  fetchAFullTopic,
  fetchAuthorCollectionIfNeeded,
  fetchAuthorDetails,
  fetchCategoriesPostsOnIndexPage,
  fetchEditorPickedPosts,
  fetchIndexPageContent,
  fetchInfographicPostsOnIndexPage,
  fetchListedPosts,
  fetchPhotographyPostsOnIndexPage,
  fetchTopics,
  fetchTopicsOnIndexPage,
  getAccessToken,
  getMultipleBookmarks,
  getSingleBookmark,
  searchAuthorsIfNeeded,
}
