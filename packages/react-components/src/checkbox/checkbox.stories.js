import Checkbox from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    value: {
      defaultValue: false,
      options: [true, false],
    },
  },
}

export const checkbox = {
  args: {
    label: '藝術',
    value: false,
    disabled: false,
    onChange: e => {
      console.log('callback', e.target.checked)
    },
  },
}
