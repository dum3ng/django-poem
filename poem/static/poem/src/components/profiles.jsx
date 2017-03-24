import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import CircularProgress from 'material-ui/Circularprogress'

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
        <h3>{this.state.profile.username}</h3>
        <h4>poems:</h4>
        {this.state.profile.poems.map(poem => (
          <div key={poem.id}>
            <div><Link to={`/${poem.id}/detail/`}>{poem.title}</Link></div>
          </div>
        ))}
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
