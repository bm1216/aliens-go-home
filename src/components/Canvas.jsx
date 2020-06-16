import React from 'react';
import Sky from './Sky';
import Ground from './Ground'

const Canvas = () => {
  const viewBox = [-window.innerWidth/2, 100-window.innerHeight, window.innerWidth, window.innerHeight];
  // const viewBox = [0, 0, 50, 50]
  const style = {
    border: '1px solid black',
  };
  return (
    <svg
      id="aliens-go-home"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
    >
      <Sky />
      <Ground />
      <circle cx={0} cy={0} r={50}/>
    </svg>
  );
};

export default Canvas;