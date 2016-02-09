import { flexWrapWrap } from 'browser-vendor-prefix';
import { Teleport } from 'panels-ui';
import GoTo from './go-to';
import OnClick from './on-click';
import React, { Component, PropTypes } from 'react';

export default function createGroup(name, style) {
  class Group extends Component {
    render() {
      const { blocks, goTo, onClick, style: baseStyle, teleportTo, renderBlocks: propsRenderBlocks, ...rest } = this.props;
      const { context } = this;
      const renderBlocks = context.renderBlocks || propsRenderBlocks;

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
        <Base style={{...baseStyle, ...style, ...flexWrapWrap}} {...rest} {...baseProps}>
          {renderBlocks(blocks, name)}
        </Base>
      );
    }
  }
  Group.displayName = name;
  Group.contextTypes = {
    renderBlocks: PropTypes.func
  };
  return Group;
}
