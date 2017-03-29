import React, { Component } from 'react'
import CircularProgress from 'material-ui/Circularprogress'
import MyLink from './my_link'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'


class Profiles extends Component {
  constructor(p) {
    super(p)
    this.state = {
      profile: {},
    }

  }
  componentWillMount() {
    fetch(`/django/poem/api/users/${this.props.match.params.user_id}`)
      .then(response => response.json())
      .then(json => this.setState({ profile: json }))
  }
  render() {
    const toRender = this.state.profile.username ? (
      <div>
         <h2>{this.state.profile.username}</h2>
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
        </div>
    ) : (<CircularProgress />)
    return (
      <div >
        {toRender}
      </div>
    )
  }
}

export default Profiles
