import { Teleport } from 'panels-ui';
import blockShape from './block-shape';
import GoTo from './go-to';
import OnClick from './on-click';
import React, { PropTypes } from 'react';

export default function createGroup(name, groupStyle) {
  const Group = ({ children, goTo, onClick, style, teleportTo, ...rest }, { _pagesIsSelecting }) => {
    const baseProps = {};
    if (_pagesIsSelecting) {
      baseProps._pagesIsSelecting = true;
      baseProps.onClick = event => {
        if (event) {
          event.preventDefault();
        }
        return true;
      };
    }

    let Base;
    if (teleportTo) {
      Base = Teleport;
      baseProps.to = teleportTo;
    } else if (goTo) {
      Base = GoTo;
      baseProps.href = goTo;
      baseProps.target = '_blank';
    } else if (onClick) {
      Base = OnClick;
      if (!baseProps.onClick) {
        baseProps.onClick = onClick;
      }
    } else {
      Base = 'div';
    }

    const finalStyle = {
      flexWrap: 'wrap',
      ...groupStyle,
      ...style
    };

    return (
      <Base style={finalStyle} {...rest} {...baseProps}>
        {children}
      </Base>
    );
  };

  Group.contextTypes = {
    _pagesIsSelecting: PropTypes.bool
  };

  Group.defaultProps = {
    blocks: [],
    style: {},
    styleActive: {},
    styleHover: {}
  };

  Group.displayName = name;

  Group.propTypes = {
    blocks: PropTypes.arrayOf(blockShape).isRequired,
    children: PropTypes.any,
    goTo: PropTypes.string,
    onClick: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    style: PropTypes.object,
    styleActive: PropTypes.object,
    styleHover: PropTypes.object,
    teleportTo: PropTypes.string
  };

  return Group;
}
