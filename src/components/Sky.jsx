import React from 'react'
import * as Constants from '../utils/constants'

const Sky = () => {
  const skyStyle = {
    fill: '#30abef',
  };

  const gameHeight = 1200;
  return (
    <rect
      style={skyStyle}
      x = {Constants.skyAndGroundWidth/-2}
      y={100 - gameHeight}
      width={Constants.skyAndGroundWidth}
      height={gameHeight}
    />
  );
};

export default Sky;
