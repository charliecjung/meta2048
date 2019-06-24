

class Storage {
  constructor() {
    this.storage = window.localStorage
  }

  // Game state getters/setters and clearing
  getGameState(metaID) {
    let stateJSON = this.storage.getItem(metaID)
    return stateJSON ? JSON.parse(stateJSON) : null
  }

  setGameState(gameState, metaID) {
    this.storage.setItem(metaID, JSON.stringify(gameState))
  }

  getRankData(start, end) {
    
  }
}

export default Storage