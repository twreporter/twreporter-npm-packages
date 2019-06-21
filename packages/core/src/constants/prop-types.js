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

const releaseBranch = PropTypes.oneOf([
  releaseBranchConsts.master,
  releaseBranchConsts.test,
  releaseBranchConsts.staging,
  releaseBranchConsts.preview,
  releaseBranchConsts.release,
])

export default {
  bookmark,
  releaseBranch,
}
