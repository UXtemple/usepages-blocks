import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class Input extends Component {
  constructor(props, context) {
    super(props, context);
    this.className = `Input-${uniqueId()}`;
  }

  render() {
    const { className } = this;
    const { onEnter, _ref, style, styleHover, styleWrapper, ...rest } = this.props;

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
      /* eslint-disable no-console */
      const finalOnEnter = typeof onEnter === 'function' ? onEnter : () => console.log(onEnter);
      onKeyUp = event => event.key === 'Enter' && finalOnEnter(event);
    }

    return (
      <div style={styleWrapper}>
        <input
          {...rest}
          autoComplete="off"
          className={className}
          onKeyUp={onKeyUp}
          ref={_ref}
          style={style}
        />
        <style>{inlineStyle}</style>
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
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  _ref: PropTypes.func,
  style: PropTypes.object,
  styleHover: PropTypes.object,
  styleWrapper: PropTypes.object,
  type: PropTypes.string.isRequired
};
