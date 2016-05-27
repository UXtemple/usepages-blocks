/* eslint-disable no-console */
import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const RESET_ACTIVE_TIMEOUT = 1000;

export default class OnClick extends Component {
  constructor(props) {
    super(props);

    this.className = `OnClick-${uniqueId()}`;
    this.state = {
      active: false
    };
  }

  componentWillMount() {
    this.bindOnClick(this.props.onClick, this.props._inPages);
  }

  componentWillUpdate(nextProps) {
    this.bindOnClick(nextProps.onClick, nextProps._inPages);
  }

  componentWillUnmount() {
    if (this.onClickTimeout) {
      clearTimeout(this.onClickTimeout);
    }
  }

  bindOnClick(onClick, _inPages) {
    const finalOnClick = typeof onClick === 'function' ? onClick : () => console.log(onClick);

    this.onClick = event => {
      finalOnClick(event);

      if (!_inPages) {
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
    };
  }

  render() {
    const { active } = this.state;
    const { children, style, styleActive, styleHover, ...rest } = this.props;
    const { className } = this;

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
      <button
        {...rest}
        className={className}
        disabled={active}
        onClick={this.onClick}
        style={finalStyle}
      >
        <style>{inlineStyle}</style>
        {children}
      </button>
    );
  }
}
OnClick.propTypes = {
  children: PropTypes.array,
  _inPages: PropTypes.bool,
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  style: PropTypes.object,
  styleActive: PropTypes.object,
  styleHover: PropTypes.object
};
