import React, { Component, PropTypes } from 'react';
import Knocking from './knocking';

class Embed extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      error: !!props.src === false,
      isLoading: !!props.src,
      isReady: false
    };
  }

  componentWillMount() {
    this.getEmbed(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.getEmbed(nextProps.src);
    }
  }

  getEmbed(src) {
    fetch(src)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data,
          isLoading: false,
          isReady: true,
          showCover: !!data.thumbnail_url
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          message: err
        });
      });
  }

  render() {
    const { data, error, isLoading, isReady, showCover } = this.state;
    const { overCover, style, styleCover, styleCoverWrapper, styleKnocking } = this.props;

    let ret;
    if (isLoading) {
      ret = <Knocking style={styleKnocking} />;
    } else if (isReady) {
      if (showCover) {
        ret = (
          <div onClick={() => this.setState({showCover: false})} style={styleCoverWrapper}>
            { overCover && <img {...overCover} />}
            <img src={data.thumbnail_url} style={styleCover} />
          </div>
        )
      } else {
        ret = <div dangerouslySetInnerHTML={{__html: data.html}} />;
      }
    } else if (error) {
      ret = <div>{typeof message === 'undefined' ?  'Do you src in your props?' : message}</div>;
    }

    return (
      <div
        data-block={this.props['data-block']}
        style={style}
      >
        {ret}
      </div>
    );
  }
}
Embed.defaultProps = {
  overCover: false
};
Embed.propTypes = {
  overCover: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  style: PropTypes.object,
  styleCover: PropTypes.object,
  styleCoverWrapper: PropTypes.object,
  styleKnocking: PropTypes.object
}


const style = {
  cover: {
    cursor: 'pointer',
    position: 'relative'
  },
  overCover: {
    position: 'absolute',
    zIndex: 1
  }
}
export default Embed;
