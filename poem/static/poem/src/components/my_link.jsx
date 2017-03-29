import React from 'react'
import { Link } from 'react-router-dom'
import {wrapObservable} from '../utils'

const MyLink = ({store, ...rest}) => (
  <Link {...rest}
        style={{ ...rest.style, textDecoration: 'none' }}
        onTouchTap={() => {
          if (rest.onTouchTap) rest.onTouchTap()
          if (!store.isDocked) {
            store.close()
          }
    }} />)


export default wrapObservable(MyLink)
