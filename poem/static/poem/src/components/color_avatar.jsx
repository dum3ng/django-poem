import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'

const COLORS = [blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500]

function getColor(str) {
  const sum = str.split('').reduce((pre, post) => pre + post.charCodeAt(0), 0)

  return COLORS[sum % COLORS.length]
}

class ColorAvatar extends Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
  }
  render() {
    return (
      <Avatar backgroundColor={getColor(this.props.label)}>
        {this.props.children || this.props.label[0].toLocaleUpperCase()}
      </Avatar>
    )
  }
}

export default ColorAvatar
