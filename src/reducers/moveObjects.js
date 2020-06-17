import {calculateAngle} from '../utils/formulas'
import createFlyingObjects from './createFlyingObjects'

function moveObjects(state, action) {
  if (!action.mousePosition) return state;
  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  }

  const newState = createFlyingObjects(state)

  const now = (new Date()).getTime();
  // makes sure flyingObjects array only contains UFO's that were created less than 4 seconds ago
  const flyingObjects = newState.gameState.flyingObjects.filter(object => (
    (now - object.createdAt) < 4000
  ))

  const {x, y} = mousePosition;
  const angle = calculateAngle(0, 0, x, y);
  return {
    ...newState, 
    gameState: {
      ...newState.gameState,
      flyingObjects,
    },
    angle,
  }
}

export default moveObjects