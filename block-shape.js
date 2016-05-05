import { PropTypes } from 'react';

export default PropTypes.shape({
  block: PropTypes.string.isRequired,
  props: PropTypes.object,
  when: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ])
});
