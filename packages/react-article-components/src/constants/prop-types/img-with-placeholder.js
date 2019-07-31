import PropTypes from 'prop-types'

const imagePropType = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
})

export default {
  imagePropType,
}
