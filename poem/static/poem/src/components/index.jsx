import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import store from '../db'

import Poem from './poem'



@observer
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poems: [],
    }
  }

  componentDidMount() {
    fetch('/django/poem/api/poems/all/')
      .then(response => response.json())
      .then(ps => {
        this.props.store.poems = ps;
        console.log(this.props.store.poems)
      })

  }
  //  goDetail = (e) => this.props.store.currentPoemId =
  render() {
    let render
    const poems = this.props.store.poems
    if (poems) {
      // render = poems.map((poem, index) => (
      //   <li key={ poem.id }>
      //     <Link  to={ `/${poem.id}/detail/` } >
      //     { poem.title }
      //     { gettext('Author') }:
      //     { poem.author.username }
      //     </Link>
      //   </li>
      // ))
      render = poems.map((poem, index) => (
        <Poem key={poem.id} poem={poem} />
      ))
    } else {
      render = <CircularProgress />
    }
    return (
      <div>
        <ul>
          { render }
        </ul>
      </div>
    )
  }
}
const IndexWrap = props => <Index store={ store } {...props}/>
export default IndexWrap
