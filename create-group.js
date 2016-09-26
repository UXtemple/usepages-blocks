import { Teleport } from 'panels-ui';
import GoTo from './go-to';
import OnClick from './on-click';
import React, { Component, PropTypes } from 'react';

export default function createGroup(name, groupStyle) {
  class Group extends Component {
    render() {
      const { children, goTo, style, teleportTo, ...props } = this.props;
      const { pages } = this.context;

      let Base;
      if (teleportTo) {
        Base = Teleport;
        props.to = teleportTo;
      } else if (goTo) {
        Base = GoTo;
        props.href = goTo;
      } else if (props.onClick) {
        Base = OnClick;
      } else {
        Base = 'div';
        if (props._ref) {
          props.ref = props._ref;
          delete props._ref;
        }
        delete props.styleActive;
        delete props.styleHover;
      }

      if (pages && pages.isSelecting) {
        props.onClick = event => {
          if (event) {
            event.preventDefault();
          }
          return true;
        };
      }

      return (
        <Base
          {...props}
          style={{
            flexWrap: 'wrap',
            ...groupStyle,
            ...style
          }}
        >
          {children}
        </Base>
      );
    }
  }

  Group.contextTypes = {
    pages: PropTypes.shape({
      isSelecting: PropTypes.bool
    })
  };

  Group.defaultProps = {
    style: {},
    styleActive: {},
    styleHover: {}
  };

  Group.displayName = name;

  Group.propTypes = {
    blocks: PropTypes.any,
    goTo: PropTypes.string,
    onClick: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    _ref: PropTypes.func,
    style: PropTypes.object,
    styleActive: PropTypes.object,
    styleHover: PropTypes.object,
    teleportTo: PropTypes.string
  };

  return Group;
}
