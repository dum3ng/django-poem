import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { wrapObservable } from '../utils'
import MyLink from '../components/my_link'

const LoginLink = wrapObservable(withRouter(({ store, location, children }) => {

  return (
    <MyLink to='/login' onTouchTap={() => {
        console.log(location.pathname)
        store.loginFrom = location.pathname
      }}>{children}</MyLink>
  )}))

const NeedLogin = withRouter(({ history, ...rest }) => {
  const go = () => history.push('/login/')
  rest.store.loginFrom = rest.loginFrom || '/'
  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>{gettext('You need login to be here')}.</h2>
      <RaisedButton label='goto Login' onTouchTap={go} />
    </div>
  )
})

export default wrapObservable(NeedLogin)

export {
  LoginLink,
}
