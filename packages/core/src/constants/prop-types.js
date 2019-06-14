import PropTypes from 'prop-types'

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

export default {
  bookmark,
}
