# twreporter-npm-packages

This repository is a monorepo containing several npm packages used by the website of online news media [The Reporter](https://www.twreporter.org).

- [twreporter-npm-packages](#twreporter-npm-packages)
  - [Packages](#Packages)
  - [Developing Environment](#Developing-Environment)
    - [Yarn Workspaces](#Yarn-Workspaces)
    - [Eslint and Prettier](#Eslint-and-Prettier)
    - [Set Dev Tools](#Set-Dev-Tools)
      - [At Root](#At-Root)
      - [By Package](#By-Package)
  - [Develop](#Develop)
    - [Develop Single Package](#Develop-Single-Package)
    - [Develop all Packages](#Develop-all-Packages)
  - [Build and Publish](#Build-and-Publish)

## Packages

- `@twreporter/core`
- `@twreporter/index-page`
- `@twreporter/react-components`
- `@twreporter/react-article-components`
- `@twreporter/redux`
- `@twreporter/universal-header`

## Developing Environment

### Yarn Workspaces

We use _Yarn Workspaces_ to:

- Add and remove dependencies of all packages (subfolders) easily.
- Prevent installing duplicate dependencies across packages (subfolders). Yarn can _hoist_ them to the root folder.
- Create symlinks between packages (subfolders) that depend on each other.

Some example commands for common scienarios:

- Want to add `lodash` to the dependencies of all packages:

  ```bash
  yarn workspaces run add lodash
  ```

  [`yarn workspaces run <command>`](https://yarnpkg.com/en/docs/cli/workspaces#toc-yarn-workspaces-run)

- Want to add `react` to the peer dependencies of only `@twreporter/react-component` package:

  ```bash
  yarn workspace @twreporter/react-components add react --peer
  ```

  [`yarn workspace <workspace_name> <command>`](https://yarnpkg.com/en/docs/cli/workspace)

  **CAUTION**: The `<workspace_name>` is the `name` in `package.json` of given package, not the path string in the `workspaces` array of root `packages.json` or the dirname.

- Want to add `a-root-only-tool` to the dev dependencies of `twreporter-npm-packages` and not in any package:

  ```bash
  yarn add a-root-only-tool --dev -W
  ```

  [`yarn add <package...> [--ignore-workspace-root-check/-W]`](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-ignore-workspace-root-check-w)

The official [document](https://yarnpkg.com/en/docs/workspaces) and [blog post](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/) give clear examples showing how workspaces can get theses done.

### Eslint and Prettier

We use [Prettier](https://prettier.io/) to take care of code format and use [ESlint with JavaScript Standard Style](https://github.com/standard/eslint-config-standard) for code-quality rules. It will run `prettier` and `eslint` on pre-build and pre-commit hooks.

You can also run `prettier` and `eslint` with:

```bash
make lint --ignore-errors
# Add `--ignore-errors` flag to make tasks continue even though there is any package has linting errors
```

### Set Dev Tools

#### At Root

Install babel at root:

```bash
yarn add \
  @babel/cli @babel/core \
  @babel/preset-env @babel/preset-react \
  @babel/plugin-proposal-class-properties babel-plugin-inline-react-svg babel-plugin-styled-components \
  --dev --exact -W
```

Install eslint and prettier at root:

```bash
yarn add \
  prettier \
  babel-eslint eslint \
  eslint-config-prettier eslint-config-standard \
  eslint-plugin-babel eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard \
  --dev --exact -W
```

Install tools for linting staged files at git commit hooks at root:

```bash
yarn add \
  husky@^1.3.1 lint-staged@^8.1.5 \
  --dev -W
```

Install other dev tools at root:

```bash
yarn add rimraf --dev -W
```

#### By Package

Install webpack-dev-server if needed:

```bash
yarn workspace <workspace_name> add \
  webpack@^4.29.6 webpack-cli@^3.3.0 webpack-dev-server@^3.3.0 \
  babel-loader@^8.0.5 url-loader@^1.1.2 \
  html-webpack-plugin@^3.2.0 \
  --dev
```

## Develop

We use `babel` with `--watch` flag to re-compile the source code every time that we change it.

### Develop Single Package

```bash
# at root and want to dev `packages/core` only
make dev PKG=core
# same as at `packages/core` and run
make dev
```

### Develop all Packages

```bash
# at root
make dev
```

This will `yarn install` the packages and run `make dev` at each subfolder.

## Versioning

We use [Lerna](https://github.com/lerna/lerna) to independently bump version of each package changed since the previous tagged release.

```bash
# bump a pre-release version
# e.g. 1.0.0-rc.1 -> 1.0.0-rc.2
npm run bump-prerelease-version

# bump a stable version
# graduate prerelease versioned packages to stable versions
# e.g. 1.0.0-rc.2 -> 1.0.0
npm run bump-stable-version
```

When run, these commands do the following:

1. Identifies packages that have been updated since the previous tagged release.
2. Prompts for new versions of updated packages.
3. Modifies package metadata to reflect new release.
4. Commits those changes and tags the commit.
5. Pushes to the git remote.

The [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) is applied here to determine which version to bump (major, minor, or patch) and generate `CHANGELOG.md` files to each package. For further usage, please check [documentation of Lerna](https://github.com/lerna/lerna/tree/master/commands/version#positionals)

## Build and Publish

We use [Lerna](https://github.com/lerna/lerna) to manage package build and publish process. If some of the packages are updated at the same time, [Lerna](https://github.com/lerna/lerna) will make sure all tasks execute on packages in topologically sorted order as to respect the dependency relationships.

```bash
# at root folder, it will run the npm script in each package which contains that script
make build
```

After it is built, `Lerna` can explicitly publish packages tagged in the current commit.

```bash
# after build
make publish
```

Run both `build` and `publish` sequentially

```bash
# make build & make publish
make release
```
