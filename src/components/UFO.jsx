import React from 'react';
import PropTypes from 'prop-types';
import UFOBase from './UFOBase';
import UFOTop from './UFOTop';
import styled, { keyframes } from 'styled-components';
import {gameHeight} from '../utils/constants'

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`

const UFO = props => (
  <Move>
    <UFOBase position={props.position} />
    <UFOTop position={props.position} />
  </Move>
);

UFO.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default UFO;