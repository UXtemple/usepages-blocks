import { flexDirectionRow, flexWrapWrap } from 'browser-vendor-prefix';
import React, { Component, PropTypes } from 'react';

class Horizontal extends Component {
  render() {
    const { context, props } = this;
    const renderBlocks = context.renderBlocks || props.renderBlocks;

    return (
      <div style={{...props.style, ...style}}>
        {renderBlocks(props.blocks, 'horizontal')}
      </div>
    );
  }
}
Horizontal.contextTypes = {
  renderBlocks: PropTypes.func
};
export default Horizontal;

const style = {
  ...flexDirectionRow,
  ...flexWrapWrap
};
