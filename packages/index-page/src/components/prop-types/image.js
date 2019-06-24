import PropTypes from 'prop-types'

const target = PropTypes.shape({
  url: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
})

const image = PropTypes.shape({
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  resized_targets: PropTypes.shape({
    tiny: target,
    mobile: target,
    desktop: target,
    tablet: target,
  }).isRequired,
})

export default image
