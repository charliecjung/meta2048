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
      { name: 'Ish', rank: 8, score: 1000 },
      { name: 'Jake', rank: 9, score: 2000 },
      { name: 'Yuri', rank: 10, score: 3000 }
    ]

    
    this.username = "Yuri"
    this.metaID = "DEFAULT_METAID"
    this.myName = "DEFAULT_NAME"
    this.myRank = "DEFAULT_RANK"
    this.myScore = "DEFAULT_SCORE"
    this.loadData()
    

    }
  loadData() {
    if (this.metaID !== "DEFAULT_METAID") {
      
    } else {
      this.metaID = "DEFAULT_METAID"
    }

    if (this.username !== "Yuri") {
      
    } else {
      this.username = "Yuri"
    }
    if (this.myName !== "DEFAULT_NAME") {

    } else {
      this.myName = "DEFAULT_NAME"
    }
    if (this.myRank !== "DEFAULT_RANK") {

    } else {
      this.myRank = "DEFAULT_RANK"
    }

    if (this.myScore !== "DEFAULT_SCORE") {

    } else {
      this.myScore = "DEFAULT_SCORE"
    }








  }
  setMetaID(_metaID) {
    this.storage.setItem(this.props.metaID, _metaID)
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
