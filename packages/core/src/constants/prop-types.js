import PropTypes from 'prop-types'
import releaseBranchConsts from './release-branch'

const bookmark = PropTypes.shape({
  id: PropTypes.number,
  published_date: PropTypes.number,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  deleted_at: PropTypes.string,
  slug: PropTypes.string,
  host: PropTypes.string,
  is_external: PropTypes.bool,
  title: PropTypes.string,
  desc: PropTypes.string,
  thumbnail: PropTypes.string,
})

const articleMetaForBookmark = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  is_external: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  published_date: PropTypes.string,
  post_id: PropTypes.string,
})

const releaseBranch = PropTypes.oneOf([
  releaseBranchConsts.master,
  releaseBranchConsts.test,
  releaseBranchConsts.staging,
  releaseBranchConsts.preview,
  releaseBranchConsts.release,
])

export default {
  articleMetaForBookmark,
  bookmark,
  releaseBranch,
}
