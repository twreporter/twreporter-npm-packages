export const getSizeStyle = (size) => {
  switch (size) {
    case 'L':
      return {
        fontSize: '16px',
        iconSize: '24px',
        padding: '8px 24px',
      }
    case 'S':
    default:
      return {
        fontSize: '14px',
        iconSize: '18px',
        padding: '4px 16px',
      }
  }
}

export default { getSizeStyle }
