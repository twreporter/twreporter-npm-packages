import MenuButton from '../components/menuButton'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { getRadioArg } from '../../storybook/utils/get-enum-arg'

export default {
  title: 'Button/Menu Button',
  component: MenuButton,
  argTypes: {
    fontWeight: getRadioArg(
      MenuButton.FontWeight,
      MenuButton.FontWeight.NORMAL
    ),
  },
}

export const menuButton = {
  args: {
    text: '文字',
    link: {},
    color: colorGrayscale.gray800,
    hoverBgColor: colorGrayscale.gray100,
    activeBgColor: colorGrayscale.gray200,
    paddingLeft: 32,
    paddingRight: 32,
  },
}
