import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Tabs, Tab } from 'material-ui/Tabs'

import { wrapObservable} from '../utils'
import Poem from './poem'


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poems: [],
      types: [],
    }
  }

  componentDidMount() {
    fetch('/django/poem/api/types/')
      .then(res => res.json())
      .then(types => {
        this.setState({ types })
        fetch('/django/poem/api/poems/all/')
          .then(response => response.json())
          .then((ps) => {
            this.props.store.poems = ps
            console.log(this.props.store.poems)
          })
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
      render = (
        <Tabs>
          <Tab label={gettext('All')}>
            {
              poems.map(poem => (
                <Poem key={poem.id} poem={poem} />
              ))
            }
        </Tab>
          {this.state.types.map(type => (
            <Tab key={type.id} label={type.name}>
              {poems.filter(poem => poem.type === type.id)
              .map(poem => (
                <Poem key={poem.id} poem={poem} />
              ))}
            </Tab>
          ))}
        </Tabs>
      )
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

export default wrapObservable(Index)
