import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { wrapObservable, postFetch } from '../utils'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import NeedLogin from '../common/need_login'
import Compose from './compose'
import { VWrap } from '../common'

class Create extends Component {
  state = {
    types: [],
    type: {},
    type_id: '',
    title: '',
    content: '',
    typeSelected: false,
  }
  componentWillMount() {
    fetch('/django/poem/api/types/')
      .then(res => res.json())
      .then(json => this.setState({ types: json }))
  }

  handleChange = (field, e, value) => {
    const d = {}
    d[field] = value
    this.setState(d)
  }
  handleTypeChange = (e, index, value) => { this.setState({ type_id: value }) }
  handleTypeSelect = (e) => {
    const id = parseInt(this.state.type_id, 10)
    const type = this.state.types.filter(t => t.id === id)[0]
    this.setState({ typeSelected: true, type })
  }
  getSelectComponent = () => (
    <VWrap>
      <SelectField
        floatingLabelText={gettext('Type')}
        value={this.state.type_id}
        onChange={this.handleTypeChange}>
        { this.state.types.map(type => (
          <MenuItem
            key={type.id}
            value={type.id}
            primaryText={type.name}
          />)) }
    </SelectField>
      <RaisedButton
    label={gettext('Go')}
    onTouchTap={this.handleTypeSelect}
    disabled={!this.state.type_id} />
      </VWrap>
  )
  getComposeComponent = () => (
    <Compose type={this.state.type} />
  )
  getToRender = () => {
    let toRender = (<NeedLogin loginFrom={this.props.location.pathname} />)
    if (this.props.store.isAuthenticated) {
      toRender = this.state.types.length > 0 ? (this.state.typeSelected ? this.getComposeComponent()
                                                 : this.getSelectComponent()
                                                ) : (
                                                  <CircularProgress />
                                                )
    }
    return toRender
  }
  render() {
    return (
      <div>
        { this.getToRender() }
      </div>
    )
  }
}

export default wrapObservable(withRouter(Create))
