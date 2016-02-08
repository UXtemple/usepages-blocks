import React from 'react';

export default props => {
  const Element = props.element || 'div';

  return <Element style={props.style}>{props.text}</Element>;
};
