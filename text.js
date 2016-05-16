import React, { PropTypes } from 'react';

const Text = ({element: Element='div', lineBreak, _pages={}, style, text}) => (
  <Element style={style} {..._pages}>
    {`${text}`.split('\n').map((t, i) => <div key={i} style={i ? {marginTop: lineBreak} : {}}>{t}</div>)}
  </Element>
);

Text.defaultProps = {
  lineBreak: 10,
  style: {},
  text: 'Write some text'
};

Text.description = `Write some text. Use multiplines by writing "\\n" like "New\\nline".`;

Text.propTypes = {
  element: PropTypes.any,

  lineBreak: PropTypes.number,

  style: PropTypes.object,

  text: PropTypes.string.isRequired
};

export default Text;
