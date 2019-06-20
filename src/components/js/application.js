import { GameManager, KeyboardInputManager, HTMLActuator } from './managers'

const application = (getGameData, updateGameData) => {
  window.requestAnimationFrame(function () {
      new GameManager(
        KeyboardInputManager,
        HTMLActuator,
        getGameData,
        updateGameData
        )
  })
}

export { application }