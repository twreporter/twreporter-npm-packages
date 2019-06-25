class AuthenticationContext {
  constructor(ifAuthenticated, signOutAction) {
    this.ifAuthenticated = ifAuthenticated
    this.signOutAction = signOutAction
    this.subscribers = []
  }

  setIfAuthenticated(ifAuthenticated) {
    this.ifAuthenticated = ifAuthenticated
    this.subscribers.forEach(f => f())
  }

  subscribe(f) {
    if (typeof f !== 'function') {
      throw new Error('The parameter need to be function')
    }
    this.subscribers.push(f)
  }
}

export default AuthenticationContext
