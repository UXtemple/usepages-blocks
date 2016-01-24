import React from 'react';
import toSlugCase from 'to-slug-case';

function toCSS(obj) {
  return Object.keys(obj).map(rawKey => {
    let key = toSlugCase(rawKey);
    if (/^webkit/.test(key) || /^moz/.test(key) || /^ms/.test(key)) {
      key = `-${key}`;
    }

    let value = obj[rawKey];
    if (typeof value === 'number') {
      value = `${value}px`;
    }

    return `${key}:${value} !important;`;
  }).join('');
}

export default props => {
  const className = `Input-${Date.now()}`;
  let inlineStyle;

  if (props.hoverStyle) {
    inlineStyle = `.${className}:hover {${toCSS(props.hoverStyle)}}`;
  }

  return (
    <div>
      <input
        className={className}
        type={props.type}
        placeholder={props.placeholder}
        style={{...style, ...props.style}} />
      <style>
        {inlineStyle}
      </style>
    </div>
  );
}

const style = {
  "backgroundColor": "white",
  "border": "2px solid #939598",
  "borderRadius": 5,
  "color": "#939598",
  "fontWeight": "400",
  "fontSize": 12,
  "height": 40,
  outline: 0,
  "paddingLeft": 10,
  "paddingRight": 20,
  "transition": "border 0.1s linear"
};
