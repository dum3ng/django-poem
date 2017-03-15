import React from 'react'
import Rx from 'rx'

const util = {}
const connect = function(component, dict) {
  const ret = function(props) {
    var p = Object.assign({}, dict, props)
    return React.createElement(component, Object.assign({}, dict, props), props.children)
  }
  return ret
}

// d is {key: sub}
const subscribe = function(comp, d) {
  comp.state = Object.assign({}, comp.state,)
  for (let k of Object.keys(d)) {
    Rx.Observable.fromEvent(d[k], 'change')
      .subscribe((value) => {
        let s = {}
        s[k] = value
        comp.setState(s)
      })
  }
}

/* Atom */
const Atom = function(value) {}
Atom.prototype.defer = function() {
  return this.value
}

export default util
export { connect, subscribe }
