import { Teleport } from 'panels-ui';
import blockShape from './block-shape';
import GoTo from './go-to';
import OnClick from './on-click';
import React, { Component, PropTypes } from 'react';

export default function createGroup(name, groupStyle) {
  class Group extends Component {
    render() {
      const { blocks, children, goTo, onClick, style, teleportTo, _pages = {}, ...rest } = this.props;
      const { renderBlocks } = this.context;

      const baseProps = {};
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
        baseProps.onClick = onClick;
      } else {
        Base = 'div';
      }

      const finalStyle = {
        ...style,
        ...groupStyle,
        flexWrap: 'wrap'
      };

      return (
        <Base style={finalStyle} {...rest} {...baseProps} {..._pages}>
          {children || (
            typeof renderBlocks === 'function' && renderBlocks(blocks, `${_pages.path}/props/blocks`)
          )}
        </Base>
      );
    }
  }

  Group.contextTypes = {
    renderBlocks: PropTypes.func
  };

  Group.defaultProps = {
    blocks: [],
    style: {},
    styleActive: {},
    styleHover: {}
  };

  Group.description = `${name} lets you nest elements. They also have some super powers :).
Use the teleportTo prop to connect to another panel, onClick prop to turn this into a button
that runs a function when clicked; or the goTo prop to link to an external website.`;

  Group.displayName = name;

  Group.propTypes = {
    blocks: PropTypes.arrayOf(blockShape).isRequired,
    children: PropTypes.any,
    goTo: PropTypes.string,
    onClick: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    _pages: PropTypes.object,
    style: PropTypes.object,
    styleActive: PropTypes.object,
    styleHover: PropTypes.object,
    teleportTo: PropTypes.string
  };

  return Group;
}
