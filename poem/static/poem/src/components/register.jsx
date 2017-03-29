import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/Raisedbutton'
import observer from 'mobx-react'
import Cookies from 'js.cookie'
import store from '../db'
import { wrapObservable, postFetch } from '../utils'
import HWrap  from '../common/h_wrap'
import VWrap  from '../common/v_wrap'


class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: '',
    message: '',
  }
  handleRegister = () => {
    const { username, password1, password2 } = this.state
    postFetch('/django/poem/api/account/register/', { username, password1, password2 })
      .then(res => res.json())
      .then((json) => {
        if (json.error) {
          this.setState({message: json.error})
        }else {
          this.setState({message: gettext("Contragulation. Going to home page.")})
          this.props.store.login(json)
          setTimeout(() => {
            this.props.history.push('/')
          }, 1000)
        }
      })
  }
  change = (name, e, value) => {
    const d = {}
    d[name] = value
    this.setState(d)
  }
  cancel = () => {
    this.props.store.registerFrom = '/'
    const { history } = this.props
    history.push(this.props.store.registerFrom || '/')
  }
  render() {
    let msg = this.state.message
    if (typeof this.state.message === 'object') {
      msg = Object.keys(this.state.message).map(key => (
        <div key={this.state.message[key]}>{key}: {this.state.message[key]}</div>
      ))
    }
    return (
      <Paper style={{ width: 400, margin: 'auto', padding: 20 }}>
        <VWrap>
          <div>{ msg }</div>
          <TextField floatingLabelText={gettext('Username')} value={this.state.username} onChange={this.change.bind(this, 'username')}/>
          <TextField floatingLabelText={gettext('Password')} value={this.state.password1} type="password" onChange={this.change.bind(this, 'password1')}/>
          <TextField floatingLabelText={gettext('Password Confirm')} value={this.state.password2} type="password" onChange={this.change.bind(this, 'password2')}/>
          <HWrap>
            <RaisedButton
            primary
            label={gettext('Register')}
            onTouchTap={this.handleRegister}
            />
          <RaisedButton
            label={gettext('Cancel')}
            onTouchTap={this.cancel}
            />
          </HWrap>

        </VWrap>
      </Paper>
    )
  }
}

export default withRouter(wrapObservable(Register))
