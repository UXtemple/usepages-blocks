import React, { Component, PropTypes } from 'react';
import uniqueId from 'mini-unique-id';

function raw(props={}, superProps={}) {
  let rawProps = {};

  Object.keys(props).forEach(key => {
    const match = typeof props[key] === 'string' && props[key].match(/^item\.(.+)/);
    if (match) {
      rawProps[key] = superProps[match[1]];
    } else {
      if (key === 'blocks') {
        rawProps.blocks = props.blocks.map(block => morph(block, superProps));
      } else if (key === 'props') {
        rawProps.props = raw(props.props, superProps);
      } else {
        rawProps[key] = props[key];
      }
    }
  });

  return rawProps;
}

function morph(block, item) {
  return {
    ...block,
    props: raw(block.props, item)
  };
}

export default class List extends Component {
  render() {
    const { props } = this;
    const list = Array.isArray(props.list) ? props.list : [];
    const renderBlocks = this.context.renderBlocks || props.renderBlocks;

    return (
      <div>
        {renderBlocks(
          list.map(item => morph(props.block, item)),
          `list-${uniqueId()}`
        )}
      </div>
    );
  }
}
List.contextTypes = {
  renderBlocks: PropTypes.func
};
