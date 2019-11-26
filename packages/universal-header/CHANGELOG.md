# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.2](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/universal-header@2.1.2-rc.7...@twreporter/universal-header@2.1.2) (2019-11-26)

**Note:** Version bump only for package @twreporter/universal-header

## 2.1.2-rc.7 (2019-11-26)

**Note:** Version bump only for package @twreporter/universal-header

### 2.1.2-rc.6

- dep upgrade:
  - @twreporter/redux: 5.0.4 -> 5.0.7-rc.1

#### Commits

- [[11adfd0](https://github.com/twreporter/twreporter-npm-packages/commit/11adfd0)] - @twreporter/redux: v5.0.4 -> v5.0.7-rc.1(taylrj)

### 2.1.2-rc.3

- dep upgrade:
  - @twreporter/core: 1.1.2-rc.1 -> 1.1.2-rc.2

#### Commits

- [[a5ad626](https://github.com/twreporter/twreporter-npm-packages/commit/a5ad626229ad995150c3beb0d26d2e6a70254a84)] - [universal-header] upgrade @twreporter/core: 1.1.2-rc.1 -> 1.1.2-rc.2(taylrj)

#### Commits

- [[1f14b29](https://github.com/twreporter/twreporter-npm-packages/commit/1f14b29912ae703bfea7ea55725f57abdfaf314e)] - [universal-header] Update constant of `categories` in `channelPathnames` (taylrj)

### 2.1.2-rc.2

- Update `categories` in `channelPathnames` from `/?section=categories` to `/#categories`

#### Commits

- [[1f14b29](https://github.com/twreporter/twreporter-npm-packages/commit/1f14b29912ae703bfea7ea55725f57abdfaf314e)] - [universal-header] Update constant of `categories` in `channelPathnames` (taylrj)

### 2.1.2-rc.1

- dep upgrade:
  - @twreporter/core: ^1.1.0 -> 1.1.2-rc.1

#### Commits

- [[f912e38](https://github.com/twreporter/twreporter-npm-packages/commit/f912e386173f6462c855c429dfaa8efa97679ce2)] - [universal-header] upgrade @twreporter/core: ^1.1.0 -> ^1.1.2-rc.1(nickhsine)

### 2.1.1

- Remove deprecated React API `componentWillMount` and `componentWillReceiveProps`
  - `react-transition-group@^1.2.1` -> `^2.0.0`
  - `react-router-dom@^4.3.1` -> `^5.1.2`
    - Per file imports are deprecated for `react-router-dom` v5

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
