import { Action } from 'panels-ui';
import React from 'react';

export default props => {
  const style = props.style || {};

  return (
    <Action activeStyle={style.active}
      hoverStyle={style.hover}
      href={props.href}
      style={style.base}
      title={props.text}>

      {props.text}
    </Action>
  );
}
