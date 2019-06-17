window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val)
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined
  },

  removeItem: function (id) {
    return delete this._data[id]
  },

  clear: function () {
    return this._data = {}
  }
}

class LocalStorageManager {
  constructor(isLogin) {
    this.bestScoreKey = "bestScore"
    this.gameStateKey = "gameState"

    this.storage = isLogin ? { method: "server", storage: "get server storage or contact logic here"}
    : this.localStorageSupported() ? { method: "local", storage: window.localStorage }
    : { method: "fake", storage: window.fakeStorage }

    console.log(this.storage)
  }

  localStorageSupported() {
    var testKey = "test"
  
    try {
      var storage = window.localStorage
      storage.setItem(testKey, "1")
      storage.removeItem(testKey)
      // if you want to use local storage, change it true
      return false
    } catch (error) {
      return false
    }
  }
  
  // Best score getters/setters
  getBestScore() {
    if(this.storage.method === "server") {
      // get best score logic here
    } else {
      return this.storage.storage.getItem(this.bestScoreKey) || 0
    }
  }
  
  setBestScore(score) {
    if(this.storage.method === "server") {
      // set score logic here
    } else {
      this.storage.storage.setItem(this.bestScoreKey, score)
    }
  }
  
  // Game state getters/setters and clearing
  getGameState() {
    if(this.storage.method === "server") {
      // get state logic here
    } else {
      let stateJSON = this.storage.storage.getItem(this.gameStateKey)
      return stateJSON ? JSON.parse(stateJSON) : null
    }
  }
  
  setGameState(gameState) {
    if(this.storage.method === "server") {
      // set state logic here
    } else {
      this.storage.storage.setItem(this.gameStateKey, JSON.stringify(gameState))
    }
  }
  
  clearGameState() {
    if(this.storage.method === "server") {
      // clear state logic here
    } else {
      this.storage.storage.removeItem(this.gameStateKey)
    }
  }
}

export { LocalStorageManager }