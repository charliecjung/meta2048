import React from 'react'
import { Map } from 'immutable'

import './App.css'
import './components/style/main.css'
import gameScript from './components/js'
import constants from './constants'
import Storage from './storage'

import { Heading, Above, Message, Grid, Explanation } from './components/game'
import { Menu, RankBoard, AuthKeppin } from './components/menu'
import  RegisterScore  from './components/menu/registerScore.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      gameData: Map({
        gameSize: constants.gameData.gameSize,
        startTiles: constants.gameData.startTiles,
        grid: null,
        score: 0,
        bestScore: 0,
        over: false,
        won: false,
        terminated: false,
        keepPlaying: false
      }),
      auth: false,
      authTopic: '',
      firstUse: true,
      showMenu: true,
      selectTopic: 'menu',
     
    }

    this.storage = new Storage()

    // related with game data
    this.getGameData = this.getGameData.bind(this)
    this.updateGameData = this.updateGameData.bind(this)

    // related with Menu
    this.showMenu = this.showMenu.bind(this)
    this.resume = this.resume.bind(this)
    this.startGame = this.startGame.bind(this)
    this.showRank = this.showRank.bind(this)
    this.loadGame = this.loadGame.bind(this)
    this.saveGame = this.saveGame.bind(this)
    this.backToMain = this.backToMain.bind(this)
    this.authCallback = this.authCallback.bind(this)

    //registerScore's displayRanking method
    this.registerScore = this.registerScore.bind(this)
    this.displayRanking = this.displayRanking.bind(this)
 


  }

  componentDidMount () {
    gameScript.classlist_polyfill()
    gameScript.animframe_polyfill()
  }

  // related with game data
  getGameData () {
    return { ...this.state.gameData.toJS() }
  }

  displayRanking () {
  alert("displayRanking() called")
  this.setState({ selectTopic: 'auth'})

  }
  registerScore () {
    alert("registerScore called")
    this.setState({ selectTopic: 'register-score' })

  }


  updateGameData (_state) {
    const { gameData } = this.state
    this.setState({
      gameData: gameData.update('grid', grid => _state.grid ? _state.grid : grid)
        .update('score', score => (typeof _state.score === 'number') ? _state.score : score)
        .update('bestScore', bestScore => _state.bestScore ? _state.bestScore : bestScore)
        .update('over', over => (typeof _state.over === 'boolean') ? _state.over : over)
        .update('won', won => (typeof _state.won === 'boolean') ? _state.won : won)
        .update('keepPlaying', keepPlaying => (typeof _state.keepPlaying === 'boolean') ? _state.keepPlaying : keepPlaying)
    }, this.isTerminated)
  }

  isTerminated () {
    const { gameData } = this.state
    const terminated = this.state.showMenu || this.state.gameData.get('over') || (this.state.gameData.get('won') && !this.state.gameData.get('keepPlaying'))

    if (gameData.get('terminated') !== terminated) this.setState({ gameData: gameData.set('terminated', terminated) })
  }

  // related with menu
  showMenu () {
    const { gameData } = this.state

    this.setState({
      gameData: gameData.set('terminated', true),
      showMenu: true,
      selectTopic: 'main'
    })
  }

  getMenuScreen () {
    let topic = this.state.selectTopic
    let isFirstTime = this.state.firstUse
    alert("topic: " + topic)
    switch (topic) {

      case 'register-score':
        return <RegisterScore
           back={this.back}
           displayRanking={this.displayRanking}
           />
      case 'rankBoard':
        return <RankBoard
          isFirstTime={isFirstTime}
          users={this.storage.getRankData(1, 8)}
          back={this.back} 
          displayRanking={this.displayRanking}
          registerScore={this.registerScore} />
      case 'auth':
        return <AuthKeppin
          authCallback={this.authCallback} 
           />
      default:
        return <Menu
          isFirstTime={isFirstTime}
          resume={this.resume}
          startGame={this.startGame}
          showRank={this.showRank}
          saveGame={this.saveGame}
          loadGame={this.loadGame} />
    }
  }

  backToMain () {
    this.setState({ selectTopic: 'main' })
  }

  resume () {
    const { gameData } = this.state
    let isOver = gameData.get('over')
    this.setState({
      gameData: gameData.set('terminated', isOver),
      showMenu: false,
      auth: false
    })
  }

  startGame (loadGameData) {
    gameScript.application(this.getGameData, this.updateGameData, loadGameData)
    this.setState({
      showMenu: false,
      firstUse: false,
      login: false,
      auth: false })
  }

  showRank () {
    this.setState({ selectTopic: 'rankBoard' })
  }

  loadGame (metaID) {
    if (this.state.auth) {
      let loadGameData = this.storage.getGameState(metaID)
      this.startGame(loadGameData)
    } else {
      this.setState({ selectTopic: 'auth', authTopic: 'load' })
    }
  }

  saveGame (metaID) {
    console.log(this.state.auth)
    if (this.state.auth) {
      const saveDate = {
        grid: this.state.gameData.get('grid'),
        score: this.state.gameData.get('score'),
        over: this.state.gameData.get('over'),
        won: this.state.gameData.get('won'),
        keepPlaying: this.state.gameData.get('keepPlaying')
      }
      this.storage.setGameState(saveDate, metaID)
      this.resume()
    } else {
      this.setState({ selectTopic: 'auth', authTopic: 'save' })
    }
  }

  authCallback (metaID) {
    console.log('come back App.js')
    switch (this.state.authTopic) {
      case 'load':
        this.setState({ auth: true, authTopic: '' })
        this.loadGame(metaID)
        break
      case 'save':
        this.setState({ auth: true, authTopic: '' })
        this.saveGame(metaID)
        break
      default: break
    }
  }

  render () {
    return (
      <div className='container'>
        <Heading />
        <Above showMenu={this.showMenu} />
        <div className='game-container'>
          {this.state.showMenu ? <div className='menu'>{this.getMenuScreen()}</div> : null}
          <Message />
          <Grid />
          <div className='tile-container' />
        </div>
        <Explanation />
        <hr />
      </div>
    )
  }
}

export default App
