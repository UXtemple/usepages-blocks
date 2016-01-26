import React from 'react';
import toCSS from 'style-to-css';

const Button = props => {
  const className = `Button-${Date.now()}`;
  let inlineStyle;

  if (props.hoverStyle) {
    inlineStyle = `.${className}:hover {${toCSS(props.hoverStyle)}}`;
  }

  let onClick = typeof props.onClick === 'function' ?
    props.onClick :
    () => console.log(props.onClick);

  return (
    <div>
      <button className={className} style={{...style, ...props.style}} onClick={onClick}>
        {props.text}
      </button>
      <style>
        {inlineStyle}
      </style>
    </div>
  );
}
export default Button;


const style = {
  background: 'transparent',
  color: "#1c75b8",
  cursor: 'pointer',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 14,
  fontWeight: 700,
  outline: 0,
  textAlign: 'left',
  textTransform: "uppercase",
  transition: "all 0.1s linear"
};
