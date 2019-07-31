# twreporter-react-components

## What is this

The React components of articles at [The Reporter Taiwan](https://www.twreporter.org).

Published as an [npm package](https://www.npmjs.com/package/@twreporter/react-article-components).

## Why do we this

This is built for [twreporter-react](https://github.com/twreporter/twreporter-react) and [Editorial Tool](https://github.com/twreporter/keystone) (you can build the editorial tool using [Plate](https://github.com/twreporter/plate)).
These Article React Components will be used on Article Page and Editorial Tool.

## How to install this

```bash
yarn add @twreporter/react-article-components
```

## How to use this

```javascript
// es6
import Article from '@twreporter/react-article-components'

const Page = ({ record }) => <Article post={record} />
```

## How to develop this

There are two dev modes:

1. We use `webpack-dev-server` to render a mock article with all elements for development.

   ```bash
   # Start the webpack-dev-server
   npm run dev-server
   ```

2. Or use `babel --watch` to complie the source file if there's any change happened

   ```bash
   make dev
   ```

## How to build this

```bash
# Build the distribution files
make build
```
