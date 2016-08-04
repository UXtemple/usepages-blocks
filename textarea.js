import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const PLACEHOLDER_PREFIXES = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':placeholder-shown'
];

export default class Textarea extends Component {
  constructor(...args) {
    super(...args);
    this.id = `Textarea-${uniqueId()}`;
  }

  render() {
    const { id, props } = this;

    const inlineStyle = [];
    if (props.stylePlaceholder) {
      PLACEHOLDER_PREFIXES.forEach(prefix => {
        inlineStyle.push(`#${id}${prefix} {${toCSS(props.stylePlaceholder)}}`);
      });
    }
    if (props.styleHover) {
      inlineStyle.push(`${inlineStyle} #${id}:hover {${toCSS(props.styleHover)}}`);
    }
    if (props.styleFocus) {
      inlineStyle.push(`#${id}:focus {${toCSS(props.styleFocus)}}`);
    }

    return (
      <div>
        <style>{inlineStyle.join('\n')}</style>

        <textarea
          data-block={props['data-block']}
          defaultValue={props.text}
          id={id}
          style={props.style}
          placeholder={props.placeholder}
          ref={props._ref}
          rows={props.rows}
        />
      </div>
    );
  }
}

Textarea.defaultProps = {
  style: {},
  styleFocus: {},
  stylePlaceholder: {},
  text: ''
};
Textarea.propTypes = {
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  style: PropTypes.object,
  styleFocus: PropTypes.object,
  stylePlaceholder: PropTypes.object,
  text: PropTypes.string.isRequired
};
