class Storage {
  constructor() {
    this.storageKey = "Meta2048"
    this.storage = window.localStorage
  }

  // Game state getters/setters and clearing
  getGameState() {
    let stateJSON = this.storage.getItem(this.storageKey)
    return stateJSON ? JSON.parse(stateJSON) : null
  }

  setGameState(gameState) {
    this.storage.setItem(this.storageKey, JSON.stringify(gameState))
  }
}

export default Storage