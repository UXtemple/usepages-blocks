import { Action } from 'panels-ui';
import React, { Component } from 'react';

class Launcher extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onChange(event) {
    this.setState({
      text: this.refs.text.value
    });
  }

  render() {
    const { text } = this.state;
    const { props } = this;
    const [_, before, after] = props.href.match(/(.*)TEXT(.*)/);
    const href = props.href.replace(/TEXT/g, text);

    return (
      <div style={{...style.wrapper, ...props.style}}>
        <div style={style.text}>
          {before}
          <input type={props.input.type}
            onChange={e => this.onChange(e)}
            placeholder={props.input.placeholder}
            ref='text'
            style={{...style.input, ...props.input.style}} />
          {after}
        </div>

        {text && (
          <Action href={href} style={props.action.style}>
            {props.action.text}
          </Action>
        )}
      </div>
    );
  }
}
Launcher.defaultProps = {
  input: {
    type: 'text'
  },
  action: {}
}
export default Launcher;

const style = {
  input: {
    borderBottom: '1px solid black',
    fontSize: 14,
    outline: 0,
    paddingLeft: 5,
    paddingRight: 5
  },
  text: {
    flex: 1,
    flexDirection: 'row'
  },
  wrapper: {
    flexDirection: 'row',
    fontSize: 14
  }
};
