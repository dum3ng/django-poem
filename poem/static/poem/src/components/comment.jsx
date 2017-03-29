import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import ColorAvatar from './color_avatar'
import MyLink from './my_link'
import Paper from 'material-ui/Paper'
import { VWrap, HWrap } from '../common'

class Comment extends Component {
  static propTypes = {
    comment: React.PropTypes.object.isRequired,
  }
  render() {
    const {comment} = this.props
    return (
      <Paper style={{ flex: 1, padding: 20 }} zDepth={1}>
        <HWrap style={{ justifyContent: 'initial'}}>
          <VWrap style={{ width: 100 }}>
            <MyLink style={{ display: 'inline-block', textDecoration: 'none' }}to={`/profiles/${comment.author.id}/`}>
              <ColorAvatar label={comment.author.username} />
            </MyLink>
            <div>
              {comment.author.username}
            </div>
          </VWrap>
          {comment.content}
        </HWrap>
      </Paper>
    )
  }
}

export default Comment
