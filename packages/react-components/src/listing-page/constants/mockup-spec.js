// 20 is the margin between two items
const marginBetweenItems = 20

export default {
  marginBetweenItems,
  mobile: {
    maxWidth: 375,
    cardWidth: 325,
    tagsWidth: 240,
    imgHeight: 205,
  },
  desktop: {
    maxWidth: 451 * 2 + marginBetweenItems,
    cardWidth: 451,
    textWidth: 421,
    tagsWidth: 335,
    imgHeight: 285,
  },
  tablet: {
    maxWidth: 339 * 2 + marginBetweenItems,
    cardWidth: 339,
    textWidth: 311,
    tagsWidth: 224,
    imgHeight: 214,
  },
  hd: {
    maxWidth: 555 * 2 + marginBetweenItems,
    cardWidth: 555,
    textWidth: 516,
    tagsWidth: 430,
    imgHeight: 350,
  },
}
