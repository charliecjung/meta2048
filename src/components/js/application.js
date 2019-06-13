import { GameManager, KeyboardInputManager, HTMLActuator, LocalStorageManager } from './managers'

const application = (getGameData, updateGameData, setupCallback) => {
  window.requestAnimationFrame(function () {
      new GameManager(
        KeyboardInputManager,
        HTMLActuator,
        LocalStorageManager,
        getGameData,
        updateGameData,
        setupCallback
        )
  })
}

export { application }