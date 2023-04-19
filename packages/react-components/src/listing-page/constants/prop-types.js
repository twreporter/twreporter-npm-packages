import PropTypes from 'prop-types'

export const ARTICLE_PROP_TYPES = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  og_description: PropTypes.string.isRequired,
  hero_image: PropTypes.object.isRequired,
  categories: PropTypes.array,
  category_set: PropTypes.array,
  published_date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tags: PropTypes.array,
  style: PropTypes.string,
})
