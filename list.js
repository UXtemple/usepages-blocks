import blockShape from './block-shape';
import React, { Component, PropTypes } from 'react';
import uniqueId from 'mini-unique-id';

function raw(props={}, superProps={}) {
  let rawProps = {};

  Object.keys(props).forEach(key => {
    const match = typeof props[key] === 'string' && props[key].match(/^item\.(.+)/) || props[key] === 'item';
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

class List extends Component {
  render() {
    const { props } = this;
    const list = Array.isArray(props.list) ? props.list : [];

    return (
      <div>
        {this.context.renderBlocks(
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

List.defaultProps = {
  block: {
    block: 'Text',
    props: {
      block: 'item.text'
    }
  },

  list: [{
    text: 'item 1'
  }, {
    text: 'item 2'
  }]
};

List.description = `For things that need to be repeated :).
Within your block you get access to a special keyword item which is a reference to every item on the
list. Use it to show dynamic data.
PS: A list can take data from outside the panel, e.g.: props.blocks would use the blocks given by
the props. You can test this in pages by setting blocks: [] in states.`;

List.propTypes = {
  block: blockShape.isRequired,

  list: PropTypes.array.isRequired
};

export default List;
