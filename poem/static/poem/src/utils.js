import React from 'react'
import store from './db'
import Cookies from 'js.cookie'

function wrapObservable (comp, name, toObserve) {
  if (!name) {
    toObserve = store
    name = "store"
  }
  const extra = {}
  extra[name] = toObserve
  return props => React.createElement(comp, Object.assign({}, extra, props), props.children)
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
