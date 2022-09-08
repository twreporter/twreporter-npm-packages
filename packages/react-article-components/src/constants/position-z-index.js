export default {
  // table-of-contents
  // z-index is set for covering web-push & header.
  // Set z-index to 1002 because web-push has z-index 1001,
  // And header has z-index 1000.
  toc: 1002,
  // embeded code
  // when z-index is escalated, it is above toolbar
  // but under the header hamburger menu which has z-index 1000
  embed: 999,
}
