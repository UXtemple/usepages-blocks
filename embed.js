import React, { Component } from 'react';

const ShowContent = props => {
  const showContentStyle = {
    ...style.showContent,
    height: props.height,
    left: `calc(50% - ${props.width/2}px)`,
    top: `calc(50% - ${props.height/2}px)`,
    width: props.width
  };

  return (
    <svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1" style={showContentStyle}>
      <polygon fill={props.fill} points="1,0 20,10 1,20" />
    </svg>
  );
}

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: !!props.url === false,
      isLoading: !!props.url,
      isReady: false
    };
  }

  componentWillMount() {
    this.getEmbed();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.getEmbed();
    }
  }

  getEmbed() {
    fetch(this.props.url)
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
    const { error, data, isLoading, isReady, showCover } = this.state;
    const { cover } = this.props;
    let ret;

    if (isLoading) {
      ret = 'Loading...';
    } else if (isReady) {
      if (showCover) {
        ret = (
          <div onClick={() => this.setState({showCover: false})} style={style.cover}>
            <ShowContent {...cover} />
            <img src={data.thumbnail_url} style={style.coverImage} />
          </div>
        )
      } else {
        ret = <div dangerouslySetInnerHTML={{__html: data.html}} />;
      }
    } else if (error) {
      ret = (
        <div>
          {typeof message === 'undefined' ?  'Do you have a valid URL in your props?' : message}
        </div>
      )
    }

    return <div style={this.props.style}>{ret}</div>;
  }
}
Embed.defaultProps = {
  cover: {
    fill: 'white',
    height: 60,
    width: 60
  }
}

const style = {
  cover: {
    cursor: 'pointer',
    position: 'relative'
  },
  showContent: {
    position: 'absolute',
    zIndex: 1
  }
}
export default Embed;
