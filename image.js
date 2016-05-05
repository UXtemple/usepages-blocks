import React, { PropTypes } from 'react';

const Image = ({src, text, style, styleWrapper}) => (
  <div style={styleWrapper}>
    <img
      alt={text}
      src={src}
      style={style} />
  </div>
);

Image.defaultProps = {
  src: 'https://usepages.today/image-placeholder.svg',
  style: {},
  styleWrapper: {},
  text: 'Alternative text'
};

Image.description = `Add some text for when the image can't be displayed.`;

Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  styleWrapper: PropTypes.object,
  text: PropTypes.string
};

export default Image;
