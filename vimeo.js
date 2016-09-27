import Embed from './embed';
import React, { PropTypes } from 'react';

const whitelist = [
  'autopause',
  'autoplay',
  'byline',
  'color',
  'height',
  'loop',
  'maxheight',
  'maxwidth',
  'portrait',
  'title',
  'width'
];

function asParams(params) {
  return Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
}

function createSrc(props) {
  const { video, ...rest } = props;

  const config = {
    autoplay: true,
    byline: false,
    title: false,
    url: `https%3A//vimeo.com/${video}`,
    width: 360
  };

  Object.keys(rest).forEach(key => {
    if (whitelist.indexOf(key) > -1) {
      config[key] = rest[key];
    }
  });

  return `https://vimeo.com/api/oembed.json?${asParams(config)}`;
}

const Vimeo = props => <Embed src={createSrc(props)} {...props} />;
Vimeo.propTypes = {
  ...Embed.propTypes,
  video: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default Vimeo
