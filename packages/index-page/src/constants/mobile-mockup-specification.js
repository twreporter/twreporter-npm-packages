// 320 is iPhone5 width and also the mockup max-width,
// 238 is the item width in device.
// 26 is the padding between each item

const itemWidth = 238
const itemPaddingRight = 26
const mockupWidth = 320
const firstItemMarginLeft = 42

// item width pct of mobiel device
const itemWidthPct = `${(itemWidth / mockupWidth) * 100}`

// item + padding width pct
const itemPlusPaddingWidthPct = `${((itemWidth + itemPaddingRight) /
  mockupWidth) *
  100}`

// First item has 42px margin-left in mockup.
const firstItemMarginLeftPct = `${(firstItemMarginLeft / mockupWidth) * 100}`

// Each item has the padding-right:26px in mockup.
const itemPaddingRightPct = `${(itemPaddingRight / mockupWidth) * 100}`

export {
  itemWidthPct,
  itemPlusPaddingWidthPct,
  firstItemMarginLeftPct,
  itemPaddingRightPct,
}
