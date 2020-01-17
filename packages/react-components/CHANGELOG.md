# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.1.2-rc.0](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.1.1...@twreporter/react-components@8.1.2-rc.0) (2020-01-17)

**Note:** Version bump only for package @twreporter/react-components





## [8.1.1](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.1.0...@twreporter/react-components@8.1.1) (2020-01-14)

**Note:** Version bump only for package @twreporter/react-components

# [8.1.0](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.0.4...@twreporter/react-components@8.1.0) (2020-01-06)

### Features

- add annual report link to footer ([2bb5446](https://github.com/twreporter/twreporter-npm-packages/commit/2bb5446d13e0adfce4d6cf787009a30298cc4320))

## [8.0.4](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.0.4-rc.1...@twreporter/react-components@8.0.4) (2020-01-03)

**Note:** Version bump only for package @twreporter/react-components

## [8.0.4-rc.1](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.0.4-rc.0...@twreporter/react-components@8.0.4-rc.1) (2020-01-03)

**Note:** Version bump only for package @twreporter/react-components

## [8.0.4-rc.0](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.0.3...@twreporter/react-components@8.0.4-rc.0) (2020-01-02)

**Note:** Version bump only for package @twreporter/react-components

## [8.0.3](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/react-components@8.0.3-rc.5...@twreporter/react-components@8.0.3) (2019-11-26)

**Note:** Version bump only for package @twreporter/react-components

## 8.0.3-rc.5 (2019-11-26)

**Note:** Version bump only for package @twreporter/react-components

### 8.0.3-rc.4

#### Notable Changes

- dep upgrade:
  - @twreporter/redux v5.0.4 -> v5.0.7-rc.1

#### Commits

- [[b69e6cf](https://github.com/twreporter/twreporter-npm-packages/commit/b69e6cf)] - @twreporter/redux v5.0.4 -> v5.0.7-rc.1(taylrj)

### 8.0.3-rc.3

#### Notable Changes

- Bug Fixes
  - bookmark-widget error on ssr

#### Commits

- [[353339a](https://github.com/twreporter/twreporter-npm-packages/commit/353339a)] - fix: bookmark-widget error on ssr(taylrj)

### 8.0.3-rc.2

#### Notable Changes

- dep upgrade:
  - @twreporter/core: 1.1.2-rc.1 -> 1.1.2-rc.2

#### Commits

- [[3eb434d](https://github.com/twreporter/twreporter-npm-packages/commit/3eb434ddb8ab3ee148a413a7e42b7925d6ca5a27)] - @twreporter/core: 1.1.2-rc.1 -> 1.1.2-rc.2(taylrj)

### 8.0.3-rc.1

#### Notable Changes

- dep upgrade:
  - @twreporter/core: ^1.1.0 -> 1.1.2-rc.1

### 8.0.2

- Remove deprecated React API `componentWillMount` and `componentWillReceiveProps`
  - `react-transition-group@^1.2.1` -> `^2.0.0`
  - `react-router-dom@^4.3.1` -> `^5.1.2`
    - Per file imports are deprecated for `react-router-dom` v5

### 8.0.1

#### Table of Contents

- Add `id` attribute in the anchor

### 8.0.0

#### Bookmark Widget

- Add `props.renderIcon`, which lets clients render icons on demand
- Add `props.toAutoCheck`, if `true`, it will automatically check if bookmark is exited after mounting
- Remove icon assets

### 7.1.1

- Add `className` prop to `donation-link-with-utm` for styled-components

### 7.1.0

#### Table of Contents

- Add src/table-of-contents/index.js
- Add src/table-of-contents/README.md

### 7.0.8

- Update `src/donation-link-with-utm.js`, pure func -> extends React.PureComponent

### 7.0.7

- Update Footer component
- Update dependencies:
  - @twreporter/core: ^1.0.3 -> ^1.1.0

### 7.0.6

- [listing-page] take last 3 posts from the end of `topic.relateds` for top topic component

### 7.0.5

- Fix bookmark-widget SSR problem

### 7.0.4

- Add src/donation-link-with-utm.js
- Update src/footer/content.js: link-with-tracker -> donation-link-with-utm

### 7.0.3

- Update dependency
  - @twreporte/redux: 5.0.2 -> ^5.0.3
- Delete package.json#peerDependencies

### 7.0.2

- Update dependency
  - @twreporte/redux: ^5.0.1 -> 5.0.2

### 7.0.1

- Update dependencies

### 7.0.0

- Move source code from `twreporter-react-components` to `twreporter-npm-packages`
