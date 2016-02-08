import React from 'react';

export default props => (
  <div style={props.styleWrapper}>
    <img
      alt={props.text}
      src={props.src}
      style={props.style} />
  </div>
);
