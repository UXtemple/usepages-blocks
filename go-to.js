import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class GoTo extends Component {
  constructor(props, context) {
    super(props, context);
    this.className = `GoTo-${uniqueId()}`;
  }

  render() {
    const { className, props: { styleActive, styleHover, ...props } } = this;

    const inlineStyle = styleHover ? `.${className}:hover {${toCSS(styleHover)}}` : '';

    if (props._ref) {
      props.ref = _ref;
    }

    return (
      <a {...props} className={className} target={'_blank'}>
        {props.children}
        <style>
          {inlineStyle}
        </style>
      </a>
    );
  }
}
GoTo.propTypes = {
  href: PropTypes.string.isRequired,
  _ref: PropTypes.func,
  style: PropTypes.object,
  styleActive: PropTypes.object,
  styleHover: PropTypes.object
};
