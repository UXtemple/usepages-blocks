import blockShape from './block-shape';
import Knocking from './knocking';
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
  constructor(props) {
    super(props);

    this.state = this._getState(props);
  }

  componentDidMount() {
    if (!this.state.isReady) {
      this._fetch();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list !== prevProps.list) {
      this.setState(this._getState(this.props));
    }

    if (this.state.isReady !== prevState.isReady && !(this.state.error || this.state.isLoading || this.state.isReady)) {
      this._fetch();
    }
  }

  async _fetch() {
    let res;

    try {
      this.setState({
        error: false,
        isLoading: true,
        isReady: false
      });

      res = await fetch(this.props.list);
      const list = await res.json();

      this.setState({
        list,
        error: false,
        isLoading: false,
        isReady: true
      });
    } catch(err) {
      this.setState({
        error: true,
        isLoading: false,
        isReady: false
      })
    }
  }

  _getState(props) {
    const isArray = Array.isArray(props.list);
    const isReady = isArray || !/^https?:\/\//.test(props.list);

    return {
      list: isArray ? props.list : [],
      error: false,
      isLoading: false,
      isReady
    };
  }

  render() {
    const { block } = this.props;
    const { error, list, isLoading, isReady } = this.state;
    const blocks = list.map(item => morph(block, item));

    if (error) {
      return <div>Can't get {this.props.list}. Does the remote file/service exist?</div>
    } else if (isLoading) {
      return <Knocking />;
    } else if (list.length === 0) {
      return <div>Looks like your list is empty, try adding some data to it!</div>;
    } else {
      return <div>{this.context.renderBlocks(blocks, `list-${uniqueId()}`)}</div>;
    }
  }
}

List.contextTypes = {
  renderBlocks: PropTypes.func
};

List.defaultProps = {
  block: {
    block: 'Text',
    props: {
      text: 'item.text'
    }
  },

  list: [{
    text: 'item 1'
  }, {
    text: 'item 2'
  }]
};

List.description = `For things that need to be repeated :).
Within your block you get access to a special keyword item which is a reference to every item on the list. Use it to show dynamic data. PS: A list can take data from outside the panel, e.g.: props.blocks would use the blocks given by the props. You can test this in pages by setting blocks: [] in states. If the list is a URL, we will fetch the data for you! :)`;

List.propTypes = {
  block: blockShape.isRequired,

  list: PropTypes.array.isRequired
};

export default List;
