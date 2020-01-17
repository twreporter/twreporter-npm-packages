# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.1-rc.0](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/redux@6.0.0...@twreporter/redux@6.0.1-rc.0) (2020-01-17)

**Note:** Version bump only for package @twreporter/redux





# [6.0.0](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/redux@5.0.8...@twreporter/redux@6.0.0) (2020-01-14)

### Bug Fixes

- **redux:** enhance store.actions dispatch function by redux-thunk ([cc3bb33](https://github.com/twreporter/twreporter-npm-packages/commit/cc3bb33d1506a26cf8cd28766acbd8fa75c58f0c)), closes [/github.com/reduxjs/redux/blob/master/src/compose.ts#L56](https://github.com//github.com/reduxjs/redux/blob/master/src/compose.ts/issues/L56)

### Features

- **redux:** update actions and reducers ([1e71014](https://github.com/twreporter/twreporter-npm-packages/commit/1e71014466275bf02bced9fead798e057344c931))

### BREAKING CHANGES

- **redux:** action will resolve with success action and
  reject with fail action.
  Application code should catch action error,
  otherwise, it occurs Promise rejection not handled error.

* consolidate first layer properties of actions

  - action object structure should be
    {
    type: actionType,
    payload: {
    // stuff should be handled by reducers
    // is put here.
    }
    }

* dispatch dataAlreadyExists, noMoreDataToFetch,
  lastActionIsStillProcessing actions

* isomorphic-fetch -> axios

* error-action-creators: change plain error object to Error instance

* only contain informative properties of axios config

  - the following properties would be removed:
    - httpsAgent
    - httpAgent
    - socketPath
    - maxRedirects
    - validateStatus
    - onDownloadProgress
    - onUploadProgress
    - xsrfHeaderName
    - xsrfCookieName
    - adapter
    - paramsSerializer
    - paramsSerializer

* getAccessToken: action.payload.config is removed

* remove exported functions:

  - failToReceiveAuthorCollection
  - failToFetchAuthorDetails
  - failToSearchAuthors

* enhance and refactor unit tests

## [5.0.8](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/redux@5.0.8-rc.1...@twreporter/redux@5.0.8) (2020-01-03)

**Note:** Version bump only for package @twreporter/redux

## [5.0.8-rc.1](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/redux@5.0.8-rc.0...@twreporter/redux@5.0.8-rc.1) (2020-01-03)

**Note:** Version bump only for package @twreporter/redux

## [5.0.8-rc.0](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/redux@5.0.7...@twreporter/redux@5.0.8-rc.0) (2020-01-02)

**Note:** Version bump only for package @twreporter/redux

## [5.0.7](https://github.com/twreporter/twreporter-npm-packages/compare/@twreporter/redux@5.0.7-rc.2...@twreporter/redux@5.0.7) (2019-11-26)

**Note:** Version bump only for package @twreporter/redux

## 5.0.7-rc.2 (2019-11-26)

**Note:** Version bump only for package @twreporter/redux

### 5.0.7-rc.1

#### Notable Changes

- Export `auth` and `origins` reducers

#### Commits

- [[6acbbe9](https://github.com/twreporter/twreporter-npm-packages/commit/6acbbe9)] - Export `auth` and `origins` reducers(taylrj)

### 5.0.6

- Update photo article style constant to v2

### 5.0.5

- Update `src/constants/redux-state-field-names.js`

### 5.0.4

- Remove unused files
- Fix jsdoc comment
- Change testing library from Mocha and Chai to Jest

### 5.0.3

- Update src/actions/error-action-creators.js: remove `request` object from payload

### 5.0.2

- Add settings action/recuder for redux store
- Ignore test files while make build
- Add `settings` into `cacheFirstProps` array

### 5.0.1

- Update state caching debounce option

### 5.0.0

- Update dev environment
  - Apply `prettier` to let it handle code style
    - Use `husky` and `lint-staged` to replace `precommit-hook`
    - Upgrade `eslint` and update `.eslintrc`
    - Modify source files to fit new eslint and prettier config
  - Upgrade `babel` to `^7`
  - Remove `gulp` and use `makefile` instead
  - Update `.gitignore` and `.npmignore`
- Add redux store
- Move actions and reducers from `twreporter-react` to this package
- Remove unused reducers and actions

### 4.0.3

- Bug fix. `fetchAFullTopic` should return a promise.

### 4.0.2

- Reduce the action sent while fetchAFullPost
  - Do nothing if the post we want to fetch is fully fetched and is the current selected post

### 4.0.1

- Enable pagination on posts action and reducer

### 4.0.0

- Move bookmark feature to @twreporter/registration

### 3.0.0

- Create bookmark feature for registration

### 2.1.5

- Add gulpfile
- Update topics actions and reducers
- Update topics action and reducer tests

### 2.1.4

- Remove is_feature:true param in fetchPhotographyPostsOnIndexPage function

### 2.1.3

- Add isFetching in topics and topic reducers

### 2.1.2

- Fetch topics if topics exist but is empty object
- Fix indexpage to fit lint and test

### 2.1.1

- Add isFetching for GET_CONTENT_FOR_INDEX_PAGE

### 2.1.0

- Add process.env.API_HOST, process.env.API_PORT, process.env.API_PROTOCOL and process.env.API_DEFAULT_VERSION
  variables for clients to overwrite the api config

### 2.0.1

- store slug in payload if action error occurs

### 2.0.0

- code refactoring, especially change the redux-state-fields data structure

### 1.0.7

- expose formatAPIURL function
- update fetchPhotographyPostsOnIndexPage function. Fetch featured posts.
- Update utils/form-api-url.js. Give toEncode param
