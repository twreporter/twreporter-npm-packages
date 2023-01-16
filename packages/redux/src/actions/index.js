import { getAccessToken } from './auth'
import { fetchAuthorCollectionIfNeeded } from './author-articles'
import { fetchAuthorDetails } from './author-details'
import { searchAuthorsIfNeeded } from './authors'
import { fetchIndexPageContent } from './index-page'
import {
  fetchAFullPost,
  fetchPostsByCategoryListId,
  fetchPostsByTagListId,
  fetchPostsByCategorySetListId,
  fetchRelatedPostsOfAnEntity,
  fetchLatestPosts,
} from './posts'
import { fetchAFullTopic, fetchFeatureTopic, fetchTopics } from './topics'
import {
  createSingleBookmark,
  deleteSingleBookmark,
  getSingleBookmark,
  getMultipleBookmarks,
} from './bookmarks'
import { fetchLatestTags } from './latest'

export default {
  createSingleBookmark,
  deleteSingleBookmark,
  fetchAFullPost,
  fetchAFullTopic,
  fetchAuthorCollectionIfNeeded,
  fetchAuthorDetails,
  fetchFeatureTopic,
  fetchIndexPageContent,
  fetchLatestPosts,
  fetchPostsByCategoryListId,
  fetchPostsByTagListId,
  fetchPostsByCategorySetListId,
  fetchRelatedPostsOfAnEntity,
  fetchTopics,
  fetchLatestTags,
  getAccessToken,
  getMultipleBookmarks,
  getSingleBookmark,
  searchAuthorsIfNeeded,
}
