import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import CircularProgress from 'material-ui/Circularprogress'
import { List, ListItem } from 'material-ui/List'
import Avatar  from 'material-ui/Avatar'
import Comments from './comments'
import store from '../db'


function isEmpty(obj) {
  return Object.keys(obj).length === 0
}
@observer
class Detail extends Component {

  componentWillMount() {
    const poem_id = this.props.match.params.poem_id
    fetch(`/django/poem/api/poems/${poem_id}/detail/`)
      .then(response => response.json())
      .then((json) => { this.props.store.currentPoem = json })
  }
  render() {
    const poem = this.props.store.currentPoem
    const toRender = (poem && !isEmpty(poem) && poem.id === parseInt(this.props.match.params.poem_id)) ? (
      <div>
        <h3>{poem.title}</h3>
        <Link to={`/profiles/${poem.author.id}/`}><Avatar>{poem.author.username.charAt(0).toLocaleUpperCase()}</Avatar></Link>
        <p>{poem.content}</p>
        <Comments poem_id={poem.id} />
      </div>
    ) : <CircularProgress />
    return (
      <div>
        {toRender}
      </div>
    )
  }
}
const DetailWrap = props => <Detail store={store} {...props} />
export default DetailWrap
