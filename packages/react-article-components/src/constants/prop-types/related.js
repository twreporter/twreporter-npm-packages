import PropTypes from 'prop-types'
import predefinedPropTypes from './img-with-placeholder'

const card = {
  category: PropTypes.string,
  publishedDate: PropTypes.string,
  desc: PropTypes.string,
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isTargetBlank: PropTypes.bool,
  thumbnail: predefinedPropTypes.imagePropType,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

export default {
  card,
  data: PropTypes.arrayOf(PropTypes.shape(card)),
}
