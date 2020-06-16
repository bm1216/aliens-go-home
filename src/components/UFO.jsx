import React from 'react';
import PropTypes from 'prop-types';
import UFOBase from './UFOBase';
import UFOTop from './UFOTop';

const UFO = props => (
  <g>
    <UFOBase position={props.position} />
    <UFOTop position={props.position} />
  </g>
);

UFO.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default UFO;