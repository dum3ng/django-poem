import React from 'react'
import { withRouter } from 'react-router-dom'
import { wrapObservable } from '../utils'

class Logout extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  }
  componentDidMount() {
    fetch('/django/poem/api/account/logout/')
      .then(() => {
        this.props.store.logout()
        this.props.history.push('/')
      })
  }
  render() {
    return (<div />)
  }
}

export default withRouter(wrapObservable(Logout))
