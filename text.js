import React from 'react';

export default ({element: Element='div', lineBreak: marginTop, style, text=''}) => (
  <Element style={style}>
    {`${text}`.split('\n').map((t, i) => <div key={i} style={i ? {marginTop} : {}}>{t}</div>)}
  </Element>
);
