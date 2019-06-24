import { GameManager, KeyboardInputManager, HTMLActuator } from './managers'

const application = (getGameData, updateGameData, loadGameData) => {
  window.requestAnimationFrame(function () {
    new GameManager(
      KeyboardInputManager,
      HTMLActuator,
      getGameData,
      updateGameData,
      loadGameData
    )
  })
}

export { application }
