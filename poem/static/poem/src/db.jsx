// import Rx from 'rx'
// import EventEmitter from 'event-emitter'

// const db = {
//   isAuthenticated: false,
// }
// const eventAuth = new EventEmitter()
// const subAuth = new EventEmitter()
// const subscription = Rx.Observable.fromEvent(eventAuth, 'login')
//       .subscribe((b) => {
//         db.isAuthenticated = true
//         subAuth.emit('change', db.isAuthenticated)})
// Rx.Observable.fromEvent(eventAuth, 'logout')
//   .subscribe((b) => {
//     db.isAuthenticated = false
//     subAuth.emit('change', db.isAuthenticated)})


// // subs


// export default db
// export { eventAuth, subAuth }

import { observable } from 'mobx'

class Store {
  @observable isAuthenticated = false
  @observable user = {}
  @observable poems = undefined
  @observable currentPoem = {}
  @observable registerFrom = '/'
  @observable loginFrom = '/'

  authen(b) {
    this.isAuthenticated = b
  }
  login(user) {
    this.user = user
    this.isAuthenticated = true
  }
  logout() {
    this.user = {}
    this.isAuthenticated = false
  }
}

const store = new Store()

export default store
