import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class OnClick extends Component {
  constructor(props, context) {
    super(props, context);

    this.className = `OnClick-${uniqueId()}`;
    this.state = {
      active: false
    };
  }

  componentWillMount() {
    this.bindOnClick(this.props.onClick);
  }

  componentWillUpdate(nextProps) {
    this.bindOnClick(nextProps.onClick);
  }

  componentWillUnmount() {
    if (this.onClickTimeout) {
      clearTimeout(this.onClickTimeout);
    }
  }

  bindOnClick(onClick) {
    /* eslint-disable no-console */
    const finalOnClick = typeof onClick === 'function' ? onClick : () => console.log(onClick);

    this.onClick = event => {
      finalOnClick(event);

      event.stopPropagation();

      this.setState({
        active: true
      });

      this.onClickTimeout = setTimeout(() => {
        this.setState({
          active: false
        });
        this.onClickTimeout = null;
      }, this.props.styleActiveTimeout);
    };
  }

  render() {
    const { active } = this.state;
    /* eslint-disable no-unused-vars */
    const {
      children, _ref, style, styleActive, styleActiveTimeout, styleHover, ...rest
    } = this.props;
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

    if (_ref) {
      rest.ref = _ref;
    }

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
OnClick.defaultProps = {
  styleActiveTimeout: 1000
};
OnClick.propTypes = {
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  _ref: PropTypes.func,
  style: PropTypes.object,
  styleActive: PropTypes.object,
  styleActiveTimeout: PropTypes.number.isRequired,
  styleHover: PropTypes.object
};
