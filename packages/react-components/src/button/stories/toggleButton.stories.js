import ToggleButton from '../components/toggleButton'

export default {
  title: 'Button/Toggle Button',
  component: ToggleButton,
  argTypes: {
    value: {
      defaultValue: false,
      options: [true, false],
    },
  },
}

export const toggleButton = {
  args: {
    value: false,
    labelOn: '已訂閱',
    labelOff: '未訂閱',
    disabled: false,
    onChange: () => {},
  },
}
