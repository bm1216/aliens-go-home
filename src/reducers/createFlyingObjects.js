import {
  createInterval, flyingObjectsStarterPositions, 
  flyingObjectsStarterYAxis, maxFlyingObjects,
} from '../utils/constants'

export default (state) => {
  // game not started
  if ( ! state.gameState.started ) return state;

  const now = (new Date()).getTime()
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject = (
    now - (lastObjectCreatedAt).getTime() > createInterval &&
    flyingObjects.length < maxFlyingObjects
  );

  // dont create ufo if interval not passed, or max created.
  if (!createNewObject) return state; 

  const id = (new Date()).getTime();
  const preDefinedPosition = Math.floor(Math.random() * maxFlyingObjects);

  const flyingObjectPosition = flyingObjectsStarterPositions[preDefinedPosition];

  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectsStarterYAxis,
    },
    createdAt: (new Date()).getTime(),
    id,
  }

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [
        ...state.gameState.flyingObjects,
        newFlyingObject
      ],
      lastObjectCreatedAt: new Date(),
    }
  }

}
