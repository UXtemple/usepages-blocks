import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

class Input extends Component {
  constructor(props) {
    super(props);

    this.className = `Input-${uniqueId()}`;
  }

  render() {
    const { className } = this;
    const { onEnter, _pages = {}, style, styleHover, styleWrapper, ...rest } = this.props;

    const backgroundColor = (style && style.backgroundColor) || 'transparent';
    const color = (style && style.color) || 'black';
    let inlineStyle = `.${className}:-webkit-autofill {
      background-color: ${backgroundColor} !important;
      box-shadow: 0 0 0px 1000px ${backgroundColor} inset;
      color: ${color} !important;
    }`;

    if (styleHover) {
      inlineStyle = `${inlineStyle} .${className}:hover {${toCSS(styleHover)}}`;
    }

    let onKeyUp;
    if (typeof onEnter !== 'undefined') {
      const finalOnEnter = typeof onEnter === 'function' ? onEnter : () => console.log(onEnter);
      onKeyUp = event => event.key === 'Enter' && finalOnEnter();
    }

    return (
      <div style={styleWrapper} {..._pages}>
        <input
          {...rest}
          autoComplete='off'
          className={className}
          onKeyUp={onKeyUp}
          ref='input'
          style={style}
        />
        <style>
          {inlineStyle}
        </style>
      </div>
    );
  }
}

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
