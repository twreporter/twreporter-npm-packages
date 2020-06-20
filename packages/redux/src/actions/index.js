import { getAccessToken } from './auth'
import { fetchAuthorCollectionIfNeeded } from './author-articles'
import { fetchAuthorDetails } from './author-details'
import { searchAuthorsIfNeeded } from './authors'
import {
  fetchIndexPageContent,
  fetchCategoriesPostsOnIndexPage,
} from './index-page'
import { fetchAFullPost, fetchListedPosts } from './posts'
import { fetchAFullTopic, fetchTopics } from './topics'
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
  fetchIndexPageContent,
  fetchListedPosts,
  fetchTopics,
  getAccessToken,
  getMultipleBookmarks,
  getSingleBookmark,
  searchAuthorsIfNeeded,
}
