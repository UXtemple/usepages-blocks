import React, { PropTypes } from 'react';
import Waiting from 'waiting';

const Knocking = ({_pages={}, style={}, size}) => (
  <div style={style} {...pages}>
    <Waiting color={style.color} size={size} />
  </div>
);

Knocking.defaultProps = {
  style: {
    color: '#323232'
  },
  size: 20
};

Knocking.description = `A handy loading indicator ;)`;

Knocking.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired
}

export default Knocking;
