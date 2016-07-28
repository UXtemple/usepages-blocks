import React, { PropTypes } from 'react';

const Text = ({ 'data-block': dataBlock, element: Element, lineBreak, style, text }) => {
  const styleLine = { marginTop: lineBreak };

  return (
    <Element data-block={dataBlock} style={style}>
      {`${text}`.split('\n').map((t, i) => (
        <div key={i} style={i ? styleLine : undefined}>{t}</div>
      ))}
    </Element>
  );
};

Text.defaultProps = {
  element: 'div',
  lineBreak: 10,
  style: {},
  text: 'Write some text'
};

Text.propTypes = {
  'data-block': PropTypes.string,
  element: PropTypes.any,
  lineBreak: PropTypes.number,
  style: PropTypes.object,
  text: PropTypes.string.isRequired
};

export default Text;
