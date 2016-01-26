import { Action } from 'panels-ui';
import React from 'react';

// TODO remove support for props.style.* once we've migrated it
// TODO invert styles in Action from panels-ui, e.g.: activeStyle * styleActive
export default props => {
  const style = props.style && props.style.base ? props.style.base : props.style;
  const styleActive = props.styleActive || (props.style && props.style.active);
  const styleHover = props.styleHover || (props.style && props.style.hover);

  return (
    <Action activeStyle={styleActive}
      hoverStyle={styleHover}
      href={props.href}
      style={style}
      title={props.tooltip}>

      {props.text}
    </Action>
  );
}
