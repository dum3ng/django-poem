import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import CircularProgress from 'material-ui/Circularprogress'
import store from '../db'


function isEmpty(obj) {
  return Object.keys(obj).length===0
}
@observer
class Detail extends Component {

  componentWillMount() {
    const poem_id = this.props.match.params.poem_id
    fetch(`/django/poem/api/poems/${poem_id}/detail/`)
      .then(response => response.json())
      .then(json => this.props.store.currentPoem=json)
  }
  render() {
    const  poem = this.props.store.currentPoem
    const toRender = (poem && !isEmpty(poem)) ? (<div> <h3>{poem.title}</h3>
        <h3><Link to={`/profiles/${poem.author.id}/`}>{poem.author.name}</Link></h3>
                             <p>{poem.content}</p>
                             {poem.comments.map((comment)=><div>{comment.content}</div>)}</div>)  : <CircularProgress />
    return (
      <div>
       {toRender}
      </div>
    )
  }
}
const DetailWrap = props => <Detail store={store} {...props} />
export default DetailWrap
