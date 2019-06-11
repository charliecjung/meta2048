import { GameManager, KeyboardInputManager, HTMLActuator, LocalStorageManager } from './managers'

const application = () => {
  window.requestAnimationFrame(function () {
      console.log("start application!")
      new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  });
}

export { application }