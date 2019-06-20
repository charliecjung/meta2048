class LocalStorageManager {
  constructor() {
    this.storage = window.localStorage
  }
  
  // Game state getters/setters and clearing
  getGameState() {
    let stateJSON = this.storage.getItem(this.gameStateKey)
    return stateJSON ? JSON.parse(stateJSON) : null
  }
  
  setGameState(gameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState))
  }
}

export { LocalStorageManager }