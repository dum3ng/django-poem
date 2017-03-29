import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { postFetch } from '../utils'
import RaisedButton from 'material-ui/RaisedButton'
import { VWrap } from '../common'
import Paper from 'material-ui/Paper'

class Compose extends Component {
  static propTypes = {
    type: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    const {type} = this.props
    const ns = type.validator.split(/[,.]/)
    ns.pop()
    const sentences = []
    ns.forEach(n => sentences.push(''))
    this.state = {
      sentences,
      title: '',
    }
  }
  makePost = () => {

    postFetch('/django/poem/api/poems/new/', { type_id: this.props.type.id, title: this.state.title, content: this.state.sentences.join(',') })
      .then(res => res.json())
      .then(json => {
        if(json.error){
          return
        }
        this.props.history.push(`/${json.id}/detail/`)
      })
  }
  change = (index, e, value) => {

      const sentences = this.state.sentences
      sentences[index] = value
      this.setState({ sentences })

  }
  changeTitle = (e, value) => {
    this.setState({ title: value })
  }
  render() {
    return (
      <VWrap>
        {gettext('Title')}
        <div>
          <TextField value={this.state.title} onChange={this.changeTitle}/>
        </div>
        <Paper>
        {this.state.sentences.map((style, index) => (
          <div key={index}>
            <TextField value={this.state.sentences[index]} onChange={this.change.bind(this, index)} />
          </div>

        ))}
      </Paper>

        <RaisedButton
      label={gettext('Submit')}
      onTouchTap={this.makePost}/>
      </VWrap>
    )
  }
}

export default withRouter(Compose)
