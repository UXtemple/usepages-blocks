import React from 'react';

export default props => (
  <a href={props.href}
    style={props.style}
    target='_blank'
    title={props.text}>

    {props.text}
  </a>
);
