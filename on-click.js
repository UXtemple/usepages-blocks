import copyToClipboard from './copy-to-clipboard';
import React, { Component } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const RESET_ACTIVE_TIMEOUT = 1000;

export default class OnClick extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  bindOnClick(onClick) {
    let finalOnClick;

    if (/^copy:/.test(onClick)) {
      const from = onClick.match(/^copy:(.+)/)[1];
      finalOnClick = () => copyToClipboard(document.querySelector(from).innerText);
    } else if (typeof onClick === 'function') {
      finalOnClick = onClick;
    } else {
      finalOnClick = () => console.log(onClick);
    }

    this.onClick = event => {
      finalOnClick(event);

      this.setState({
        active: true
      });

      this.onClickTimeout = setTimeout(() => {
        this.setState({
          active: false
        });
        this.onClickTimeout = null;
      }, RESET_ACTIVE_TIMEOUT);
    }
  }

  componentWillMount() {
    this.bindOnClick(this.props.onClick);
  }

  componentWillUnmount() {
    if (this.onClickTimeout) {
      clearTimeout(this.onClickTimeout);
    }
  }

  componentWillUpdate(nextProps) {
    this.bindOnClick(nextProps.onClick);
  }

  render() {
    const { children, onClick, style, styleActive, styleHover, ...rest } = this.props;
    const { active } = this.state;
    const className = `OnClick-${uniqueId()}`;

    const inlineStyle = !active && styleHover ? `.${className}:hover {${toCSS(styleHover)}}` : '';

    const finalStyle = active ? {
      ...style,
      ...styleActive,
      outline: 0
    } : {
      ...style,
      outline: 0,
      cursor: 'pointer'
    };

    return (
      <button {...rest} className={className} disabled={active} onClick={() => this.onClick()} style={finalStyle}>
        {children}
        <style>
          {inlineStyle}
        </style>
      </button>
    );
  }
}
