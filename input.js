import React, { Component } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class extends Component {
  render() {
    const { props } = this;

    const className = `Input-${uniqueId()}`;
    let inlineStyle;

    if (props.styleHover) {
      inlineStyle = `.${className}:hover {${toCSS(props.styleHover)}}`;
    }

    return (
      <div style={props.styleWrapper}>
        <input
          className={className}
          placeholder={props.placeholder}
          ref='input'
          style={{...style, ...props.style}}
          type={props.type} />
        <style>
          {inlineStyle}
        </style>
      </div>
    );
  }
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
