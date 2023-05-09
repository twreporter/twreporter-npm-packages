export const getSizeStyle = size => {
  switch (size) {
    case 'L':
      return {
        iconSize: '24px',
        padding: '8px 16px',
      }
    case 'S':
    default:
      return {
        iconSize: '18px',
        padding: '4px 12px',
      }
  }
}

export default { getSizeStyle }
