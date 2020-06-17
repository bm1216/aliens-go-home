import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';

class App extends Component {
  componentDidMount() {
    const self = this;
    setInterval(() => {
        self.props.moveObjects(self.canvasMousePosition);
    }, 10);
    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize()
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        gameState={this.props.gameState}
        startGame={this.props.startGame}
        trackMouse={event => (this.trackMouse(event))}
      />
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;


/*********** HOOK IMPLEMENTATION *************/

// import React, {Component} from "react";
// import PropTypes from 'prop-types'
// import { render } from "react-dom";
// import { useState, useEffect } from 'react'
// import { getCanvasPosition } from './utils/formulas'
// import Canvas from './components/Canvas'

// export default function App(props) {
//   const [canvasMousePosition, trackMouse] = useState(null)

//   const track = (event) => {
//     trackMouse(getCanvasPosition(event))
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       props.moveObjects(canvasMousePosition)
//     }, 10);
//     window.onresize = () => {
//       const cnv = document.getElementById('aliens-go-home')
//       cnv.style.width = `${window.innerWidth}px`;
//       cnv.style.height = `${window.innerHeight}px`;
//     };
//     window.onresize()
//     return () => clearInterval(interval)
//   })

//   return (
//     <Canvas
//       angle={props.angle}
//       trackMouse={event => (track(event))}
//       gameState={props.gameState}
//       startGame={props.startGame}
//     />
//   )
// }

// App.propTypes = {
//   angle: PropTypes.number.isRequired,
//   gameState: PropTypes.shape({
//     started: PropTypes.bool.isRequired,
//     kills: PropTypes.number.isRequired,
//     lives: PropTypes.number.isRequired,
//   }).isRequired,
//   moveObjects: PropTypes.func.isRequired,
//   startGame: PropTypes.func.isRequired,
// };


