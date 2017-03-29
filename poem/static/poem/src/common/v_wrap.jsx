import React from 'react'

const VWrap = ({ style, children, ...rest }) => (
  <div
    {...rest}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      ...style }}
    >
    {children}
  </div>
)

export default VWrap
