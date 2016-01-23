import { flexDirectionColumn, flexWrapWrap } from 'browser-vendor-prefix';
import React, { Component, PropTypes } from 'react';

class Vertical extends Component {
  render() {
    const { context, props } = this;
    const renderBlocks = context.renderBlocks || props.renderBlocks;

    return (
      <div style={{...props.style, ...style}}>
        {renderBlocks(props.blocks, 'vertical')}
      </div>
    );
  }
}
Vertical.contextTypes = {
  renderBlocks: PropTypes.func.isRequired
};
export default Vertical;

const style = {
  ...flexDirectionColumn,
  ...flexWrapWrap
};
