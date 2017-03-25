import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/Textfield'
import RaisedButton from 'material-ui/RaisedButton'
import { wrapObservable, postFetch } from '../utils'
import Comment from './comment'

class Comments extends Component {
  static propTypes = {
    poem_id: React.PropTypes.number.isRequired,
  }
  state = {
    comments: [],
    content: '',
  }
  componentWillMount() {
    this.fetchComments()
  }
  onChange = (e, value) => {
    this.setState({ content: value })
  }

  fetchComments = () => {
    fetch(`/django/poem/api/poems/${this.props.poem_id}/comments/`)
      .then(res => res.json())
      .then((json) => {
        const comments = json.comments.sort(function(c0, c1) {
          return c1.pub_date.localeCompare(c0.pub_date)
        })

        this.setState({ comments: comments }) })
  }
  refresh = () => {
    this.fetchComments()
  }
  makeComment = () => {
    postFetch(`/django/poem/api/poems/${this.props.poem_id}/comments/new/`, { content: this.state.content })
      .then(res => res.json())
      .then((json) => {
        if (json.error) {
          return
        }
        const comments = json.comments.sort((c0, c1) => c1.pub_date.localeCompare(c0.pub_date))

        this.setState({ comments, content: '' })
      })
  }
  render() {
    let commentBox = <div />
    if (this.props.store.isAuthenticated) {
      commentBox = (<div>
                    <TextField floatingLabelText='write some comment' multiLine onChange={this.onChange} value={this.state.content}/>
                    <RaisedButton onTouchTap={this.makeComment} label={gettext('Submit')} />
                    </div>)
    }
    return (
      <div>
        { commentBox }
        {this.state.comments.map(c => (
          <div  key={c.id}>
            <Comment comment={c} />
            <br />
          </div>

        ))}
      </div>
    )
  }
}

export default wrapObservable(Comments)
