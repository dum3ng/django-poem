import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { postFetch, wrapObservable } from '../utils'

class Login extends Component {
  state = {
    username: '',
    password: '',
    message: '',
  }
  handleLogin = () => {
    postFetch('/django/poem/api/account/login/', { username: this.state.username, password: this.state.password })
      .then(response => response.json())
      .then((json) => {
        if (json.error) this.setState({ message: json.error })
        else {
          this.props.store.login(json)
          this.setState({ message: gettext('Login successfully.') })
          setTimeout(() => this.props.history.push(this.props.store.loginFrom || '/'), 800)
          // goto home page
        }
      })

  }
  cancel = () => {
    this.props.history.push(this.props.store.loginFrom || '/')
  }
  onChange = (field, e, newValue) => {
    if (field === 'username') this.setState({ username: newValue })
    else this.setState({ password: newValue })
  }
  render() {
    return (
      <Paper style={{ width: 400, margin: 'auto', flexDirection: 'column', justifyContent: 'wrap-around', alignItems: 'center' }} zDepth={1}>
        <div>{this.state.message}</div>
        <TextField floatingLabelText={gettext('Username')} value={this.state.username} type="text" onChange={this.onChange.bind(this, 'username')} />
        <TextField floatingLabelText={gettext('Password')} value={this.state.password} type="password" onChange={this.onChange.bind(this, 'password')} />
        <div style={{ flexDirection: 'row', justifyContent: 'wrap-around', alignItems: 'center' }}>
          <RaisedButton primary label={gettext('Login')} onTouchTap={this.handleLogin} />
          <RaisedButton label={gettext('Cancel')} onTouchTap={this.cancel} />
        </div>
      </Paper>
    )
  }
}

export default withRouter(wrapObservable(Login))
