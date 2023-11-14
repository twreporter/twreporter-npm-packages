import Badge from '.'
import { colorBrand } from '@twreporter/core/lib/constants/color'

export default {
  title: 'Badge',
  component: Badge,
}

export const badge = {
  args: {
    text: '不定期',
    textColor: colorBrand.heavy,
    backgroundColor: 'white',
  },
}
