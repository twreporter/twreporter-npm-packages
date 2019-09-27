# CHANGELOG

## Unreleased

## Release

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
