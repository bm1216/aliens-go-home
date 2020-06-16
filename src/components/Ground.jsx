import React from 'react'
import * as Constants from '../utils/constants'


const Ground = () => {
  const groundStyle = {
    fill: '#59a941'
  };

  const division = {
    stroke: "#458232",
    strokeWidth: "4px"
  };

  console.log(Constants.skyAndGroundWidth)


  return (
    <g id="ground">
      <rect
        id="ground-2"
        data-name="ground"
        style={groundStyle}
        x={Constants.skyAndGroundWidth / -2}
        y={0}
        width={Constants.skyAndGroundWidth}
        height={100}
      />
      <line
        x1={Constants.skyAndGroundWidth/-2}
        y1={0}
        x2={Constants.skyAndGroundWidth / 2}
        y2={0}
        style={division}
      />
    </g>
  )

}

export default Ground;
