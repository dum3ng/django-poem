import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {wrapObservable} from '../utils'

class Header extends Component {

  render() {
    return (
      <div style={{ backgroundColor: '#4285F4', height: 50, position: 'relative', width: '100%', top: 0, left: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 10, display: 'inline-block' }} onTouchTap={() => this.props.store.toggle()} >
          <span style={{ lineHeight: '50px', fontSize: 40 }}>≣</span>
        </div>
        <div style={{ position: 'absolute', right: 50, bottom: 10, fontSize: '30px', fontFamily: 'Roboto, sans-serif', color: 'white'}}>
          {gettext('Poems of cabin')}
        </div>
      </div>
    )
  }
}

export default wrapObservable(Header)
