import { Teleport } from 'panels-ui';
import blockShape from './block-shape';
import GoTo from './go-to';
import OnClick from './on-click';
import React, { Component, PropTypes } from 'react';

export default function createGroup(name, style) {
  class Group extends Component {
    render() {
      const { blocks, children, goTo, onClick, style: baseStyle, teleportTo, _pages={}, ...rest } = this.props;
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

      return (
        <Base style={{...baseStyle, ...style, flexWrap: 'wrap'}} {...rest} {...baseProps} {..._pages}k>
          {children || (typeof renderBlocks === 'function' && renderBlocks(blocks, `${_pages.path}/props/blocks`))}
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
Use the teleportTo prop to connect to another panel, onClick prop to turn this into a button that runs a function when clicked; or the goTo prop to link to an external website.`;

  Group.displayName = name;

  Group.propTypes = {
    blocks: PropTypes.arrayOf(blockShape).isRequired,

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
