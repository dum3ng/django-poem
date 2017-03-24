import React, { Component } from 'react'
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom'
import CircularProgress from 'material-ui/Circularprogress'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'
import Cookies from 'js.cookie'
import store from '../db'


const toLogin = withRouter(({history}) => {
  let touch = e => { history.push('/login/') }
  return (
    <div>
      You need log in to see this page.

    </div>
  )
})

@observer
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
    }
  }
  componentWillMount() {
    if(this.props.store.isAuthenticated)
      fetch(`/django/poem/api/users/${this.props.store.user.id}`, {
        method: 'GET',
        credential: 'same-origin',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        }
    }).then(response => response.json())
      .then(json => this.setState({
        profile: json }))
  }
  render() {
    const { user, isAuthenticated } = this.props.store
    const profile = () => (
      <div>
        { gettext('Me') }
        { gettext('Username') }: { this.state.profile.username }
        {gettext('Poems')}:
        { this.state.profile.poems.map(poem => (
          <div key={poem.id}>
            <div><Link to={`/${poem.id}/detail/`}>{poem.title}</Link></div>
          </div>
        ))}
      </div>)
    const comp = this.state.profile.username ? profile() : <CircularProgress />
      const toRender = isAuthenticated ? comp : <h1>go to ligin</h1>
          console.log(toRender)
    return (
      <div>
        { toRender }
      </div>

    )
  }
}

const ProfileWrap = props => <Profile store={store} {...props}/>
export default ProfileWrap
