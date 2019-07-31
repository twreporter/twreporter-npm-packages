import PropTypes from 'prop-types'

const elementData = PropTypes.shape({
  alignment: PropTypes.oneOf(['center', 'center-small', 'left', 'right'])
    .isRequired,
  styles: PropTypes.object.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'annotation',
    'audio',
    'blockquote',
    'centered-quote',
    'code',
    'embeddedCode',
    'embeddedcode',
    'embedded-code',
    'header-one',
    'header-two',
    'image',
    'small-image',
    // 'image-link',
    'imageDiff',
    'imagediff',
    'infobox',
    'ordered-list-item',
    'quoteby',
    'slideshow',
    'unordered-list-item',
    'unstyled',
    'youtube',
  ]).isRequired,
})

export default {
  elementData,
}
