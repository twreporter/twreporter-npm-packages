## Utils - Authentication Context(AC)

### Solved Problem

In twreporter-react, App.js is kind of the entry point for authentication system. Therefore, App.js fetch all related data/info and pass those stuffs down to all children by props.

However, we will encounter the problem that we need to pass data through so many irrelevant children.

The first try out/solution is context. But, since a lot of intermediate children are PureComponent, which prevent us from using context, we jump to use observer pattern.

### Observer Pattern

So, we solve the problem by observer pattern. App.js of twreporter react initiate an instance of AC (in utils) and put it in react context.

Children get AC by react context and pass this.forceUpdate to subscribe method of AC.

Now, if the App receives new props, it will invokes all thie.forceUpdate inside subscribe list. All related children will re-render perfectly.
