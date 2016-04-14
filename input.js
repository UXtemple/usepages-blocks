import React, { Component } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class extends Component {
  render() {
    const { props } = this;

    const backgroundColor = (props.style && props.style.backgroundColor) || 'transparent';
    const color = (props.style && props.style.color) || 'black';
    const className = `Input-${uniqueId()}`;
    let inlineStyle = `.${className}:-webkit-autofill {
      background-color: ${backgroundColor} !important;
      box-shadow: 0 0 0px 1000px ${backgroundColor} inset;
      color: ${color} !important;
    }`;

    if (props.styleHover) {
      inlineStyle = `${inlineStyle} .${className}:hover {${toCSS(props.styleHover)}}`;
    }

    return (
      <div style={props.styleWrapper}>
        <input
          autoComplete='off'
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
