import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

export default class OnClick extends Component {
  constructor(props, context) {
    super(props, context);

    this.className = `OnClick-${uniqueId()}`;

    const manualActive = typeof props.isActive === 'boolean'
    this.state = {
      isActive: manualActive ? props.isActive : false,
      manualActive
    };
  }

  componentWillMount() {
    this.bindOnClick(this.props.onClick);
  }

  componentWillReceiveProps(nextProps) {
    this.bindOnClick(nextProps.onClick);

    const manualActive = typeof nextProps.isActive === 'boolean'

    if (manualActive) {
      this.setState({
        isActive: nextProps.isActive,
        manualActive
      })
    }
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

      if (!this.state.manualActive) {
        this.setState({
          isActive: true
        });

        this.onClickTimeout = setTimeout(() => {
          this.setState({
            isActive: false
          });
          this.onClickTimeout = null;
        }, this.props.styleActiveTimeout);
      }
    };
  }

  render() {
    const { isActive } = this.state;
    /* eslint-disable no-unused-vars */
    const {
      children, isActive: _isActive, _ref, style, styleActive, styleActiveTimeout, styleHover, ...rest
    } = this.props;
    const { className } = this;

    const inlineStyle = !isActive && styleHover ? `.${className}:hover {${toCSS(styleHover)}}` : '';

    const finalStyle = isActive ? {
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
        disabled={isActive}
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
  isActive: PropTypes.bool,
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
