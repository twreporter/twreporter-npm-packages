export const getRadioArg = (enumObject, defaultValue) => {
  return {
    defaultValue,
    options: Object.values(enumObject),
    control: { type: 'radio' },
  }
}
