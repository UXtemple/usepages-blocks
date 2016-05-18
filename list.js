import blockShape from './block-shape';
import dotKey from 'dot-key';
import Knocking from './knocking';
import React, { Component, PropTypes } from 'react';

function morph(block, item) {
  return {
    ...block,
    props: raw(block.props, item)
  };
}

function raw(props = {}, item = {}) {
  const rawProps = {};

  Object.keys(props).forEach(key => {
    const match = typeof props[key] === 'string' && props[key].match(/^item\.(.+)/);
    const wholeItem = props[key] === 'item';

    if (wholeItem) {
      rawProps[key] = item;
    } else if (match) {
      rawProps[key] = dotKey(match[1], item);
    } else {
      if (key === 'blocks') {
        rawProps.blocks = props.blocks.map(block => morph(block, item));
      } else if (key === 'props') {
        rawProps.props = raw(props.props, item);
      } else {
        rawProps[key] = dotKey(key, props);
      }
    }
  });

  return rawProps;
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

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.setState(this._getState(nextProps));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isReady !== prevState.isReady &&
        !(this.state.error || this.state.isLoading || this.state.isReady)) {
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
    } catch (err) {
      this.setState({
        error: true,
        isLoading: false,
        isReady: false
      });
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
    const { block, _pages = {} } = this.props;
    const { error, list, isLoading } = this.state;
    const blocks = list.map(item => morph(block, item));

    let ret;
    if (error) {
      ret = <div>Can't get {this.props.list}. Does the remote file/service exist?</div>;
    } else if (isLoading) {
      ret = <Knocking />;
    } else if (list.length === 0) {
      ret = <div>Looks like your list is empty, try adding some data to it!</div>;
    } else {
      ret = (
        <div {..._pages}>
          {this.context.renderBlocks(blocks, `${_pages.path}/props/block`)}
        </div>
      );
    }
    return ret;
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
Within your block you get access to a special keyword item which is a reference to every item on
the list. Use it to show dynamic data. PS: A list can take data from outside the panel, e.g.:
props.blocks would use the blocks given by the props. You can test this in pages by setting
blocks: [] in states. If the list is a URL, we will fetch the data for you! :)`;

List.propTypes = {
  block: blockShape.isRequired,
  list: PropTypes.array.isRequired,
  _pages: PropTypes.object
};

export default List;
