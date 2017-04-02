import React, { Component } from 'react'
import { Link, Route, matchPath, Switch } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Sidebar from './sidebar'
import Profile from './Profile'
import Profiles from './profiles'
import Detail from './detail'
import Create from './create'
import Index from './index'
import Header from './header'
import { wrapObservable } from '../utils'

class Home extends Component {

  componentDidMount() {
    this.checkSize()
    window.addEventListener('resize',  this.checkSize
    )
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize)
  }
  checkSize = () => {
    if (window.innerWidth < 820) {
      this.props.store.isDocked = false
      this.props.store.close()
    } else {
      this.props.store.isDocked = true
      this.props.store.open()
    }
  }

  render() {
    return (
      <div>
        <Header onNavClick={this.toggleSidebar} />
        <Sidebar />
        <div className='main'>
          <Switch >
            <Route path='/:poem_id/detail/' component={Detail} />
            <Route path='/profile/' component={Profile} />
            <Route path='/create/' component={Create} />
            <Route path='/profiles/:user_id' component={Profiles} />
            <Route path="/" component={Index} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default wrapObservable(Home)
