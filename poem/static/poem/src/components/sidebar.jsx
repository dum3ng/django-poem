import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import MyLink from './my_link'
import { wrapObservable } from '../utils'
import {LoginLink} from '../common/need_login'

class Sidebar extends Component {
  //  static propTypes = {
  //   open: React.PropTypes.bool.isRequired,
  //   docked: React.PropTypes.bool.isRequired,
  //   toggle: React.PropTypes.func.isRequired,
  // }
  static inItems = [['/login', gettext('Login')],
                    ['/register', gettext('Register')]]
  static outItems = [['/profile', gettext('Me')],
                     ['/create/', gettext('Create')],
                     ['/logout/', gettext('Logout')]]

  render() {
    const items = !this.props.store.isAuthenticated ? (
      <div>
        <LoginLink><MenuItem>{gettext('Login')}</MenuItem></LoginLink>
        <MyLink to='/register/'>
          <MenuItem>
            {gettext('Register')}
          </MenuItem>
        </MyLink>
      </div>) : (
        <div>
          {Sidebar.outItems.map(item => (
            <MyLink key={item[0]} to={item[0]}>
            <MenuItem>
              {item[1]}
            </MenuItem>
          </MyLink>
        ))}
        </div>)

    return (
      <Drawer
        open={this.props.store.drawerOpen}
        docked={this.props.store.isDocked}
        onRequestChange={(open) => this.props.store.drawerOpen=open}>
        <MyLink to="/">
          <MenuItem>
            {gettext('Home')}
          </MenuItem>
        </MyLink>
        {items }
      </Drawer>
    )
  }
}

//const SidebarWrap = () => <Sidebar store={store} />
export default wrapObservable(Sidebar)
//export default SidebarWrap
