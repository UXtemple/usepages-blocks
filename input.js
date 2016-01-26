import React from 'react';
import toCSS from 'style-to-css';

export default props => {
  const className = `Input-${Date.now()}`;
  let inlineStyle;

  if (props.styleHover) {
    inlineStyle = `.${className}:hover {${toCSS(props.styleHover)}}`;
  }

  return (
    <div style={props.styleWrapper}>
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
