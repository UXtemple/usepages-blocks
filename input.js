import React, { Component } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class extends Component {
  render() {
    const { props } = this;

    const className = `Input-${uniqueId()}`;
    let inlineStyle = `.${className}:-webkit-autofill {
      box-shadow: 0 0 0px 1000px white inset;
      background-color: ${props.style.backgroundColor || 'transparent'} !important;
      color: ${props.style.color || 'black'} !important;
    }`;

    if (props.styleHover) {
      inlineStyle = `${inlineStyle} .${className}:hover {${toCSS(props.styleHover)}}`;
    }

    return (
      <div style={props.styleWrapper}>
        <input
          className={className}
          placeholder={props.placeholder}
          ref='input'
          style={props.style}
          type={props.type} />
        <style>
          {inlineStyle}
        </style>
      </div>
    );
  }
}
