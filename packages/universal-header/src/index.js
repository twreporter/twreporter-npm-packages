import StandaloneHeader from './standalone-header'
import HeaderNew from './containers/header'
import HeaderOld from './containers/header-old'
// feature toggle
import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'
export const Header = ENABLE_NEW_INFO_ARCH ? HeaderNew : HeaderOld

export default {
  Header,
  StandaloneHeader,
}
