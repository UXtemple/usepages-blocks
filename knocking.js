import React, { PropTypes } from 'react';
import Waiting from 'waiting';

const Knocking = ({ 'data-block': dataBlock, size, style = {} }) => (
  <div data-block={dataBlock} style={style}>
    <Waiting color={style.color} size={size} />
  </div>
);

Knocking.defaultProps = {
  style: {
    color: '#323232'
  },
  size: 20
};

Knocking.description = 'A handy loading indicator ;)';

Knocking.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired
};

export default Knocking;
