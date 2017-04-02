import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CircularProgress from 'material-ui/Circularprogress'
import Comments from './comments'
import MyLink from './my_link'
import ColorAvatar from './color_avatar'
import { wrapObservable } from '../utils'
import store from '../db'
import VWrap from '../common/v_wrap'

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

class Detail extends Component {

  componentDidMount() {
    const poem_id = this.props.match.params.poem_id
    console.log(poem_id)
    console.log(this.props.store)
    console.log(this.props.user)
    fetch(`/django/poem/api/poems/${poem_id}/detail/`)
      .then(response => response.json())
      .then((json) => {
        this.props.store.currentPoem = json
      })
  }
  render() {
    const poem = this.props.store.currentPoem

    const toRender = (poem && !isEmpty(poem) && poem.id === parseInt(this.props.match.params.poem_id)) ? (
      <div>
        <h3>{poem.title}</h3>
        <MyLink to={`/profiles/${poem.author.id}/`}><ColorAvatar label={poem.author.username} /></MyLink>
        <VWrap style={{ marginBottom: 30 }}>
          {poem.content.split(',').map(sentence => (
            <div style={{ paddingTop: 10 }} key={sentence}>{sentence}</div>
          ))}
        </VWrap>
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
const DetailWrap = props => (<Detail store={store} {...props}/>)
export default withRouter(wrapObservable(Detail))
