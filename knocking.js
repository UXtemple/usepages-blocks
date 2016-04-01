import React from 'react';
import Waiting from 'waiting';

const Knocking = props => (
  <div style={props.style}>
    <Waiting color={props.style.color} size={props.size} />
  </div>
);
export default Knocking;
