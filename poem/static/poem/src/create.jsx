import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'
// const t = '[{\"}]'
// const types = JSON.parse()
injectTapEventPlugin()

class App extends Component {
  constructor(p) {
    super(p)
    this.state = {
      type: [],
      value: types[0].pk,
    }
  }
  handleChange = (e, index, value) => this.setState({ value })
  render() {
    return (
      <MuiThemeProvider>
        <SelectField
          floatingLabelText={gettext('Type')}
          value={this.state.value}
          onChange={this.handleChange}
        >
          {types.map((type) => <MenuItem key={type.pk} value={type.pk} primaryText={type.fields.name} />)}
          </SelectField>
      </MuiThemeProvider>
    )
  }
}
console.log(gettext('There are no comments now. Be the FIRST to comment!'))
ReactDOM.render(<App />, document.getElementById('type'))
