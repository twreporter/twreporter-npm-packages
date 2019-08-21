# CHANGELOG

## Unreleased

## Released

### 2.1.0

- Spread out the header proptypes
- Update context prop constants
- Update standalone-header
- Remove unused code
- Take constants from core

- Update dependencies
  - Add `@twreporter/core`: ^1.1.0
  - Add `@twreporter/redux`: ^5.0.3
  - Change `axios` version: ^0.18.0 -> ^0.19.0
  - Replace `lodash.get` with `lodash/get`

### 2.0.5

- Remove `dependencies.react-router` in package.json

### 2.0.4

- Update link selector of channel items

### 2.0.3

- Update appearance of `transparent` theme.
  This patch does the following changes:

  - Render light gray or normal icons on demand(refer to theme)
  - Update src/utils/theme.js. Add `selectServiceIcons`,
    `selectHoverFontColor`, `selectChannelTextShadow` and
    `selectChannelsBgColor` functions.
  - Render hover effect, font color, text shadow on demand

- Optimize svg files by svgo.
- Close slide down menu when menu items are clicked on mobile.

### 2.0.2

- Fix undefined variables
- Add eslintrc

### 2.0.1

- Set `text-decoration: none` for all links
- Fix old key from `branch` to `releaseBranch`

### 2.0.0

#### Introduce Dependent and Standalone Header

- Dependent Header
  It is used for server side rendering.
  Clients should prepare redux store, combine redux reducers and
  grant authorization for users by redux actions on the server.

- Standalone Header
  It is used for client side rendering.
  Clients need to `import { StandaloneHeader} from '@twreporter/universal-header'`,
  and render `<StandalineHeader>` on the client side.
