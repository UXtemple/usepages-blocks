import React from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const GoTo = props => {
  const { styleHover, ...rest } = props;
  const className = `GoTo-${uniqueId()}`;

  const inlineStyle = props.styleHover ? `.${className}:hover {${toCSS(styleHover)}}` : '';

  return (
    <a {...rest} className={className} target='_blank'>
      {props.children}
      <style>
        {inlineStyle}
      </style>
    </a>
  );
}
export default GoTo;
