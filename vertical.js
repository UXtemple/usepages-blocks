import { flexDirectionColumn, flexWrapWrap } from 'browser-vendor-prefix';
import React, { Component, PropTypes } from 'react';

class Vertical extends Component {
  render() {
    const { context, props } = this;

    return (
      <div style={{...props.style, ...style}}>
        {context.renderBlocks(props.blocks, 'vertical')}
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
