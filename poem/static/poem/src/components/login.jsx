import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { eventAuth } from '../db'


class Login extends Component {
  handleLogin = (e) => eventAuth.emit('login')
  render() {
    return (
      <div>login page
        <button onClick={this.handleLogin}>login
          </button>
      </div>
    )
  }
}

export default Login
