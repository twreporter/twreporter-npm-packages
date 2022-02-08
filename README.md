# twreporter-npm-packages

This repository is a monorepo containing several npm packages used by the website of online news media [The Reporter](https://www.twreporter.org).

- [twreporter-npm-packages](#twreporter-npm-packages)
  - [Packages](#packages)
  - [Developing Environment](#developing-environment)
    - [Yarn Workspaces](#yarn-workspaces)
    - [Eslint and Prettier](#eslint-and-prettier)
  - [Develop](#develop)
    - [Develop all Packages](#develop-all-packages)
    - [Develop Single Package](#develop-single-package)
    - [Add A New Package to This Repo](#add-a-new-package-to-this-repo)
  - [Test Package With Other Repo](#test-package-with-other-repo)
    - [Yalc](#yalc)
  - [CI/CD](#cicd)

## Packages

Packages are located in [`packages/`](https://github.com/twreporter/twreporter-npm-packages/tree/master/packages)

## Developing Environment

### Yarn Workspaces

We use _Yarn Workspaces_ to:

- Add and remove dependencies of all packages (sub-folders) easily.
- Prevent installing duplicate dependencies across packages (sub-folders). Yarn can _hoist_ them to the root folder.
- Create sym-links between packages (sub-folders) that depend on each other.

The official [document](https://yarnpkg.com/en/docs/workspaces) and [blog post](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/) give clear examples showing how workspaces can get theses done.

And here are some example commands for common scenarios:

- Add `lodash` to the dependencies of all packages:

  ```bash
  yarn workspaces run add lodash
  ```

  [`yarn workspaces run <command>`](https://yarnpkg.com/en/docs/cli/workspaces#toc-yarn-workspaces-run)

- Add `react` only to the peer dependencies of `@twreporter/react-component` package:

  ```bash
  yarn workspace @twreporter/react-components add react --peer
  ```

  [`yarn workspace <workspace_name> <command>`](https://yarnpkg.com/en/docs/cli/workspace)

  **CAUTION**: The `<workspace_name>` is the `name` in `package.json` of given package, not the path string in the `workspaces` array of root `packages.json` or the dirname.

- Add `a-root-only-module` to the dev dependencies of `twreporter-npm-packages` (not in the dependencies of any package):

  ```bash
  yarn add a-root-only-module --dev --ignore-workspace-root-check
  ```

  [`yarn add <package...> [--ignore-workspace-root-check/-W]`](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-ignore-workspace-root-check-w)

### Eslint and Prettier

We use [Prettier](https://prettier.io/) to take care of code format and use [ESlint with JavaScript Standard Style](https://github.com/standard/eslint-config-standard) for code-quality rules.

You can also run `prettier` and `eslint` with:

```bash
make prettier

make lint
```

## Develop

We use `babel` with `--watch` flag to re-compile the source code every time that we change it.

### Develop all Packages

```bash
# at root
make dev
```

### Develop Single Package

```bash
# to dev `packages/core` only
cd packages/core;
make dev
```

### Add A New Package to This Repo

1. Init the package with setting (TODO: use make script or .bin script to create the files)
2. Set initial version to 0.0.0 (in `package.json`)
3. When it's ready for first prerelease, add a `BREAKING CHANGE: initial release` line in the message of one of the commits in a PR, and merge that PR into `master`.
4. Update the ci caching path in `.circleci/config.yml`:

   ```yml
   - save_cache:
       key: v1-dependencies-link-{{ checksum "packages-checksums" }}
       paths:
         # ...
         - packages/[new_package_folder]/node_modules
   ```

5. Remember to set `"publishConfig.access"` to `"public"` in `package.json` of the package

## Test Package With Other Repo

To test packages with twreporter-react on local, you would need to pack & install packages into other repo's developing environment.
Following section shows how to use yalc to test universal-header on twreporter-react.
(You can also refer to [this doc](https://github.com/twreporter/between-you-and-me/blob/master/dev-notes/how-to-dev-npm-packages-comfortably.md) for other methods.)

### Yalc

1. install [yalc](https://github.com/wclr/yalc)

```bash
$ yarn global add yalc
```

2. publish package

```bash
$ cd packages/universal-header
$ yalc publish
```

3. add published package into test environment

```bash
# go to test directory
# $ cd <path to twreporter-react>
$ cd twreporter-react

$ yalc add @twreporter/universal-header
```

4. remove added package from test environment

```bash
$ cd twreporter-react

# you can also use following cmd to clean all
# $ yalc remove --all
$ yalc remove @twreporter/universal-header
```

## CI/CD

We use [CircleCI](https://circleci.com/) with [Lerna](https://github.com/lerna/lerna) for CI and CD.

When new commits are pushed to branch `master` or `release`, the CI/CD server will run `lerna` to check if there is any package needs to bump version, and also use `lerna` to publish the package which has not been published to the NPM registry yet.

Changes in `master` will be versioned/published as release candidate (rc). Changes in `release` will be versioned/published as production release.

The [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) is applied here to determine which version to bump (major, minor, or patch) and generate `CHANGELOG.md` files to each package. For further usage, please check [documentation of Lerna](https://github.com/lerna/lerna/tree/master/commands/version#positionals).
