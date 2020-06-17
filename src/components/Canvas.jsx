import React from 'react';
import Sky from './Sky';
import Ground from './Ground'
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import PropTypes from 'prop-types'
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import UFO from './UFO';
import Heart from './Heart';
import StartGame from './StartGame'
import Title from './Title'

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [-window.innerWidth/2, 100-gameHeight, window.innerWidth, gameHeight];
  // const viewBox = [0, 0, 50, 50]

  return (
    <svg
      id="aliens-go-home"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2"/>
        </filter>
      </defs>
      <Sky />
      <Ground />
      <CannonPipe rotation={props.angle}/>
      <CannonBase/>
      <CannonBall position={{x: 0, y:-100}}/>
      <CurrentScore score={1000}/>
      <Heart position={{x: -300, y:35}}/>
      { ! props.gameState.started &&
        <g>
          <StartGame onClick={() => props.startGame()} />
          <Title/>
        </g>
      }

      {props.gameState.flyingObjects.map(flyingObject => (
        <UFO
          key={flyingObject.id}
          position={flyingObject.position}
        />
      ))}
    </svg>
  );
};

Canvas.propTypes = {
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
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired
}

export default Canvas;