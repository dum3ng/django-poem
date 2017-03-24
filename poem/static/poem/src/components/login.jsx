import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'
import Cookies from 'js.cookie'
import jQuery from 'jquery'
import store from '../db'

const $ = jQuery

@observer
class Login extends Component {
  state = {
    username: '',
    password: '',
    message: '',
  }
  handleLogin = () => {
    const data = new FormData()
    data.append('username', this.state.username)
    data.append('password', this.state.password)
    const csrf = Cookies.get('csrftoken')
    const id = Cookies.get('sessionid')
    console.log('csrf token: ' + csrf)
    console.log('sessionid: ' + id)
    const headers = new Headers()
    headers.append('X-CSRFToken', csrf)

    const request = new Request('/django/poem/api/account/login/', { method: 'POST', body: data, headers, credentials: 'same-origin'})
    fetch(request)
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        if (json.error) this.setState({ message: json.error })
        else {
          this.props.store.login(json)
          this.setState({message: gettext('Login successfully.')})
          setTimeout(() => this.props.history.push(this.props.store.loginFrom || '/'), 800)
          // goto home page
        }
      })
//     fetch('/django/poem/api/account/login/', {
//     method: "post",
//     credentials: "same-origin",
//     headers: {
//         "X-CSRFToken": Cookies.get("csrftoken"),
//         "Accept": "application/json",

//     },
//     body: data
// }).then(function(response) {
//     return response.json();
// }).then(function(data) {
//     console.log("Data is ok", data);
// }).catch(function(ex) {
//     console.log("parsing failed", ex);
// });
     // $.ajaxSetup({
     //    headers: { "X-CSRFToken": Cookies.get("csrftoken") }
     // })
    // $.ajax({
    //   url: '/django/poem/api/account/login/',
    //   method: 'POST',
    //   data: {username: this.state.username, password: this.state.password},
    //   headers: { "X-CSRFToken": Cookies.get("csrftoken") }
    // }).then(response => console.log(response))
  }
  cancel = () => {
  }
  onChange = (field, e, newValue) => {
    if (field === 'username') this.setState({ username: newValue })
    else this.setState({ password: newValue })
  }
  render() {
    return (
      <Paper style={ { width: 400, margin: 'auto' } } zDepth={ 1 }>
        <div>{this.state.message}</div>
        <TextField floatingLabelText={ gettext('Username') } value={ this.state.username } type="textual" onChange={this.onChange.bind(this, 'username')}/>
        <TextField floatingLabelText={ gettext('Password') } value={ this.state.password } type="password" onChange={this.onChange.bind(this, 'password')} />
        <div>
          <RaisedButton primary label={ gettext('Login') } onTouchTap={ this.handleLogin } />
          <RaisedButton label={ gettext('Cancel') } onTouchTap={ this.cancel } />
        </div>
      </Paper>
    )
  }
}

const LoginWrap = withRouter(props => <Login store={store} {...props} />)
export default LoginWrap
