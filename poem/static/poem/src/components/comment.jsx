import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

class Comment extends Component {
  static propTypes = {
    comment: React.PropTypes.object.isRequired,
  }
  render() {
    const {comment} = this.props
    return (
      <div>
        <Link to={`/profiles/${comment.author.id}/`}><Avatar>{comment.author.username.charAt(0)}</Avatar></Link>
        {comment.content}
      </div>
    )
  }
}

export default Comment
