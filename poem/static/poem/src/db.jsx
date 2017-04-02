import { observable } from 'mobx'

class Store {
  @observable currentPoem = {}
  @observable isAuthenticated = false
  @observable user = {}
  @observable poems = undefined
  @observable registerFrom = '/'
  @observable loginFrom = '/'
  @observable drawerOpen = true
  @observable isDocked = false

  open() {
    this.drawerOpen = true
  }
  close() {
    this.drawerOpen = false
  }
  toggle() {
    this.drawerOpen = !this.drawerOpen
  }
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
