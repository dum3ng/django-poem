import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { wrapObservable} from '../utils'


const RegisterLink = (props) => {
  const touch = () => {
    props.store.registerFrom = props.registerFrom || '/'
  }
  return (
    <div onTouchTap={this.touch}>
      <Link to='/register/' >{ props.label || gettext("Register") }</Link>
    </div>
  )
}
export default wrapObservable(RegisterLink)
