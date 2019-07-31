import PropTypes from 'prop-types'
import predefinedPropTypes from './img-with-placeholder'

const leading = {
  poster: PropTypes.shape({
    tiny: predefinedPropTypes.imagePropType,
    mobile: predefinedPropTypes.imagePropType,
    tablet: predefinedPropTypes.imagePropType,
    desktop: predefinedPropTypes.imagePropType,
  }),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  topicName: PropTypes.string,
  topicHref: PropTypes.string,
}

export default {
  pink: {
    ...leading,
    paddingTop: PropTypes.string,
  },
  default: {
    ...leading,
    figureCaption: PropTypes.string,
  },
  fullscreen: {
    ...leading,
    portraitPoster: PropTypes.shape({
      tiny: predefinedPropTypes.imagePropType,
      mobile: predefinedPropTypes.imagePropType,
    }),
  },
}
