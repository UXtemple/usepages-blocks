import React from 'react';

export default ({element: Element='div', style, text=''}) => (
  <Element style={style}>
    {text.split('\n')}
  </Element>
);
