import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, matchPath, Switch } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { observer } from 'mobx-react'
import store from '../db'
import { connect } from '../rx-react'
import Sidebar from './sidebar'
import Profile from './Profile'
import Profiles from './profiles'
import Detail from './detail'
import Create from './create'
import Index from './index'
import { wrapObservable } from '../utils'

const routes = [
  {
    path: '/:poem_id/detail/',
    id: 0,
    exact: true,
    component: Detail,
  },
  {
    path: '/profiles/:user_id/',
    id: 1,
  //  exact: true,
    component: Profiles,
  },
  {
    path: '/create/',
    id: 2,
   // exact: true,
    component: Create,
  },
  {
    path: '/',
    id: 3,
    exact: true,
    component: Index,
  },
]

@observer
class Home extends Component {


  render() {
    return (
      <div>
        <Sidebar />
        <div className='main'>
          <Switch >

            <Route path='/:poem_id/detail/' component={Detail} />
            <Route path='/profile/' component={Profile} />
            <Route path='/create/' component={Create} />
            <Route path='/profiles/:user_id' component={Profiles} />
             <Route  path="/" component={Index} />
          </Switch>
        </div>
      </div>
    )
  }
}

//const HomeWrap = props => <Home store={store} {...props} />

export default wrapObservable(Home)
