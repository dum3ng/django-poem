import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class PoemApp extends Component {

  render() {
    return (
      <Router basename='/django/poem/'>
        <MuiThemeProvider>
          <div>
            <Switch>
            <Route path='/login' component={ Login } />
            <Route path='/register' component={ Register } />
            <Route  path='/' component={ Home } />
            <Route component={ NoMatch } />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

const NoMatch = ({location}) => (
  <div> No match for
    { location.pathname }
  </div>
)

ReactDOM.render(<PoemApp />, document.getElementById('app'))
