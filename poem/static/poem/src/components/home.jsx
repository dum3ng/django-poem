import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, matchPath, Switch } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { observer } from 'mobx-react'
import store from '../db'
import { connect } from '../rx-react'
import Sidebar from './sidebar'
import Profiles from './profiles'
import Detail from './detail'
import Create from './create'
import Index from './index'

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

const T1 = ()=> (<h1>This is test one!</h1>)
const T2 = () => (<h2>This is test two 222!</h2>)
const testRoutes = [
  { path: '/home/t1', component: T1},
  { path: '/home/t2', component: T2},
]
@observer
class Home extends Component {

  login = () => { this.props.store.isAuthenticated = true }
  render() {
    return (
      <div>
        <Sidebar />
        <div style={ { marginLeft: 256 } }>
          <button onClick={ this.login }>login</button>
          <Switch >
            <Route exact path='/' component={Index}/>
            <Route path='/:poem_id/detail/' component={Detail}/>
      </Switch>

        </div>
      </div>
    )
  }
}

// //test
// const match = matchPath('/2/detail/',{path:'/:poem_id/detail/',
//                                      },
//                        )
// console.log(`match: ${match}`, match)

const HomeWrap = () => <Home store={ store } />

export default HomeWrap
