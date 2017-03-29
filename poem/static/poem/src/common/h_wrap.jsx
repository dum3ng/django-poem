import React from 'react'

const HWrap = ({ style, children, ...rest }) => (
  <div
    {...rest}
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      ...style }}
    >
    {children}
  </div>
)

export default HWrap
