import PropTypes from 'prop-types'
import imagePropType from './image'

const post = (customPropTypes = {}) => {
  return PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    og_description: PropTypes.string,
    hero_image: imagePropType.isRequired,
    leading_image_portrait: imagePropType,
    og_image: imagePropType,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    ...customPropTypes,
  })
}

export default post
