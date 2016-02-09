import { flexWrapWrap } from 'browser-vendor-prefix';
import { Teleport } from 'panels-ui';
import copyToClipboard from './copy-to-clipboard';
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
        Base = 'a';
        baseProps.href = goTo;
        baseProps.target = '_blank';
      } else {
        Base = 'div';
      }

      if (onClick) {
        if (/^copy:/.test(onClick)) {
          const from = onClick.match(/^copy:(.+)/)[1];
          baseProps.onClick = () => copyToClipboard(document.querySelector(from).innerText);
        } else {
          baseProps.onClick = onClick;
        }
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
