import React, { Component } from 'react'
import CircularProgress from 'material-ui/Circularprogress'
import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List'
import Cookies from 'js.cookie'
import { wrapObservable} from '../utils'
import MyLink from './my_link'
import NeedLogin from '../common/need_login'
import Divider from 'material-ui/Divider'


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
        <h2 style={{ paddingBottom: 0, marginBottom: 5 }}>{ gettext('Me') }</h2>
        <i> { this.state.profile.username }</i>
        <br />
       <Divider />
       <strong>{gettext('Poems')}:</strong>
        <List>
        { this.state.profile.poems.map(poem => (
          <MyLink key={poem.id} to={`/${poem.id}/detail/`}>
            <ListItem primaryText={poem.title}/>
            <Divider />
          </MyLink>
        ))}
      </List>
      </div>)
    const comp = this.state.profile.username ? profile() : (<CircularProgress />)
    const toRender = isAuthenticated ? comp : (<NeedLogin loginFrom='/profile' />)

    return (
      <div>
        { toRender }
      </div>

    )
  }
}


export default wrapObservable(Profile)
