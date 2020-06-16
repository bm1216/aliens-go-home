export default startGame (state, initialGameState) => {
  return {
    ...state,
    gameState: {
      ...initialGameState,
      started: true,
    }
  }
}