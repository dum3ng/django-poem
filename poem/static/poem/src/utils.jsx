import React from 'react'
import Cookies from 'js.cookie'
import store from './db'
import { observer } from 'mobx-react'

function wrapObservable(Comp, name, toObserve) {
  if (!name) {
    toObserve = store
    name = "store"
  }
  const extra = {}
  extra[name] = toObserve
  const Ob = observer(Comp)
  return props => (<Ob {...extra} {...props} />)
  //return observer(props => (<Comp {...props} {...extra} />))
//  return observer(props => React.createElement(comp, Object.assign({}, extra, props), props.children))
}

function postFetch(url, data) {
  const form = new FormData()
  for (let key of  Object.keys(data)) {
    form.append(key, data[key])
  }
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: form,
  })
}

export {
  wrapObservable,
  postFetch,
}
