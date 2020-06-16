import React, {Component} from "react";
import PropTypes from 'prop-types'
import { render } from "react-dom";
import { useState, useEffect } from 'react'
import { getCanvasPosition } from './utils/formulas'
import Canvas from './components/Canvas'

export default function App(props) {
  const [canvasMousePosition, trackMouse] = useState(null)

  const track = (event) => {
    trackMouse(getCanvasPosition(event))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      props.moveObjects(canvasMousePosition)
    }, 10);
    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home')
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize()
    return () => clearInterval(interval)
  })

  return (
    <Canvas
      angle={props.angle}
      trackMouse={event => (track(event))}
    />
  )
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired
};


