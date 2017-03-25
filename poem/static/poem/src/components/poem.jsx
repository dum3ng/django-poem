import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import MyLink from './my_link'
import ColorAvatar from './color_avatar'

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
          actAsExpander
          showExpandableButton>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <MyLink to={`/profiles/${poem.author.id}/`}>
                <ColorAvatar label={poem.author.username} />
              </MyLink>
              <div>{poem.author.username}</div>
            </div>
            <MyLink style={{ display: 'inline-block', paddingLeft: 30 }} to={`/${poem.id}/detail/`}> {poem.title}</MyLink>
          </div>

        </CardHeader>
        <CardText expandable >
          {poem.content }
        </CardText>
      </Card>
    )
  }
}

export default Poem
