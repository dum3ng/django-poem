import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { observer } from 'mobx-react'
import store from '../db'

@observer
class Sidebar extends Component {

  render() {
    const items = !this.props.store.isAuthenticated ? (
      <div>
        <MenuItem>
          <Link to='/login'>{gettext('Login')}</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register">{gettext('Register')}</Link>
        </MenuItem>
      </div>) : (
        <div>
          <MenuItem>
            <Link to="/profile">{gettext('Me')}</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/create/">{gettext('Create')}</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/logout/">{gettext('Logout')}</Link>
          </MenuItem>
        </div>)

    return (
      <Drawer>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        { items }
      </Drawer>
    )
  }
}

const SidebarWrap = () => <Sidebar store={store} />
export default SidebarWrap
