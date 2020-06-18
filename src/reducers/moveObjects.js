import {calculateAngle} from '../utils/formulas'
import createFlyingObjects from './createFlyingObjects'
import moveBalls from './moveCannonBalls';
import checkCollisions from './checkCollisions'

function moveObjects(state, action) {
  if (!state.gameState.started) return state;

  let cannonBalls = moveBalls(state.gameState.cannonBalls);

  if (!action.mousePosition) return state;

  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  }

  const newState = createFlyingObjects(state)

  const now = (new Date()).getTime();
  // makes sure flyingObjects array only contains UFO's that were created less than 4 seconds ago
  let flyingObjects = newState.gameState.flyingObjects.filter(object => (
    (now - object.createdAt) < 4000
  ))

  const {x, y} = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
  const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));

  console.log(objectsDestroyed)

  cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
  flyingObjects = flyingObjects.filter(flyingDisc => (flyingDiscsDestroyed.indexOf(flyingDisc.id)));

  return {
    ...newState, 
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls,
    },
    angle,
  }
}

export default moveObjects