# CHANGELOG

## UNRELEASED

## RELEASE

### 1.0.26-rc.5

#### Notable Changes

- dep upgrade:
  - @twreporter/react-components: 8.0.3-rc.2 -> 8.0.3-rc.4
  - @twreporter/redux: 5.0.4 -> 5.0.7-rc.1
  - @twreporter/universal-header: 2.1.2-rc.3 -> 2.1.2-rc.5

#### Commits

- [[13725b1](https://github.com/twreporter/twreporter-npm-packages/commit/13725b1)] - chore: [react-article-components] upgrade dependencies(taylrj)

### 1.0.26-rc.2

#### Notable Changes

- dep upgrade:
  - @twreporter/core: 1.1.2-rc.1 -> 1.1.2-rc.2
  - @twreporter/react-components: 8.0.3-rc.1 -> 8.0.3-rc.2
  - @twreporter/universal-header": 2.1.2-rc.2 -> 2.1.2-rc.3

#### Commits

- [[ac2e03a](https://github.com/twreporter/twreporter-npm-packages/commit/ac2e03ab52df3e6e9dc34b33c05e21bb3ceeb223)] - @twreporter/core: 1.1.2-rc.1 -> 1.1.2-rc.2(taylrj)
- [[7dcb2a0](https://github.com/twreporter/twreporter-npm-packages/commit/7dcb2a0b90295db67092955bff9fecbf7551a714)] - @twreporter/universal-header: 2.1.2-rc.2 -> 2.1.2-rc.3 (taylrj)
- [[e0edf3c](https://github.com/twreporter/twreporter-npm-packages/commit/e0edf3c1c3aa21ada3717d89a0a432e288deaf56)] - @twreporter/react-components: 8.0.3-rc.1 -> 8.0.3-rc.2 (taylrj)

### 1.0.26-rc.1

#### Notable Changes

- dep upgrade:
  - @twreporter/core: ^1.1.0 -> 1.1.2-rc.1

### 1.0.25

#### Update embedded element

- Refactor the attributes setting of embedded `script` elements
- Remove `overflow:hidden` of embedded code

#### Update dependencies

- `@twreporter/react-components@^8.0.1` -> `^8.0.2`
- `@twreporter/universal-header@^2.1.0` -> `^2.1.1`

### 1.0.24

- body:embed: style fine tune
- slideshow: adjust slide width calculation

### 1.0.23

#### Export `renderElement` from body module

### 1.0.22

#### Dependency Upgrade

- @twreporter/react-components@^8.0.0 -> @^8.0.1

#### Table of Contents

- provide h1 string as an anchor id

### 1.0.21

#### Dependency Upgrade

- @twreporter/react-components@^7.1.1 -> @^8.0.0

#### Update relateds

- Add load-more to relateds
- Replace related placeholder with gray block

#### Update img-with-placeholder

#### Improve DEV experience

- Add theme selection to dev entry

#### Update Aside Tools

- new svg files for icons
- style fine tune according to `article@2.1.4(FineTune)` mockup
- render bookmark widget on demand
- reduce requests of checking if bookmark existed from 3 to 1

### 1.0.20

#### Style Fine Tune

styles refinement according to

- mockup `article@2.0.2`
- mockup `article@2.1.2`
- mockup `article@2.1.3`

#### Bug fix and Miscellaneous

- make `center-small` alignment fills 100% viewport width on mobile
- centered-quote: support line break
- metadata:authors - word-break: keep-all
- remove right aligned multimedia block on mobile
- add margin-(top|bottom) to fix that there is no margin between two continuous images on mobile
- fix block is covered by align right block
- add to-be-deprecated comment in theme-manager
- provide `name` prop in styled.ThemeProvider
- slideshow: adjust styles in photo theme
- audio: style tuning
- fix embedded img not centered if not big enough

### 1.0.19

#### Bug fix

- Fix embedded overflow problem: The embedded code block will show scroll bar at some browsers even if it's unnecessary. So set the container style to default `overflow: visible`.

### 1.0.18

#### Style Tune

- support new english text(ff-tisa) on typekit
- infobox: line break support
- clear float at the end of body
- `<a>` link style missing in blockquote, unordered list and ordered list
- wrong background color of figcaption on photo style
- figcaptions are covered while having continuous images

#### Bug fix

- theme-manager: add toc theme styles

### 1.0.17

#### Table of Contents

- render toc on demand

### 1.0.16

#### Table of Contents

- add `src/components/table-of-contents/index.js`
- add `src/components/table-of-contents/styled.js`

#### Dependency Upgrade

- `@twreporter/react-components` to `^7.1.0`

### 1.0.15

- Bump `@twreporter/universal-header` version to v2.1.0
- Fix wrong `lodash` import

### 1.0.14

- Fix heading content
- Prevent image flash while sliding between first and last slide

### 1.0.13

- Render placeholder if there’s no any image given to img-with-placeholder
- Update warning of image-with-placeholder
- Add `center-small` image

### 1.0.12

- Add margin between topic and title of leading if there's no subtitle. By changing margin-top of subtitle to the margin-bottom of topic.
- Change image diff images order
- Implement related:card on-hover animation

### 1.0.11

- Treat body component aligned center if its `alignment` value is not `left` or `right`

### 1.0.10

#### Bug fix

- Prevent slideshow:slides from having the same react keys

### 1.0.9

- Upgrade dependency `@twreporter/react-components` version to v7.0.5

### 1.0.8

#### Styles Revised

- Update `article-page:LeadingBlock` styles
- Update `article-page:BodyBackground` styles

#### Self-defined PropTypes Modified

- Remove `isRequired` if prop could not be provided
- Add default props since `isRequired` is removed

#### UI Manager Updated

- Take `hero_image_size` into account when rendering separation line after leading

#### Miscellaneous

- Use `hero_image` as fallback for related:thumbnail

### 1.0.7

- Add `Slider`, `ImageDiff`, and `Audio` components for `Body`

### 1.0.6

#### Default Theme(article:v2:default) Support

- Provide `primary`, `secondary` and `base` colors for default theme
- Support `extend`, `normal`, `fullscreen` and `small` leading block with default theme

#### Photo Theme(article:v2:photo) Support

- Provide `primary`, `secondary` and `base` colors for photo theme
- Support `extend`, `normal`, `fullscreen` and `small` leading block with photo theme

#### UIManager

- Introduce `UIManager(src/managers/ui-manager.js)` to handle theme and layout

#### Code Refactoring

- Pass `className` prop to body:\${component}
- Refactor components/body/index.js: give body:${component} specified css by styled(body.${component})
- Shift left -10px due to border-(left|right) on articlePage

#### Bug fix

- Fix body:slideshow bug: description not rendered if current slide index is more than 6
- Fix body:centered-quote bug: `by` -> `quoteBy`
- Fix link of donation box(generated by SSR) does not contain utm query param
- Fix category link bug: category id -> category path segment
- Handle iframe wider than embedded container

#### Miscellaneous

- URL origin replacement: storage.googleapis.com -> www.twreporter.org
- body:slideshow updated: img tag -> img-with-placeholder
- src/utils/media-query -> @twreporter/core/lib/utils/media-query
- Render bookmark widget on aside:mobile

### 1.0.5

- Update dependencies
- Take shared `prop-types` from `@twreporter/core`

### 1.0.4

- Remove `state.fontLevel` of `article-page.js`
- Remove `fontSizeOffset` from aside:metadata

### 1.0.3

- Update `src/components/article-page.js`

  - Prop naming change: `defaultFontLevel` -> `fontLevel`
  - Add `onFontLevelChange` prop
  - fontLevel update: base -> small, large -> medium, xLarge -> large

- Handle line breaks
  - Update blockquote, paragraph, list, and annotation

### 1.0.2

- Fix missing props of BookmarkWidget
- Update dependencies

### 1.0.0

- Init the repo
