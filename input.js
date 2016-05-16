import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

class Input extends Component {
  render() {
    const { props } = this;

    const backgroundColor = (props.style && props.style.backgroundColor) || 'transparent';
    const className = `Input-${uniqueId()}`;
    const color = (props.style && props.style.color) || 'black';
    const _pages = props._pages || {};
    let inlineStyle = `.${className}:-webkit-autofill {
      background-color: ${backgroundColor} !important;
      box-shadow: 0 0 0px 1000px ${backgroundColor} inset;
      color: ${color} !important;
    }`;

    if (props.styleHover) {
      inlineStyle = `${inlineStyle} .${className}:hover {${toCSS(props.styleHover)}}`;
    }

    return (
      <div style={props.styleWrapper} {..._pages}>
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

Input.description = `This is how you enter data.
The type prop tells how this behaves, it's a text field by default but it could be email, password, etc.`;

Input.defaultProps = {
  placeholder: '',
  style: {},
  styleHover: {},
  styleWrapper: {},
  type: 'text'
};

Input.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  styleHover: PropTypes.object,
  styleWrapper: PropTypes.object,
  type: PropTypes.string.isRequired
};

export default Input;
