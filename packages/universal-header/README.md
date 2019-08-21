# TWReporter Universal Header

Universal header(UH) is aimed to provide the consistent user experience
whicherver twreporter sites the users visit.

Universal header has two different ways to render both on client side
and server side.

For client side rendering, we call it _STANDALONE_ header, which is
along with redux store, requesting authentication and authorization after
`componentDidMount` on the page.

For server side rendering, we call it _DEPENDENT_ header, which is a
container component(see https://redux.js.org/basics/usage-with-react for information).
Because the _DEPENDENT_ header is a container component, the redux store
needs to be prepared by clients.

See the following example codes to understand how to use UH in different
situations.

### Dependencies of UH

Make sure you have the following dependencies installed.

- react@^16.3.0 (Required)
- styled-components@^4.0.0 (Required)
- react-router-dom@^4.0.0 (Required by _DEPENDENT_ header)
- react-redux@^6.0.0 (Required by _DEPENDENT_ header)
- redux and redux-thunk (Required by _DEPENDENT_ header)

### Standalone Header

To use standalone header is easy, see the following example.

```javascript
// In your React components, such as app.js
import StandaloneHeader from '@twreporter/universal-header/dist/standalone-header'

class App extends React.Component {
  render() {
    // see the `isLinkExternal and releaseBranch` section for more info
    const releaseBranch = 'master'
    return (
      <React.Fragment>
        <StandaloneHeader releaseBranch={releaseBranch} />
      </React.Fragment>
    )
  }
}
```

### Dependent Header

Dependent header is more complicated to setup than standalone header.
There are three parts(reducer, store and server side data dispatching)
need to be configured by clients.

```javascript
// src/reducers/index.js of clients
import authReducer from '@twreporter/universal-header/dist/reducers/auth'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  // must be `auth` property
  auth: authReducer,
  // other reducers needed by clients
})

export default rootReducer

// src/store.js of clients
import reducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export function configureStore(initialState = {}) {
  return createstore(
    reducer,  // reducers including uh.reducers.auth
    initialstate,
    applymiddleware(thunkmiddleware) // thunk middleware is required because of uh.actions.auth
  )
}

export default {
  configureStore,
}
```

```javascript
// in src/server.js
import HeaderContainer from '@twreporter/universal-header/dist/containers/header'
import ReactDOMServer from 'react-dom/server'
import authActions from '@twreporter/universal-header/dist/actions/auth'
import store from './store.js'
import { Provider } from 'react-redux'
impport serialize from 'serialize-javascript'

app.use(*, function(req, res, next) {
	const cookie = req.get('cookie')
	const store = store.configureStore()
	const releaseBranch = process.env.RELEASE_BRANCH
	const isLinkExternal = false
  store.dispatch(authActions.getAccessToken(cookie))
  .then(() => {
    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <HeaderConatiner
          releaseBranch={releaseBranch}
          isLinkExternal={false}
        />
      </Provider>
    ) // no catch here since authActions.getAccessToken always resolve the promise

    const html = ReactDOMServer.renderToStaticMarkup(
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }}></div>
        <script dangerouslySetInnerHTML={{ __html: `window.__REDUX_STATE__=${serialize(store.getState())};` }} charSet="UTF-8"/>
        <script src="main.bundle.js" />
      </body>
    )
    res.send('<!DOCTYPE>' + html)
  })
})
```

```javascript
// in src/client.js
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import store from './store'
import HeaderContainer from '@twreporter/universal-header/dist/containers/header'
import { Provider } from 'react-redux'

let reduxState
if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__
}

const reduxStore = store.configureStore(reduxState)

// see the `isLinkExternal and releaseBranch` section for more info
const releaseBranch = process.env.RELEASE_BRANCH
const isLinkExternal = false

ReactDOM.hydrate(
  <Provider store={reduxStore}>
    <HeaderContainer
      releaseBranch={releaseBranch}
      isLinkExternal={isLinkExternal}
    />
  </Provider>,
  document.getElementById('app')
)
```

### isLinkExternal, releaseBranch and theme

#### isLinkExternal

`isLinkExternal` is a bool.

If `isLinkExternal={false}`, the links of header would be relative paths, and
links' behavior would be handled by `react-router`.

If `isLinkExternal={true}`, all the links in the header would be `href`s,
handled by normal `<a>` HTML tag.

#### releaseBranch

Currently, `releaseBranch` works with `isLinkExternal={true}`.

`releaseBranch` is used to provide different links for different environments.
`releaseBranch` could be `master`, `test`, `staging` and `release`,
and each would generate corresponding links.
EX:
If you pass `releaseBranch="master"`, then the logo link would be `http://localhost:3000`.
If you pass `releaseBranch="test"`, then the logo link would be `http://localhost:3000`.
If you pass `releaseBranch="staging"`, then the logo link would be `https://staging.twreporter.org`
If you pass `releaseBranch="release"`, then the logo link would be `https://www.twreporter.org`
If you want to know more about how we generate links, please check `src/utils/links.js` out

#### theme

You can pass `theme` prop into standalone and dependent header to have different styles.
So far, `theme` supports the following values, including `normal`, `index`, `photography` and `transparent`.
You also can check the following theme lookup table for more information.

```javascript
{
  normal: {
    fontColor: '#262626',
    backgroundColor: '#f1f1f1',
    logo: 'logo with black color fonts',
  },
  index: {
    fontColor: '#262626',
    backgroundColor: '#fff',
    logo: 'logo with black color fonts',
  },
  photography: {
    fontColor: '#fff',
    backgroundColor: '#08192d',
    logo: 'logo with white color fonts',
  },
  transparent: {
    fontColor: '#fff',
    backgroundColor: 'transparent',
    logo: 'logo with white color fonts',
  },
}
```

#### TODO for theme customization

So far, the clients can not customize `fontColor`, `backgroundColor` and `logo` by themeselves.
However, we could support `theme` either to be string or to be an object like the following spec.

```javascript
@typedef  {Object} theme
@property {string} theme.bgColor
@property {string} theme.fontColor
@property {React.Element} theme.logo
```
