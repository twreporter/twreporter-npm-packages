import PropTypes from 'prop-types'

const elementColors = PropTypes.shape({
  primary: PropTypes.shape({
    text: PropTypes.string,
    accent: PropTypes.string,
    support: PropTypes.string,
    background: PropTypes.string,
  }),
  secondary: PropTypes.shape({
    text: PropTypes.string,
    accent: PropTypes.string,
    support: PropTypes.string,
    background: PropTypes.string,
  }),
  base: PropTypes.shape({
    text: PropTypes.string,
    lightText: PropTypes.string,
    button: PropTypes.string,
    line: PropTypes.string,
    background: PropTypes.string,
  }),
})

export default {
  elementColors,
}
