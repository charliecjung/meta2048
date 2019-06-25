class Storage {
  constructor (props) {
    this.storage = window.localStorage
    this.dumyUsers = [
      { name: 'Alpha', rank: 1, score: 90 },
      { name: 'Bravo', rank: 2, score: 100 },
      { name: 'Charlie', rank: 3, score: 200 },
      { name: 'Daniel', rank: 4, score: 300 },
      { name: 'Ethanol', rank: 5, score: 400 },
      { name: 'George', rank: 6, score: 700 },
      { name: 'Haitham', rank: 7, score: 800 },
      { name: 'Ish', rank: 8, score: 1000 }
    ]
    
    this.metaID = "uwLYwgkxKwRHdRpQD9gEy6SA"
    

    }

  // Game state getters/setters and clearing
  getGameState (metaID) {
    let stateJSON = this.storage.getItem(metaID)
    return stateJSON ? JSON.parse(stateJSON) : null
  }

  setGameState (gameState, metaID) {
    this.storage.setItem(metaID, JSON.stringify(gameState))
  }

  getRankData (start, end) {
    return this.dumyUsers.slice(start - 1, end)
  }
}

export default Storage
