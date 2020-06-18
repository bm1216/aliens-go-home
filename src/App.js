import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';
import * as Auth0 from 'auth0-web'
import io from 'socket.io-client'

require('dotenv').config()

Auth0.configure({
  domain: 'dev-vjfi6t9h.eu.auth0.com',
  clientID: 'wkSZLkjX0fwr6v2daqNoj6ZROEg0EmCE',
  redirectUri: `${process.env.REACT_REDIRECT_URI}`,
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
  audience: 'https://bm1216.github.io/aliens-go-home/',
})

class App extends Component {

  constructor(props) {
    super(props);
    this.shoot = this.shoot.bind(this);
  }

  componentDidMount() {
    const self = this;

    Auth0.handleAuthCallback();

    Auth0.subscribe((auth) => {
      if (!auth) return;

      const playerProfile = Auth0.getProfile();
      const currentPlayer = {
        id: playerProfile.sub,
        maxScore: 0,
        name: playerProfile.name,
        picture: playerProfile.picture
      };

      this.props.loggedIn(currentPlayer);

      const socket = io('http://localhost:3001/', {
        query: `token=${Auth0.getAccessToken()}`,
      })

      let emitted = false;
      socket.on('players', (players) => {
        this.props.leaderboardLoaded(players);

        if (emitted) return;
        socket.emit('new-max-score', {
          id: playerProfile.sub,
          maxScore: 120,
          name: playerProfile.name,
          picture: playerProfile.picture,
        })
        emitted = true;
        setTimeout(() => {
          socket.emit('new-max-score', {
            id: playerProfile.sub,
            maxScore: 222,
            name: playerProfile.name,
            picture: playerProfile.picture,
          })
        }, 5000);
      });

      console.log(auth);
    });

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

  shoot() {
    this.props.shoot(this.canvasMousePosition);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        gameState={this.props.gameState}
        startGame={this.props.startGame}
        trackMouse={event => (this.trackMouse(event))}
        players={this.props.players}
        currentPlayer={this.props.currentPlayer}
        shoot={this.shoot}
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
    currentPlayer: PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }),
    leaderboardLoaded: PropTypes.func.isRequired,
    loggedIn: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })),
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
  shoot: PropTypes.func.isRequired
};

App.defaultProps = {
  currentPlayer: null,
  players: null,
}

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


