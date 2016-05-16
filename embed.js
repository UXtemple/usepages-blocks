import React, { Component } from 'react';
import Waiting from 'waiting';

const OverCover = props => {
  const overCoverStyle = {
    ...style.overCover,
    height: props.height,
    left: `calc(50% - ${props.width/2}px)`,
    top: `calc(50% - ${props.height/2}px)`,
    width: props.width
  };

  return <img src={props.src} style={props.style} />;
}

class Embed extends Component {
  constructor(props) {
    super(props);

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
    const { height, overCover, _pages={}, width } = this.props;
    const embedStyle = {
      height,
      width,
      ...this.props.style
    };
    let ret;

    if (isLoading) {
      ret = <Waiting />;
    } else if (isReady) {
      if (showCover) {
        ret = (
          <div onClick={() => this.setState({showCover: false})} style={style.cover}>
            { overCover && <OverCover {...overCover} />}
            <img src={data.thumbnail_url} style={style.coverImage} />
          </div>
        )
      } else {
        ret = <div dangerouslySetInnerHTML={{__html: data.html}} />;
      }
    } else if (error) {
      ret = <div>{typeof message === 'undefined' ?  'Do you src in your props?' : message}</div>;
    }

    return <div style={embedStyle} {..._pages}>{ret}</div>;
  }
}
Embed.defaultProps = {
  overCover: false
};

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
