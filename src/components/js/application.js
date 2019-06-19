import { GameManager, KeyboardInputManager, HTMLActuator, LocalStorageManager } from './managers'

const application = (getGameData, updateGameData, firstUse) => {
  window.requestAnimationFrame(function () {
      new GameManager(
        KeyboardInputManager,
        HTMLActuator,
        LocalStorageManager,
        getGameData,
        updateGameData,
        firstUse
        )
  })
}

export { application }