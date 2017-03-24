import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'

class Poem extends Component {
  static propTypes = {
    poem: React.PropTypes.object.isRequired,
  }
  state = {
    expanded: false,
  }
  expandChange = (value) => {this.setState({expanded: value})}
  render() {
    const {poem} = this.props
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.expandChange}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}>
          <Link to={`/profiles/${poem.author.id}/`}>{poem.author.username}</Link>
          <Link to={`/${poem.id}/detail/`}> {poem.title}</Link>
        </CardHeader>
        <CardText expandable >
          {poem.content }
        </CardText>
      </Card>
    )
  }
}

export default Poem
