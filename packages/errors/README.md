# @twreporter/core

[![NPM version](https://img.shields.io/npm/v/@twreporter/core.svg)](https://www.npmjs.com/package/@twreporter/errors)

This package provides the helpers for handling errors in the [The Reporter](https://www.twreporter.org/) website.

Inspired by [package `errors` for Go language](https://godoc.org/github.com/pkg/errors) and [the related article by Dave Cheney](https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully).

- [@twreporter/core](#twreportercore)
  - [Use](#use)
    - [errors.helpers.wrap](#errorshelperswrap)
    - [errors.helpers.unwrap](#errorshelpersunwrap)
    - [errors.helpers.cause](#errorshelperscause)
    - [errors.helpers.printAll](#errorshelpersprintall)
    - [errors.helpers.printOne](#errorshelpersprintone)
    - [errors.helpers.annotateAxiosError](#errorshelpersannotateaxioserror)
    - [errors.AnnotatingError](#errorsannotatingerror)
      - [public properties](#public-properties)
  - [Development](#development)
    - [Dev](#dev)
    - [Build](#build)
    - [Publish](#publish)

Reference:

- [JavaScript Errors and Stack Traces in Depth](https://lucasfcosta.com/2017/02/17/JavaScript-Errors-and-Stack-Traces.html)
- [V8 Stack trace API](https://v8.dev/docs/stack-trace-api)
- [Don’t just check errors, handle them gracefully](https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully)

## Use

### errors.helpers.wrap

Annotate the error with `name`, `message` and `payload`. It will return a new error that is an instance of `errors.AnnotatingError`.

See [source code and JSDoc](src/helpers/general.js#L4) for all parameters

Example:

```js
import errors from '@twreporter/error'

function doSomething() {
  try {
    const someArguments = {
      /* ... */
    }
    invokeSomethingWithError(...someArguments)
  } catch (error) {
    console.error(
      errors.helpers.wrap(
        error,
        'ErrorType',
        'failed to invoke something',
        { args: someArguments },
        invokeSomethingWithError
      )
    )
  }
}
```

### errors.helpers.unwrap

It will return the previous error in the chain that the input error belongs to.

If there is no pointer of previous error saved in the input error, it will return `null`.

It works like [the `Unwrap` method of errors in Go@^1.13](https://blog.golang.org/go1.13-errors#TOC_3.1.).

See [source code and JSDoc](src/helpers/general.js#L46) for all parameters

Example:

```js
import errors from '@twreporter/error'

function doSomething() {
  try {
    const someArguments = {
      /* ... */
    }
    invokeSomethingWithError(...someArguments)
  } catch (error) {
    /* list all error.name in errors chain */
    let _error = error
    const chain = []
    while (_error) {
      chain.push(_error)
      _error = errors.helpers.unwrap(_error)
    }
    /* ... handle the chain */
  }
}
```

### errors.helpers.cause

It will return the earliest error in the chain that the input error belongs to.

See [source code and JSDoc](src/helpers/general.js#L33) for all parameters

```js
import errors from '@twreporter/error'

function nestedFailedTask() {
  throw new Error('nested failure')
}

function invokeSomething() {
  const someArguments = { bar: 'bar' }
  try {
    nestedFailedTask()
  } catch (error) {
    throw errors.helpers.wrap(
      error,
      'ErrorType',
      'failed to invoke nested task',
      { args: someArguments }
    )
  }
}

function doSomething() {
  const someArguments = { foo: 'foo' }
  try {
    invokeSomething(someArguments)
  } catch (error) {
    const annotatingError = errors.helpers.wrap(
      error,
      'ErrorType',
      'failed to invoke something',
      { args: someArguments }
    )
    errors.helpers.cause(annotatingError) === 'nested failure' /* true */
  }
}
```

log out:

```sh
ErrorType: failed to invoke something
    at doSomething (/test.js:12:44)
  payload {"args":{"foo":"foo"}}
```

### errors.helpers.printAll

See [source code and JSDoc](src/helpers/print.js#L40) for all parameters

```js
import errors from '@twreporter/error'

function nestedFailedTask() {
  throw new Error('nested failure')
}

function invokeSomething() {
  const someArguments = { bar: 'bar' }
  try {
    nestedFailedTask()
  } catch (error) {
    throw errors.helpers.wrap(
      error,
      'ErrorType',
      'failed to invoke nested task',
      { args: someArguments }
    )
  }
}

function doSomething() {
  const someArguments = { foo: 'foo' }
  try {
    invokeSomething(someArguments)
  } catch (error) {
    const annotatingError = errors.helpers.wrap(
      error,
      'ErrorType',
      'failed to invoke something',
      { args: someArguments }
    )
    const message = errors.helpers.printAll(annotatingError, {
      withStack: true,
      withPayload: true,
    })
    console.error(message)
  }
}

doSomething()
```

log out:

```sh
Error: nested failure
 at nestedFailedTask (/test.js:4:9)
ErrorType: failed to invoke nested task
 at invokeSomething (/test.js:12:26)
 > payload {"args":{"bar":"bar"}}
ErrorType: failed to invoke something
 at doSomething (/test.js:21:44)
 > payload {"args":{"foo":"foo"}}
```

### errors.helpers.printOne

See [source code and JSDoc](src/helpers/print.js#L11) for all parameters

```js
import errors from '@twreporter/error'

function invokeSomethingWithError() {
  throw new Error('nested error')
}

function doSomething() {
  const someArguments = { foo: 'foo' }
  try {
    invokeSomethingWithError(someArguments)
  } catch (error) {
    const annotatingError = errors.helpers.wrap(
      error,
      'ErrorType',
      'failed to invoke something',
      { args: someArguments }
    )
    const message = errors.helpers.printOne(annotatingError, {
      withStack: true,
      withPayload: true,
    })
    console.error(message)
  }
}

doSomething()
```

log out:

```sh
ErrorType: failed to invoke something
 at doSomething (/test.js:12:44)
 > payload {"args":{"foo":"foo"}}
```

### errors.helpers.annotateAxiosError

See [source code and JSDoc](src/helpers/annotate-axios-error.js#L62) for all parameters

```js
import errors from '@twreporter/error'
import axios from 'axios'

async function doSomething() {
  try {
    const someArguments = {
      /* ... */
    }
    await axios.get(someArguments)
  } catch (axiosError) {
    throw errors.helpers.annotateAxiosError(axiosError)
  }
}
```

### errors.AnnotatingError

#### public properties

- `name` {string} the name of this error
- `message` {string} the message of this error
- `payload` {Object} the context information for better debugging
- `stack` {string} the stack trace from where the error be constructed. it contains the name and message of the error in the V8 engine

See [source code and JSDoc](src/annotating-error.js) for all parameters

## Development

### Dev

```bash
make dev
```

### Build

```bash
make build
```

### Publish

```bash
make publish
```
