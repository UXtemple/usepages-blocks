import React, { PropTypes } from 'react';

const Image = ({_pages={}, text, src, style, styleWrapper}) => (
  <div style={styleWrapper} {..._pages}>
    <img
      alt={text}
      src={src}
      style={style}
      title={text} />
  </div>
);

Image.defaultProps = {
  src: 'https://files.usepages.today/usepages.today/image-placeholder.svg',
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
