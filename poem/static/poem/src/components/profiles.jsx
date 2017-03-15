import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Profiles extends Component {
  constructor(p) {
    super(p)
    this.state = {
      poems: [],
    }
  }
  componentDidMount() {
    fetch(`/api/poem?author=${this.props.author.id}`)
      .then(response => JSON.parse(response))
      .then(ps => this.setState({ poems: ps }))
  }
  render() {
    return (
      <div>
        <h3>{this.props.author.name}</h3>
        <h4>poems:</h4>
        {this.state.poems.map(poem => (
                                    <Link to={`/${poem.id}/detail`}><p>{poem.title}</p></Link>
                                    ))}
      </div>
    )
  }
}
Profiles.propTypes = {
  author: React.PropTypes.any.isRequired,
}
export default Profiles
