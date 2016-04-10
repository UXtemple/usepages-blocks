import React from 'react';
import Waiting from 'waiting';

const Knocking = ({style={}, size}) => (
  <div style={style}>
    <Waiting color={style.color} size={size} />
  </div>
);
export default Knocking;
