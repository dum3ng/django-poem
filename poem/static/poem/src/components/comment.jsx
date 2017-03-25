import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import ColorAvatar from './color_avatar'

class Comment extends Component {
  static propTypes = {
    comment: React.PropTypes.object.isRequired,
  }
  render() {
    const {comment} = this.props
    return (
      <div>
        <Link style={{ textDecoration: 'none' }}to={`/profiles/${comment.author.id}/`}><ColorAvatar label={comment.author.username}>{comment.author.username.charAt(0).toLocaleUpperCase()}</ColorAvatar></Link>
        {comment.content}
      </div>
    )
  }
}

export default Comment
