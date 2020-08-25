import PropTypes from 'prop-types'
import imagePropType from './image'
import postPropType from './post'

const topic = (customPropTypes = {}) => {
  return PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    og_description: PropTypes.string.isRequired,
    short_title: PropTypes.string.isRequired,
    leading_image: imagePropType,
    og_image: imagePropType,
    relateds: PropTypes.arrayOf(postPropType),
    ...customPropTypes,
  })
}

export default topic
