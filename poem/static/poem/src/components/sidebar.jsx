import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { observer } from 'mobx-react'
import store from '../db'
import MyLink from './my_link'

@observer
class Sidebar extends Component {

  render() {
    const items = !this.props.store.isAuthenticated ? (
      <div>
        <MyLink to='/login'>
          <MenuItem>
            {gettext('Login')}
          </MenuItem>
        </MyLink>
        <MyLink to="/register">
          <MenuItem>
            {gettext('Register')}
          </MenuItem>
        </MyLink>
      </div>) : (
        <div>
          <MyLink to="/profile">
            <MenuItem>
              {gettext('Me')}
            </MenuItem>
          </MyLink>
          <MyLink to="/create/" >
            <MenuItem>
              {gettext('Create')}
            </MenuItem>
          </MyLink>
          <MyLink to="/logout/">
            <MenuItem>
              {gettext('Logout')}
            </MenuItem>
          </MyLink>
        </div>)

    return (
      <Drawer>
        <MenuItem>
          <MyLink to="/">Home</MyLink>
        </MenuItem>
        { items }
      </Drawer>
    )
  }
}

const SidebarWrap = () => <Sidebar store={store} />
export default SidebarWrap
